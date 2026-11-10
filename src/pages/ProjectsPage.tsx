import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  LayoutGrid, 
  List, 
  Star,
  ExternalLink
} from 'lucide-react';
import { GithubIcon } from '../components/common/BrandIcons';
import { useAppStore } from '../store/useAppStore';
import { ProjectCard } from '../components/cards/ProjectCard';
import { AddProjectModal } from '../components/modals/AddProjectModal';
import { ProjectDetailModal } from '../components/modals/ProjectDetailModal';
import { EmptyState } from '../components/common/EmptyState';
import { Project } from '../types';

export const ProjectsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchFilter = searchParams.get('filter');
  const queryParam = searchParams.get('search');

  const { projects, currentUser } = useAppStore();

  const [search, setSearch] = useState(queryParam || '');
  const [category, setCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'stars' | 'newest'>('stars');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [selectedDetailProject, setSelectedDetailProject] = useState<Project | null>(null);

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend', 'AI / ML', 'Mobile', 'Open Source', 'DevOps'];

  const filteredProjects = useMemo(() => {
    return projects
      .filter((p: Project) => {
        if (searchFilter === 'mine' && p.authorId !== currentUser.id) return false;
        if (category !== 'All' && p.category !== category) return false;
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchesTitle = p.title.toLowerCase().includes(q);
          const matchesTagline = p.tagline.toLowerCase().includes(q);
          const matchesTech = p.technologies.some((t: string) => t.toLowerCase().includes(q));
          if (!matchesTitle && !matchesTagline && !matchesTech) return false;
        }
        return true;
      })
      .sort((a: Project, b: Project) => {
        if (sortBy === 'stars') return b.stars - a.stars;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [projects, search, category, sortBy, searchFilter, currentUser.id]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-[#090D16] border border-slate-200 dark:border-[#1F293D] shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-indigo-500 dark:text-cyan-400 uppercase tracking-widest">
              Showcase & Open Source
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-xs text-slate-400">{projects.length} Verified Repos</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Discover Amazing Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
            Explore state-of-the-art tools, distributed systems, and modern apps engineered by elite software developers.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingProject(null);
            setIsAddModalOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white shadow-lg shadow-indigo-600/30 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Showcase New Project</span>
        </button>
      </div>

      {/* Search, Filter & View Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Field */}
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects by title, tech stack (e.g. Rust, React)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'stars' | 'newest')}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="stars">Most Starred</option>
              <option value="newest">Newest First</option>
            </select>

            {/* Grid / List View Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-800 text-indigo-500 shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-800 text-indigo-500 shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                category === cat
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Showcase Container */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          variant="projects"
          title="No projects match your filter"
          description="Try selecting a different tech stack category or showcase your own project now."
          actionText="Showcase New Project"
          onAction={() => {
            setSearch('');
            setCategory('All');
            setIsAddModalOpen(true);
          }}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p: Project) => (
            <ProjectCard
              key={p.id}
              project={p}
              onEdit={(proj) => {
                setEditingProject(proj);
                setIsAddModalOpen(true);
              }}
              onOpenDetails={setSelectedDetailProject}
            />
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {filteredProjects.map((p: Project) => (
            <div
              key={p.id}
              onClick={() => setSelectedDetailProject(p)}
              className="p-5 rounded-2xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer hover:border-indigo-500/40"
            >
              <div className="flex items-center gap-4">
                <img
                  src={p.coverImage}
                  alt=""
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-bold uppercase">
                      {p.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">by {p.authorName}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 max-w-xl">
                    {p.tagline}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {p.technologies.slice(0, 4).map((t: string) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" /> {p.stars}
                </span>
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 hover:text-indigo-400"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-white"
                    title="GitHub Repo"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Project Modal */}
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingProject(null);
        }}
        initialProject={editingProject}
      />

      {/* Project Detail Modal */}
      <ProjectDetailModal
        isOpen={!!selectedDetailProject}
        onClose={() => setSelectedDetailProject(null)}
        project={selectedDetailProject}
      />
    </div>
  );
};
