import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, PenTool, Sparkles, Clock, Calendar } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { BlogCard } from '../components/cards/BlogCard';
import { EmptyState } from '../components/common/EmptyState';

export const BlogsPage: React.FC = () => {
  const { blogs } = useAppStore();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Frontend', 'Backend', 'Architecture', 'AI & ML', 'DevOps', 'Career'];

  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      if (selectedCategory !== 'All' && b.category !== selectedCategory) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesTitle = b.title.toLowerCase().includes(q);
        const matchesExcerpt = b.excerpt.toLowerCase().includes(q);
        const matchesAuthor = b.authorName.toLowerCase().includes(q);
        const matchesTags = b.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesExcerpt && !matchesAuthor && !matchesTags) return false;
      }
      return true;
    });
  }, [blogs, search, selectedCategory]);

  const featuredBlog = blogs.find((b) => b.featured) || blogs[0];
  const remainingBlogs = filteredBlogs.filter((b) => b.id !== featuredBlog?.id || selectedCategory !== 'All');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-[#090D16] border border-slate-200 dark:border-[#1F293D] shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-indigo-500 dark:text-cyan-400 uppercase tracking-widest">
              Engineering Publications
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-xs text-slate-400">Written by Real Practitioners</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Technical Blogs & Architecture Deep Dives
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
            In-depth engineering post-mortems, distributed systems trade-offs, and frontend performance optimizations.
          </p>
        </div>

        <Link
          to="/blogs/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white shadow-lg shadow-indigo-600/30 transition-all shrink-0"
        >
          <PenTool className="w-4 h-4" />
          <span>Write Technical Article</span>
        </Link>
      </div>

      {/* Featured Blog Hero (shown when no search filter is applied) */}
      {!search && selectedCategory === 'All' && featuredBlog && (
        <BlogCard blog={featuredBlog} featured={true} />
      )}

      {/* Search & Category Filter Pills */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles by title, author, tech tags..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <span className="text-xs text-slate-500 self-end sm:self-center">
            Showing {filteredBlogs.length} articles
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredBlogs.length === 0 ? (
        <EmptyState
          title="No articles match your search"
          description="Try exploring another technical category or write the very first article on this topic."
          actionText="Write New Article"
          onAction={() => setSearch('')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(selectedCategory === 'All' && !search ? remainingBlogs : filteredBlogs).map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};
