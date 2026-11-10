import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock, Calendar, ArrowRight, MessageSquare } from 'lucide-react';
import { Blog } from '../../types';
import { useAppStore } from '../../store/useAppStore';

interface BlogCardProps {
  blog: Blog;
  featured?: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog, featured = false }) => {
  const { toggleLikeBlog } = useAppStore();

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLikeBlog(blog.id);
  };

  if (featured) {
    return (
      <div className="group relative rounded-3xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-md hover:shadow-2xl dark:hover:border-indigo-500/40 transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div className="lg:col-span-7 h-64 lg:h-auto relative overflow-hidden bg-slate-800">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950/80 via-slate-950/20 to-transparent" />
          <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
            Featured Article
          </span>
        </div>

        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-cyan-400">
                {blog.category}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {blog.readingTime}
              </span>
            </div>

            <Link to={`/blogs/${blog.id}`}>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                {blog.title}
              </h2>
            </Link>

            <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 line-clamp-3 leading-relaxed">
              {blog.excerpt}
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <Link to={`/profile/${blog.authorId}`} className="flex items-center gap-2.5">
              <img
                src={blog.authorAvatar}
                alt={blog.authorName}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/20"
              />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{blog.authorName}</p>
                <p className="text-[10px] text-slate-400">{blog.publishedAt}</p>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                  blog.isLiked
                    ? 'text-rose-500 bg-rose-500/10'
                    : 'text-slate-500 hover:text-rose-500 bg-slate-100 dark:bg-slate-800'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${blog.isLiked ? 'fill-current' : ''}`} />
                <span>{blog.likes}</span>
              </button>

              <Link
                to={`/blogs/${blog.id}`}
                className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative rounded-2xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm hover:shadow-xl dark:hover:border-indigo-500/40 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
      {/* Cover Image */}
      <Link to={`/blogs/${blog.id}`} className="h-48 w-full relative overflow-hidden bg-slate-800">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-900/80 text-white backdrop-blur-md border border-white/10">
          {blog.category}
        </span>
      </Link>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mb-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {blog.readingTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {blog.publishedAt}
            </span>
          </div>

          <Link to={`/blogs/${blog.id}`}>
            <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
              {blog.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {blog.excerpt}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <Link to={`/profile/${blog.authorId}`} className="flex items-center gap-2">
            <img
              src={blog.authorAvatar}
              alt={blog.authorName}
              className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
            />
            <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[110px]">
              {blog.authorName}
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                blog.isLiked
                  ? 'text-rose-500 bg-rose-500/10'
                  : 'text-slate-500 hover:text-rose-500 bg-slate-100 dark:bg-slate-800'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${blog.isLiked ? 'fill-current' : ''}`} />
              <span>{blog.likes}</span>
            </button>

            <span className="flex items-center gap-1 text-slate-400 text-xs px-2 py-1">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{blog.comments.length}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
