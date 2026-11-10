import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  FolderGit2, 
  ThumbsUp, 
  Eye, 
  Sparkles, 
  Send, 
  Image as ImageIcon, 
  Code, 
  TrendingUp, 
  Calendar, 
  ArrowRight,
  MessageSquare,
  Heart,
  Share2,
  CheckCircle2,
  Plus
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Sidebar } from '../components/common/Sidebar';
import { StatCard } from '../components/common/StatCard';
import { SkillBadge } from '../components/common/SkillBadge';
import { AddProjectModal } from '../components/modals/AddProjectModal';
import { MessagesModal } from '../components/modals/MessagesModal';
import { useToast } from '../components/common/Toast';
import { AvailabilityStatus } from '../types';

interface PostUpdate {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorHeadline: string;
  timeAgo: string;
  content: string;
  codeSnippet?: string;
  tags: string[];
  likes: number;
  isLiked?: boolean;
  commentsCount: number;
}

export const DashboardPage: React.FC = () => {
  const { 
    currentUser, 
    developers, 
    projects, 
    blogs, 
    updateCurrentUser,
    sendConnectionRequest 
  } = useAppStore();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'all' | 'projects' | 'blogs' | 'updates'>('all');
  const [postContent, setPostContent] = useState('');
  const [postCode, setPostCode] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [activeDevForMessage, setActiveDevForMessage] = useState<string | null>(null);

  // Community post feed state
  const [feedPosts, setFeedPosts] = useState<PostUpdate[]>([
    {
      id: 'post-1',
      authorName: 'Sophia Chen',
      authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      authorHeadline: 'Staff Frontend Engineer @ Vercel',
      timeAgo: '2 hours ago',
      content: 'Just deployed our new RFC for Turbopack streaming build traces. P99 compilation time for large Next.js monoliths dropped by 42%! Check out the benchmark snippet below:',
      codeSnippet: `// Turbopack tracing hook\nconst metrics = await traceBuildStep('compile', {\n  concurrency: 16,\n  cacheStrategy: 'content-addressed'\n});`,
      tags: ['Next.js', 'Turbopack', 'Performance'],
      likes: 84,
      isLiked: false,
      commentsCount: 12
    },
    {
      id: 'post-2',
      authorName: 'Marcus Vance',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      authorHeadline: 'Principal Systems Architect @ Cloudflare',
      timeAgo: '5 hours ago',
      content: 'Refactored our TCP connection pooling in Rust using zero-copy tokio buffers. Memory consumption per 100k active WebSockets stabilized at ~18MB. The zero-cost abstraction promise is real.',
      tags: ['Rust', 'Tokio', 'Networking'],
      likes: 128,
      isLiked: true,
      commentsCount: 19
    }
  ]);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    const newPost: PostUpdate = {
      id: `post-${Date.now()}`,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorHeadline: currentUser.headline,
      timeAgo: 'Just now',
      content: postContent.trim(),
      codeSnippet: showCodeInput && postCode.trim() ? postCode.trim() : undefined,
      tags: ['Architecture', 'DevUpdate'],
      likes: 1,
      isLiked: true,
      commentsCount: 0
    };

    setFeedPosts([newPost, ...feedPosts]);
    setPostContent('');
    setPostCode('');
    setShowCodeInput(false);
    showToast('Update shared with your developer network!', 'success');
  };

  const handleLikePost = (postId: string) => {
    setFeedPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const wasLiked = p.isLiked;
          return {
            ...p,
            isLiked: !wasLiked,
            likes: wasLiked ? p.likes - 1 : p.likes + 1
          };
        }
        return p;
      })
    );
  };

  const suggestedDevs = developers
    .filter((d) => d.id !== currentUser.id && d.connectionStatus !== 'connected')
    .slice(0, 3);

  const trendingTech = [
    { name: 'React 19', growth: '+34%' },
    { name: 'Rust', growth: '+28%' },
    { name: 'TypeScript', growth: '+22%' },
    { name: 'LLM Tool Calling', growth: '+64%' },
    { name: 'Kubernetes', growth: '+15%' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Navigation Sidebar */}
        <Sidebar />

        {/* Center Column: Main Content & Feed */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* Welcome Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border border-indigo-500/20 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  Developer Dashboard
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span className="text-xs text-slate-400">v2.4 Online</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Welcome back, {currentUser.name.split(' ')[0]}! 🚀
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg">
                Your architecture showcases reached 3,840 engineers this week. You have 2 pending peer connection requests.
              </p>
            </div>

            {/* Quick Status Pill */}
            <div className="shrink-0 flex items-center gap-2">
              <select
                value={currentUser.availability}
                onChange={(e) => {
                  updateCurrentUser({ availability: e.target.value as AvailabilityStatus });
                  showToast(`Status updated to "${e.target.value}"`, 'success');
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 dark:bg-black/40 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <option value="Open to Work" className="bg-slate-900 text-white">🟢 Open to Work</option>
                <option value="Hiring" className="bg-slate-900 text-white">🟣 Hiring</option>
                <option value="Mentoring" className="bg-slate-900 text-white">🔵 Mentoring</option>
                <option value="Building" className="bg-slate-900 text-white">🟡 Building</option>
                <option value="Not Available" className="bg-slate-900 text-white">⚪ Not Available</option>
              </select>
            </div>
          </div>

          {/* Metric Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard
              label="Connections"
              value={currentUser.connectionsCount}
              icon={Users}
              change="+12%"
              accentColor="indigo"
            />
            <StatCard
              label="Projects"
              value={currentUser.projectsCount}
              icon={FolderGit2}
              change="+2 new"
              accentColor="cyan"
            />
            <StatCard
              label="Endorsements"
              value={currentUser.endorsementsCount}
              icon={ThumbsUp}
              change="+8%"
              accentColor="emerald"
            />
            <StatCard
              label="Profile Views"
              value={currentUser.profileViews}
              icon={Eye}
              change="+24%"
              accentColor="amber"
            />
          </div>

          {/* Quick Create / Share Widget */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20"
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Share an architectural breakthrough, benchmark, or engineering update..."
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {showCodeInput && (
              <div className="mb-3 animate-in fade-in duration-200">
                <textarea
                  rows={3}
                  value={postCode}
                  onChange={(e) => setPostCode(e.target.value)}
                  placeholder="// Paste your code or config snippet here..."
                  className="w-full p-3 font-mono text-xs rounded-xl bg-slate-950 text-slate-200 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowCodeInput(!showCodeInput)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    showCodeInput
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Code snippet</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsAddProjectOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>New Project</span>
                </button>
              </div>

              <button
                onClick={handleCreatePost}
                disabled={!postContent.trim()}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white shadow-sm transition-all"
              >
                <span>Publish</span>
                <Send className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Activity Feed Filter Tabs */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'all'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All Feed
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'projects'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Project Releases
              </button>
              <button
                onClick={() => setActiveTab('blogs')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'blogs'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Technical Blogs
              </button>
            </div>
            <span className="text-[11px] text-slate-400">Real-time sync</span>
          </div>

          {/* Activity Feed List */}
          <div className="space-y-4">
            {activeTab === 'all' && (
              <>
                {feedPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-5 rounded-2xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.authorAvatar}
                          alt={post.authorName}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {post.authorName}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {post.authorHeadline} • {post.timeAgo}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed mb-3">
                      {post.content}
                    </p>

                    {post.codeSnippet && (
                      <pre className="p-3.5 rounded-xl bg-slate-950 text-cyan-300 font-mono text-xs overflow-x-auto mb-3 border border-slate-800">
                        {post.codeSnippet}
                      </pre>
                    )}

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 font-semibold"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-4 text-xs text-slate-500">
                      <button
                        onClick={() => handleLikePost(post.id)}
                        className={`flex items-center gap-1.5 transition-colors ${
                          post.isLiked ? 'text-rose-500 font-bold' : 'hover:text-rose-500'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                        <span>{post.likes}</span>
                      </button>

                      <button className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors">
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.commentsCount} comments</span>
                      </button>

                      <button
                        onClick={() => showToast('Post link copied to clipboard', 'info')}
                        className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors ml-auto"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Project Updates Feed */}
            {(activeTab === 'all' || activeTab === 'projects') && (
              <div className="space-y-4">
                {projects.slice(0, 2).map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-2xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={proj.coverImage}
                        alt=""
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-bold uppercase">
                            Project Release
                          </span>
                          <span className="text-xs text-slate-400">{proj.createdAt}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                          {proj.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                          {proj.tagline}
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/projects"
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shrink-0"
                    >
                      View Architecture
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* Technical Blog Feed */}
            {(activeTab === 'all' || activeTab === 'blogs') && (
              <div className="space-y-4">
                {blogs.slice(0, 2).map((blog) => (
                  <div
                    key={blog.id}
                    className="p-5 rounded-2xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold uppercase">
                        Technical Deep Dive
                      </span>
                      <span className="text-xs text-slate-400">{blog.publishedAt}</span>
                    </div>
                    <Link to={`/blogs/${blog.id}`}>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white hover:text-indigo-400 transition-colors">
                        {blog.title}
                      </h4>
                    </Link>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                      {blog.excerpt}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-slate-400">{blog.authorName} • {blog.readingTime}</span>
                      <Link to={`/blogs/${blog.id}`} className="text-indigo-500 font-semibold flex items-center gap-1">
                        Read Article <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Right Column: Trending, Suggestions & Events */}
        <aside className="w-full lg:w-80 shrink-0 space-y-6">
          {/* Profile Completeness Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white">Profile Strength</span>
              <span className="text-xs font-bold text-indigo-500 dark:text-cyan-400">85%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 w-[85%]" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Add your cloud certifications to appear in top recruiter searches.
            </p>
            <Link
              to="/settings"
              className="text-xs font-semibold text-indigo-500 hover:text-indigo-400 flex items-center gap-1"
            >
              Complete Profile →
            </Link>
          </div>

          {/* Suggested Developers */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Suggested Developers
              </h3>
              <Link to="/explore" className="text-xs font-semibold text-indigo-500 hover:text-indigo-400">
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {suggestedDevs.map((dev) => (
                <div key={dev.id} className="flex items-center justify-between gap-3">
                  <Link to={`/profile/${dev.id}`} className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={dev.avatar}
                      alt={dev.name}
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate hover:text-indigo-400">
                        {dev.name}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate max-w-[120px]">
                        {dev.headline}
                      </p>
                    </div>
                  </Link>

                  <button
                    onClick={() => {
                      sendConnectionRequest(dev.id);
                      showToast(`Connection request sent to ${dev.name}`, 'success');
                    }}
                    className="p-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-500 dark:text-indigo-400 text-xs font-semibold transition-colors"
                    title="Send Connection Request"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Technologies */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Trending Technologies
              </h3>
            </div>
            <div className="space-y-2.5">
              {trendingTech.map((tech) => (
                <div key={tech.name} className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{tech.name}</span>
                  <span className="font-semibold text-emerald-500 font-mono">{tech.growth}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Community Events */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Upcoming Hackathons
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-100 dark:border-slate-800">
                <p className="font-bold text-slate-900 dark:text-white">Global Edge Computing Hackathon</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Dec 12 - 14 • $45,000 in Prizes</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-100 dark:border-slate-800">
                <p className="font-bold text-slate-900 dark:text-white">React 19 & Rust Summit 2026</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Online Worldwide • Keynote by DevConnect</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={isAddProjectOpen}
        onClose={() => setIsAddProjectOpen(false)}
      />

      {/* Messages Modal */}
      <MessagesModal
        isOpen={isMessageOpen}
        onClose={() => {
          setIsMessageOpen(false);
          setActiveDevForMessage(null);
        }}
        defaultDevId={activeDevForMessage}
      />
    </div>
  );
};
