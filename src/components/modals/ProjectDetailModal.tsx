import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '../common/Modal';
import { Star, ExternalLink, Calendar, Code, Share2 } from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';
import confetti from 'canvas-confetti';
import { Project } from '../../types';
import { useAppStore } from '../../store/useAppStore';
import { SkillBadge } from '../common/SkillBadge';
import { useToast } from '../common/Toast';

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  isOpen,
  onClose,
  project
}) => {
  const { toggleStarProject } = useAppStore();
  const { showToast } = useToast();

  if (!project) return null;

  const handleStar = () => {
    toggleStarProject(project.id);
    if (!project.isStarred) {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      showToast(`Starred "${project.title}"!`, 'success');
    } else {
      showToast(`Unstarred "${project.title}"`, 'info');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.origin + `/projects?search=${encodeURIComponent(project.title)}`);
    showToast('Project link copied to clipboard!', 'info');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project.title}
      subtitle={project.tagline}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Cover Hero */}
        <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-800">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full bg-slate-900/80 text-white backdrop-blur-md border border-white/10">
            {project.category}
          </span>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={handleStar}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                project.isStarred
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-amber-400'
              }`}
            >
              <Star className={`w-4 h-4 ${project.isStarred ? 'fill-current' : ''}`} />
              <span>{project.isStarred ? 'Starred' : 'Star Project'} ({project.stars})</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-400 transition-colors"
              title="Share Link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repo</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Author Card */}
        <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <img
              src={project.authorAvatar}
              alt={project.authorName}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-500/20"
            />
            <div>
              <p className="text-xs text-slate-400">Created by</p>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {project.authorName}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-xs">
                {project.authorHeadline}
              </p>
            </div>
          </div>
          <Link
            to={`/profile/${project.authorId}`}
            onClick={onClose}
            className="text-xs font-semibold text-indigo-500 hover:text-indigo-400"
          >
            View Developer Profile →
          </Link>
        </div>

        {/* Architecture & Description */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Architecture & Deep Dive
          </h4>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
        </div>

        {/* Technologies */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <SkillBadge key={t} name={t} size="md" />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
