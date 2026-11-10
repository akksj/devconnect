import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bold, 
  Italic, 
  Heading1, 
  Heading2, 
  Code, 
  Quote, 
  List, 
  Eye, 
  Edit3, 
  ArrowLeft, 
  Sparkles, 
  Send,
  Save
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useToast } from '../components/common/Toast';
import { Blog } from '../types';

const COVER_OPTIONS = [
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80'
];

export const BlogEditorPage: React.FC = () => {
  const navigate = useNavigate();
  const { addBlog } = useAppStore();
  const { showToast } = useToast();

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState<Blog['category']>('Frontend');
  const [tagsInput, setTagsInput] = useState('React, TypeScript, Architecture');
  const [coverImage, setCoverImage] = useState(COVER_OPTIONS[0]);
  const [content, setContent] = useState(
`## Overview

Explain the problem space, architectural trade-offs, and reasons for choosing this design.

\`\`\`typescript
// High performance benchmark
export async function executeDistributedPipeline() {
  const stream = await openEdgeStream();
  return stream.processParallel();
}
\`\`\`

## Deep Dive & Findings

Share the metrics, p99 latency improvements, and lessons learned.
`
  );

  const [previewMode, setPreviewMode] = useState(false);

  const insertFormatting = (prefix: string, suffix: string = '') => {
    setContent((prev) => prev + `\n${prefix}Text${suffix}\n`);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      showToast('Please fill out title, excerpt and article content', 'error');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    addBlog({
      title: title.trim(),
      slug: title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: excerpt.trim(),
      content: content.trim(),
      coverImage,
      category,
      tags,
      readingTime: `${Math.max(3, Math.ceil(content.split(' ').length / 150))} min read`
    });

    showToast('Technical article published to DevConnect!', 'success');
    navigate('/blogs');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/blogs')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Cancel & Return
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              previewMode
                ? 'bg-indigo-600 text-white'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
            }`}
          >
            {previewMode ? <Edit3 className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{previewMode ? 'Edit Markdown' : 'Preview Live'}</span>
          </button>

          <button
            onClick={() => showToast('Draft saved to local storage', 'info')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={handlePublish}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Article</span>
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="rounded-3xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm p-6 sm:p-8 space-y-6">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Article Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Architecting Distributed Stream Processing in Rust & Kafka"
            className="w-full text-2xl sm:text-3xl font-extrabold bg-transparent text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 focus:outline-none focus:border-indigo-500 placeholder-slate-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Blog['category'])}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Architecture">Architecture</option>
              <option value="AI & ML">AI & ML</option>
              <option value="DevOps">DevOps</option>
              <option value="Career">Career</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="React, Distributed Systems, Next.js"
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">
            Excerpt / Summary
          </label>
          <textarea
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Brief summary shown on cards and search engines..."
            className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
          />
        </div>

        {/* Cover Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">
            Cover Banner
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {COVER_OPTIONS.map((img, i) => (
              <div
                key={i}
                onClick={() => setCoverImage(img)}
                className={`h-16 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                  coverImage === img ? 'border-indigo-500 ring-2 ring-indigo-500/30 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Markdown Formatting Toolbar */}
        {!previewMode && (
          <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => insertFormatting('**', '**')}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('*', '*')}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('# ')}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
              title="H1"
            >
              <Heading1 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('## ')}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
              title="H2"
            >
              <Heading2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('```typescript\n', '\n```')}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
              title="Code Block"
            >
              <Code className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('> ')}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
              title="Quote"
            >
              <Quote className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('- ')}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Content Area / Live Preview */}
        {previewMode ? (
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 min-h-[360px] prose dark:prose-invert max-w-none text-sm leading-relaxed">
            <h1 className="text-2xl font-bold mb-4">{title || 'Untitled Article'}</h1>
            <p className="text-slate-400 italic mb-6">{excerpt}</p>
            <div className="whitespace-pre-line">{content}</div>
          </div>
        ) : (
          <div>
            <textarea
              rows={16}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your technical write-up in Markdown..."
              className="w-full p-4 font-mono text-xs sm:text-sm rounded-2xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        )}
      </div>
    </div>
  );
};
