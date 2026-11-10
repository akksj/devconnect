import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ExternalLink, MoreVertical, Edit2, Trash2, Code2 } from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';
import confetti from 'canvas-confetti';
import { Project } from '../../types';
import { useAppStore } from '../../store/useAppStore';
import { SkillBadge } from '../common/SkillBadge';
import { useToast } from '../common/Toast';

interface ProjectCardProps {
  project: Project;
  onEdit?: (project: Project) => void;
  onOpenDetails?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEdit,
  onOpenDetails
}) => {
  const { currentUser, toggleStarProject, deleteProject } = useAppStore();
  const { showToast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);

  const isOwner = project.authorId === currentUser.id;

  const handleStar = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleStarProject(project.id);
    if (!project.isStarred) {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 }
      });
      showToast(`Starred "${project.title}"!`, 'success');
    } else {
      showToast(`Unstarred "${project.title}"`, 'info');
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    if (window.confirm(`Are you sure you want to delete "${project.title}"?`)) {
      deleteProject(project.id);
      showToast(`Project "${project.title}" deleted`, 'info');
    }
  };

  return (
    <div className="group relative rounded-2xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm hover:shadow-xl dark:hover:border-indigo-500/40 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
      {/* Cover Image & Category */}
      <div 
        onClick={() => onOpenDetails?.(project)}
        className="h-48 w-full relative overflow-hidden bg-slate-800 cursor-pointer"
      >
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        
        <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-900/80 text-white backdrop-blur-md border border-white/10">
          {project.category}
        </span>

        {/* Star Button */}
        <button
          onClick={handleStar}
          className={`absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md transition-all active:scale-95 ${
            project.isStarred
              ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
              : 'bg-slate-900/80 text-white hover:bg-slate-900 border border-white/10'
          }`}
        >
          <Star className={`w-3.5 h-3.5 ${project.isStarred ? 'fill-current' : ''}`} />
          <span>{project.stars}</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Title & Tagline */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="cursor-pointer" onClick={() => onOpenDetails?.(project)}>
            <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-cyan-400 transition-colors line-clamp-1">
              {project.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
              {project.tagline}
            </p>
          </div>

          {isOwner && (
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(!menuOpen);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-20 py-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(false);
                      onEdit?.(project);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit Project
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-rose-500 hover:bg-rose-500/10"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
          {project.technologies.slice(0, 4).map((tech) => (
            <SkillBadge key={tech} name={tech} size="sm" />
          ))}
          {project.technologies.length > 4 && (
            <span className="text-[10px] text-slate-400 self-center">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Author & External Links Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <Link
            to={`/profile/${project.authorId}`}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img
              src={project.authorAvatar}
              alt={project.authorName}
              className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
            />
            <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[120px]">
              {project.authorName}
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="GitHub Repository"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-indigo-500 dark:text-cyan-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors"
                title="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
