import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User, FolderGit2, BookOpen, X, ArrowRight } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search developers, projects, blogs, tech...",
  className = "",
  autoFocus = false
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { developers, projects, blogs } = useAppStore();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const cleanQuery = query.trim().toLowerCase();

  const matchedDevelopers = cleanQuery
    ? developers.filter(
        (d) =>
          d.name.toLowerCase().includes(cleanQuery) ||
          d.headline.toLowerCase().includes(cleanQuery) ||
          d.skills.some((s) => s.name.toLowerCase().includes(cleanQuery))
      ).slice(0, 3)
    : [];

  const matchedProjects = cleanQuery
    ? projects.filter(
        (p) =>
          p.title.toLowerCase().includes(cleanQuery) ||
          p.tagline.toLowerCase().includes(cleanQuery) ||
          p.technologies.some((t) => t.toLowerCase().includes(cleanQuery))
      ).slice(0, 3)
    : [];

  const matchedBlogs = cleanQuery
    ? blogs.filter(
        (b) =>
          b.title.toLowerCase().includes(cleanQuery) ||
          b.category.toLowerCase().includes(cleanQuery) ||
          b.tags.some((t) => t.toLowerCase().includes(cleanQuery))
      ).slice(0, 3)
    : [];

  const totalResults = matchedDevelopers.length + matchedProjects.length + matchedBlogs.length;

  const handleSelect = (url: string) => {
    setIsOpen(false);
    setQuery('');
    navigate(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim()) {
      setIsOpen(false);
      navigate(`/explore?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-9 py-2 text-sm rounded-xl bg-slate-100 dark:bg-[#111827] border border-slate-200 dark:border-[#1F293D] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3 p-0.5 rounded text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && cleanQuery && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] rounded-2xl shadow-xl z-50 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 animate-in fade-in zoom-in-95 duration-150">
          {totalResults === 0 ? (
            <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
              No results found for "<span className="text-indigo-400">{query}</span>"
            </div>
          ) : (
            <div className="max-h-[380px] overflow-y-auto p-2 space-y-3">
              {/* Developers */}
              {matchedDevelopers.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <User className="w-3 h-3 text-indigo-400" />
                    Developers
                  </div>
                  <div className="space-y-1 mt-1">
                    {matchedDevelopers.map((dev) => (
                      <div
                        key={dev.id}
                        onClick={() => handleSelect(`/profile/${dev.id}`)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-[#1B263B] cursor-pointer transition-colors"
                      >
                        <img src={dev.avatar} alt={dev.name} className="w-8 h-8 rounded-full object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                            {dev.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {dev.headline}
                          </p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {matchedProjects.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <FolderGit2 className="w-3 h-3 text-cyan-400" />
                    Projects
                  </div>
                  <div className="space-y-1 mt-1">
                    {matchedProjects.map((proj) => (
                      <div
                        key={proj.id}
                        onClick={() => handleSelect(`/projects?search=${encodeURIComponent(proj.title)}`)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-[#1B263B] cursor-pointer transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0">
                          {proj.title[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                            {proj.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {proj.tagline}
                          </p>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                          ★ {proj.stars}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Blogs */}
              {matchedBlogs.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <BookOpen className="w-3 h-3 text-emerald-400" />
                    Articles
                  </div>
                  <div className="space-y-1 mt-1">
                    {matchedBlogs.map((blog) => (
                      <div
                        key={blog.id}
                        onClick={() => handleSelect(`/blogs/${blog.id}`)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-[#1B263B] cursor-pointer transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                            {blog.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {blog.category} • {blog.readingTime}
                          </p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="p-2.5 bg-slate-50 dark:bg-[#111827] text-center">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate(`/explore?q=${encodeURIComponent(query)}`);
              }}
              className="text-xs font-semibold text-indigo-500 hover:text-indigo-400 inline-flex items-center gap-1"
            >
              View all results for "{query}" <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
