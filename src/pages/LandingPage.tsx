import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, 
  Sparkles, 
  Users, 
  FolderGit2, 
  BookOpen, 
  GitBranch, 
  ArrowRight, 
  Terminal, 
  CheckCircle2, 
  Star, 
  Layers, 
  Zap,
  Globe,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { DeveloperCard } from '../components/cards/DeveloperCard';
import { ProjectCard } from '../components/cards/ProjectCard';
import { BlogCard } from '../components/cards/BlogCard';
import { ProjectDetailModal } from '../components/modals/ProjectDetailModal';
import { Project } from '../types';

export const LandingPage: React.FC = () => {
  const { developers, projects, blogs, isAuthenticated } = useAppStore();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Statistics counters
  const [stats, setStats] = useState({
    developers: 0,
    projects: 0,
    blogs: 0,
    connections: 0
  });

  useEffect(() => {
    const duration = 1500;
    const steps = 30;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setStats({
        developers: Math.floor(progress * 18450),
        projects: Math.floor(progress * 4230),
        blogs: Math.floor(progress * 1280),
        connections: Math.floor(progress * 68900)
      });
      if (step >= steps) {
        clearInterval(timer);
        setStats({
          developers: 18450,
          projects: 4230,
          blogs: 1280,
          connections: 68900
        });
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const featuredDevs = developers.slice(1, 4);
  const featuredProjects = projects.slice(0, 3);
  const featuredBlogs = blogs.slice(0, 3);

  return (
    <div className="relative overflow-hidden">
      {/* Background ambient gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none opacity-40 dark:opacity-25 blur-3xl -z-10">
        <div className="w-full h-full bg-gradient-to-tr from-indigo-600 via-cyan-500 to-purple-600 rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-cyan-400 text-xs font-semibold mb-6 animate-pulse-slow">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DevConnect 2.0 is live for software engineers</span>
              <span className="text-slate-400">•</span>
              <span className="underline cursor-pointer">Explore features</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
              Connect. Build.{' '}
              <span className="gradient-text">Grow Together.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
              The professional network built for developers. Showcase your architecture, share deep technical knowledge, discover elite opportunities, and build the future with fellow engineers.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={isAuthenticated ? '/dashboard' : '/register'}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>{isAuthenticated ? 'Go to Dashboard' : 'Join DevConnect Free'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/explore"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] hover:bg-slate-50 dark:hover:bg-[#1B263B] transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Developers</span>
              </Link>
            </div>
          </div>

          {/* Floating Hero UI Composition */}
          <div className="mt-16 relative max-w-5xl mx-auto">
            {/* Central Terminal / IDE Preview */}
            <div className="rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden text-left font-mono">
              <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs text-slate-400 ml-3 font-sans">devconnect-network.tsx</span>
                </div>
                <div className="text-[11px] text-cyan-400 flex items-center gap-1.5 font-sans">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  Realtime Edge Cluster
                </div>
              </div>

              <div className="p-6 text-xs sm:text-sm text-slate-300 space-y-2 overflow-x-auto">
                <p className="text-slate-500">// Initialize developer identity on decentralized graph</p>
                <p>
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-cyan-300">architect</span> ={' '}
                  <span className="text-indigo-400">await</span> DevConnect.
                  <span className="text-amber-300">authenticate</span>({'{'}
                </p>
                <p className="pl-6">
                  handle: <span className="text-emerald-400">'@alexrivera'</span>,
                </p>
                <p className="pl-6">
                  verifiedSkills: [<span className="text-emerald-400">'Rust'</span>,{' '}
                  <span className="text-emerald-400">'React 19'</span>,{' '}
                  <span className="text-emerald-400">'Distributed Systems'</span>],
                </p>
                <p className="pl-6">
                  availability: <span className="text-emerald-400">'Open to Work'</span>,
                </p>
                <p className="pl-6">
                  githubCommitsTotal: <span className="text-amber-400">2_840</span>
                </p>
                <p>{'});'}</p>
                <p className="text-emerald-400 pt-2 font-mono">
                  ✓ Profile verified & connected to 480+ staff engineers across Vercel, Stripe & Anthropic
                </p>
              </div>
            </div>

            {/* Floating UI Element 1: Connection Request Pill */}
            <div className="hidden lg:flex items-center gap-3 p-3.5 rounded-2xl bg-white/95 dark:bg-[#151E2E]/95 border border-slate-200 dark:border-indigo-500/30 shadow-xl backdrop-blur-md absolute -top-8 -left-8 animate-float">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                  alt="Sophia Chen"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#151E2E]" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-slate-900 dark:text-white">Sophia Chen</p>
                <p className="text-slate-400">Endorsed you for <span className="text-indigo-400 font-semibold">React 19</span></p>
              </div>
            </div>

            {/* Floating UI Element 2: Star Notification Card */}
            <div className="hidden lg:flex items-center gap-3 p-3.5 rounded-2xl bg-white/95 dark:bg-[#151E2E]/95 border border-slate-200 dark:border-cyan-500/30 shadow-xl backdrop-blur-md absolute -bottom-6 -right-8 animate-float [animation-delay:2s]">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Star className="w-5 h-5 fill-current" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-slate-900 dark:text-white">HyperSync Engine</p>
                <p className="text-slate-400">+42 stars from GitHub today</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section with Animated Counters */}
      <section id="stats" className="py-12 bg-slate-100/60 dark:bg-[#111827]/60 border-y border-slate-200 dark:border-[#1F293D] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {stats.developers.toLocaleString()}+
              </div>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
                Total Developers
              </p>
            </div>

            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-500 dark:text-indigo-400 tracking-tight">
                {stats.projects.toLocaleString()}+
              </div>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
                Projects Shared
              </p>
            </div>

            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-cyan-500 dark:text-cyan-400 tracking-tight">
                {stats.blogs.toLocaleString()}+
              </div>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
                Technical Deep Dives
              </p>
            </div>

            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-500 dark:text-emerald-400 tracking-tight">
                {stats.connections.toLocaleString()}+
              </div>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
                Connections Created
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-500 dark:text-cyan-400 mb-2">
            Engineered For Builders
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Everything your developer career deserves.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-5">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Verified Peer Networking
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Connect directly with senior engineers, staff architects, and founders without recruiter spam or irrelevant noise.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-5">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Architecture Showcases
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Present full-stack projects, distributed systems benchmarks, and open-source tools with interactive tags and live demo links.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-5">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Engineering Deep Dives
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Publish rich markdown articles with syntax-highlighted code blocks, concurrency diagrams, and engage with technical peers.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Developers Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Developers
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Connect with leading software architects shaping modern technology
            </p>
          </div>
          <Link
            to="/explore"
            className="text-xs font-semibold text-indigo-500 hover:text-indigo-400 flex items-center gap-1"
          >
            Explore all developers <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDevs.map((dev) => (
            <DeveloperCard key={dev.id} developer={dev} />
          ))}
        </div>
      </section>

      {/* Trending Projects Section */}
      <section className="py-16 bg-slate-100/50 dark:bg-[#090D16]/60 border-y border-slate-200 dark:border-[#1F293D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Trending Projects
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Discover high-performance open-source libraries and systems
              </p>
            </div>
            <Link
              to="/projects"
              className="text-xs font-semibold text-indigo-500 hover:text-indigo-400 flex items-center gap-1"
            >
              Discover all projects <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((proj) => (
              <ProjectCard
                key={proj.id}
                project={proj}
                onOpenDetails={setSelectedProject}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Technical Blogs */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Latest Technical Blogs
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Read architectural post-mortems and cutting-edge tutorials
            </p>
          </div>
          <Link
            to="/blogs"
            className="text-xs font-semibold text-indigo-500 hover:text-indigo-400 flex items-center gap-1"
          >
            Browse all articles <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 border border-indigo-500/30 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Your Next Opportunity Starts With a Connection.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8">
            Join thousands of software engineers who showcase their architecture and discover peers on DevConnect.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold bg-white text-indigo-900 hover:bg-slate-100 shadow-xl transition-all active:scale-95"
          >
            <span>Create Your Developer Profile</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Detail Modal */}
      <ProjectDetailModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </div>
  );
};
