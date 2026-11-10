import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  Clock, 
  Calendar, 
  ArrowLeft, 
  Copy, 
  Check, 
  Send, 
  Bookmark, 
  Terminal,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAppStore } from '../store/useAppStore';
import { useToast } from '../components/common/Toast';
import { BlogCard } from '../components/cards/BlogCard';

export const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { blogs, toggleLikeBlog, addBlogComment, currentUser } = useAppStore();
  const { showToast } = useToast();

  const blog = blogs.find((b) => b.id === id);
  const [copiedCode, setCopiedCode] = useState(false);
  const [commentText, setCommentText] = useState('');

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
        <p className="text-slate-400 mb-6">The engineering article you are looking for does not exist or has been removed.</p>
        <Link to="/blogs" className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold">
          Back to Blogs
        </Link>
      </div>
    );
  }

  const handleLike = () => {
    toggleLikeBlog(blog.id);
    if (!blog.isLiked) {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
      showToast('Article liked!', 'success');
    }
  };

  const handleCopyCode = () => {
    const codeSample = `import { useActionState, useOptimistic } from 'react';\n\nexport function StarButton() {\n  // React 19 concurrent mutation\n}`;
    navigator.clipboard?.writeText(codeSample);
    setCopiedCode(true);
    showToast('Code snippet copied to clipboard!', 'info');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addBlogComment(blog.id, commentText.trim());
    setCommentText('');
    showToast('Comment published!', 'success');
  };

  const relatedBlogs = blogs.filter((b) => b.id !== blog.id).slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/blogs')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Articles
      </button>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 dark:text-cyan-400 border border-indigo-500/20">
            {blog.category}
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {blog.readingTime}
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {blog.publishedAt}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {blog.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          {blog.excerpt}
        </p>

        {/* Author Bio Banner */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] flex items-center justify-between gap-4">
          <Link to={`/profile/${blog.authorId}`} className="flex items-center gap-3">
            <img
              src={blog.authorAvatar}
              alt={blog.authorName}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/20"
            />
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white hover:text-indigo-400 transition-colors">
                {blog.authorName}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                {blog.authorHeadline}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                blog.isLiked
                  ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${blog.isLiked ? 'fill-current' : ''}`} />
              <span>{blog.likes}</span>
            </button>

            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                showToast('Article link copied to clipboard!', 'info');
              }}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Share Article"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-[#1F293D] shadow-md h-72 sm:h-96">
        <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
      </div>

      {/* Main Content Body */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm space-y-6 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base">
        {/* Table of Contents Pill */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111827] border border-slate-100 dark:border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Table of Contents
          </h4>
          <ul className="space-y-1 text-xs text-indigo-500 dark:text-cyan-400">
            <li><a href="#core-primitives" className="hover:underline">1. The Core Primitives & Mental Model</a></li>
            <li><a href="#code-implementation" className="hover:underline">2. Implementation with Optimistic Updates</a></li>
            <li><a href="#benchmarks" className="hover:underline">3. Latency & Memory Benchmarks</a></li>
            <li><a href="#conclusion" className="hover:underline">4. Production Checklist</a></li>
          </ul>
        </div>

        <h2 id="core-primitives" className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
          The Core Primitives & Mental Model
        </h2>
        <p>
          Modern applications frequently struggle with state synchronization across the client-server boundary. Traditional approaches require boilerplate mutation handlers, manual rollback registries, and error dispatchers that easily become out of sync.
        </p>

        <p>
          By embracing actions as first-class asynchronous primitives, React simplifies form submissions, button interactions, and background transitions. When coupled with optimistic stores, users perceive immediate sub-10ms feedback while network requests resolve reliably.
        </p>

        {/* Code Snippet Block */}
        <div id="code-implementation" className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden text-xs font-mono my-6">
          <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" /> actions.tsx
            </span>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 text-[11px] hover:text-white transition-colors"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="p-4 text-cyan-300 overflow-x-auto leading-relaxed">
{`import { useActionState, useOptimistic } from 'react';
import { updateProjectStar } from '@/actions/project';

export function StarButton({ projectId, initialStars }: { projectId: string; initialStars: number }) {
  const [stars, setOptimisticStars] = useOptimistic(
    initialStars,
    (curr, delta: number) => curr + delta
  );

  const [state, formAction, isPending] = useActionState(async () => {
    setOptimisticStars(1);
    return await updateProjectStar(projectId);
  }, null);

  return (
    <form action={formAction}>
      <button 
        type="submit" 
        disabled={isPending}
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-bold transition-all"
      >
        ★ {stars} {isPending ? '(Updating...)' : ''}
      </button>
    </form>
  );
}`}
          </pre>
        </div>

        <h2 id="benchmarks" className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
          Latency & Memory Benchmarks
        </h2>
        <p>
          During stress testing under 10,000 simulated concurrent requests, the optimistic queue eliminated client thread locking entirely. State rollbacks occurred cleanly in 100% of tested failure modes without memory leaks.
        </p>

        <h2 id="conclusion" className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
          Production Checklist
        </h2>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Ensure idempotent backend handlers for repeated Action retries.</li>
          <li>Configure exponential backoff jitter on flaky network links.</li>
          <li>Keep client stores exclusively for transient UI state (drawers, modals, themes).</li>
        </ul>

        {/* Tags */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Discussion & Comments Section */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-500 dark:text-cyan-400" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Discussion ({blog.comments.length})
            </h3>
          </div>
          <span className="text-xs text-slate-400">Technical debate welcome</span>
        </div>

        {/* Add Comment Form */}
        <form onSubmit={handleAddComment} className="flex gap-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20 shrink-0"
          />
          <div className="flex-1 space-y-2">
            <textarea
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Join the discussion. Share benchmarks, edge cases, or counter-arguments..."
              className="w-full p-3 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Comment</span>
            </button>
          </div>
        </form>

        {/* Comments Feed */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800 space-y-4 pt-4">
          {blog.comments.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4">
              Be the first to share an engineering perspective on this article.
            </p>
          ) : (
            blog.comments.map((comment) => (
              <div key={comment.id} className="pt-4 flex items-start gap-3">
                <img
                  src={comment.authorAvatar}
                  alt={comment.authorName}
                  className="w-9 h-9 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {comment.authorName}
                    </h4>
                    <span className="text-[10px] text-slate-400">{comment.createdAt}</span>
                  </div>
                  <p className="text-[11px] text-indigo-400">{comment.authorHeadline}</p>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-1.5 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Related Articles */}
      <div className="space-y-4 pt-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Related Deep Dives
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedBlogs.map((b) => (
            <BlogCard key={b.id} blog={b} />
          ))}
        </div>
      </div>
    </div>
  );
};
