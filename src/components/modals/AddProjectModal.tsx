import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useAppStore } from '../../store/useAppStore';
import { useToast } from '../common/Toast';
import { Project } from '../../types';
import { Plus, X, Image as ImageIcon } from 'lucide-react';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProject?: Project | null;
}

const COVER_PRESETS = [
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80'
];

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
  initialProject
}) => {
  const { addProject, updateProject } = useAppStore();
  const { showToast } = useToast();

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(COVER_PRESETS[0]);
  const [category, setCategory] = useState<Project['category']>('Full Stack');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [techInput, setTechInput] = useState('');
  const [technologies, setTechnologies] = useState<string[]>(['React', 'TypeScript', 'Tailwind CSS']);

  useEffect(() => {
    if (initialProject) {
      setTitle(initialProject.title);
      setTagline(initialProject.tagline);
      setDescription(initialProject.description);
      setCoverImage(initialProject.coverImage);
      setCategory(initialProject.category);
      setGithubUrl(initialProject.githubUrl);
      setLiveUrl(initialProject.liveUrl || '');
      setTechnologies(initialProject.technologies);
    } else {
      setTitle('');
      setTagline('');
      setDescription('');
      setCoverImage(COVER_PRESETS[0]);
      setCategory('Full Stack');
      setGithubUrl('');
      setLiveUrl('');
      setTechnologies(['React', 'TypeScript', 'Tailwind CSS']);
    }
  }, [initialProject, isOpen]);

  const handleAddTech = () => {
    if (!techInput.trim()) return;
    if (technologies.includes(techInput.trim())) return;
    setTechnologies([...technologies, techInput.trim()]);
    setTechInput('');
  };

  const handleRemoveTech = (tech: string) => {
    setTechnologies(technologies.filter((t) => t !== tech));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !tagline.trim() || !description.trim()) {
      showToast('Please fill out all required fields', 'error');
      return;
    }

    if (initialProject) {
      updateProject(initialProject.id, {
        title: title.trim(),
        tagline: tagline.trim(),
        description: description.trim(),
        coverImage,
        category,
        githubUrl: githubUrl.trim(),
        liveUrl: liveUrl.trim() || undefined,
        technologies
      });
      showToast(`Updated "${title}" successfully!`, 'success');
    } else {
      addProject({
        title: title.trim(),
        tagline: tagline.trim(),
        description: description.trim(),
        coverImage,
        category,
        githubUrl: githubUrl.trim() || 'https://github.com',
        liveUrl: liveUrl.trim() || undefined,
        technologies
      });
      showToast(`Project "${title}" published!`, 'success');
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialProject ? 'Edit Project' : 'Showcase New Project'}
      subtitle="Share your architecture, open source tools, or commercial products with developers"
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Project Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. HyperSync Engine"
            className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Short Tagline *
          </label>
          <input
            type="text"
            required
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="e.g. Ultra-low latency real-time data sync with CRDTs and WebSockets"
            className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Project['category'])}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="Full Stack">Full Stack</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="AI / ML">AI / ML</option>
              <option value="Mobile">Mobile</option>
              <option value="Open Source">Open Source</option>
              <option value="DevOps">DevOps</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              GitHub Repository URL
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/..."
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Live Demo / Deployment URL (optional)
          </label>
          <input
            type="url"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            placeholder="https://myproject.dev"
            className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Full Architecture Description *
          </label>
          <textarea
            rows={3}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Explain the problem solved, architectural choices, and technical benchmarks..."
            className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Tech Stack Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Technologies Used
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTech();
                }
              }}
              placeholder="e.g. Rust, WebAssembly, Kafka..."
              className="flex-1 px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddTech}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => handleRemoveTech(tech)}
                  className="text-slate-400 hover:text-rose-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Thumbnail Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Select Cover Thumbnail
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {COVER_PRESETS.map((img, i) => (
              <div
                key={i}
                onClick={() => setCoverImage(img)}
                className={`h-14 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                  coverImage === img ? 'border-indigo-500 ring-2 ring-indigo-500/40 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30"
          >
            {initialProject ? 'Save Project' : 'Publish Project'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
