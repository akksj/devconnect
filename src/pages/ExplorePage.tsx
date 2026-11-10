import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MapPin, 
  Briefcase, 
  CheckCircle2, 
  Users, 
  Sparkles, 
  TrendingUp, 
  RotateCcw,
  SlidersHorizontal 
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { DeveloperCard } from '../components/cards/DeveloperCard';
import { EmptyState } from '../components/common/EmptyState';
import { MessagesModal } from '../components/modals/MessagesModal';
import { AvailabilityStatus } from '../types';

export const ExplorePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q');

  const { developers, currentUser } = useAppStore();

  const [search, setSearch] = useState(queryParam || '');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('All');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [messageDevId, setMessageDevId] = useState<string | null>(null);

  const availableSkills = ['React 19', 'TypeScript', 'Rust', 'Python', 'Go', 'Kubernetes', 'WebAssembly', 'Next.js', 'Tailwind CSS'];
  const locations = ['All', 'San Francisco, CA', 'Seattle, WA', 'Austin, TX', 'New York, NY', 'Berlin, Germany', 'London, UK'];
  const levels = ['All', 'Junior', 'Mid-Level', 'Senior', 'Staff/Principal', 'Lead'];
  const availabilities = ['All', 'Open to Work', 'Hiring', 'Mentoring', 'Building'];

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedSkills([]);
    setSelectedLocation('All');
    setSelectedLevel('All');
    setSelectedAvailability('All');
  };

  const filteredDevelopers = useMemo(() => {
    return developers.filter((dev) => {
      // Don't hide currentUser entirely, but place others prominently
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = dev.name.toLowerCase().includes(q);
        const matchesHeadline = dev.headline.toLowerCase().includes(q);
        const matchesBio = dev.bio.toLowerCase().includes(q);
        const matchesSkill = dev.skills.some((s) => s.name.toLowerCase().includes(q));
        if (!matchesName && !matchesHeadline && !matchesBio && !matchesSkill) return false;
      }

      if (selectedLocation !== 'All' && !dev.location.includes(selectedLocation)) return false;
      if (selectedLevel !== 'All' && dev.experienceLevel !== selectedLevel) return false;
      if (selectedAvailability !== 'All' && dev.availability !== selectedAvailability) return false;

      if (selectedSkills.length > 0) {
        const devSkillNames = dev.skills.map((s) => s.name.toLowerCase());
        const hasAllSelected = selectedSkills.every((s) => devSkillNames.includes(s.toLowerCase()));
        if (!hasAllSelected) return false;
      }

      return true;
    });
  }, [developers, search, selectedSkills, selectedLocation, selectedLevel, selectedAvailability]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-[#090D16] border border-slate-200 dark:border-[#1F293D] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-indigo-500 dark:text-cyan-400 uppercase tracking-widest">
              Global Talent Graph
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-xs text-slate-400">{developers.length} Verified Engineers</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Explore Developers & Architects
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
            Filter by verified technical skills, distributed systems experience, or availability for hiring and mentoring.
          </p>
        </div>

        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="md:hidden inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters ({selectedSkills.length + (selectedLocation !== 'All' ? 1 : 0)})</span>
        </button>
      </div>

      {/* Main 3-Column Discovery Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left: Filter Sidebar */}
        <aside
          className={`md:col-span-3 space-y-6 ${
            mobileFilterOpen ? 'block' : 'hidden md:block'
          }`}
        >
          <div className="p-5 rounded-2xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-indigo-500" /> Filters
              </h3>
              <button
                onClick={resetFilters}
                className="text-[11px] text-indigo-500 hover:text-indigo-400 flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Skills Multi-select */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">
                Technical Stack
              </label>
              <div className="flex flex-wrap gap-1.5">
                {availableSkills.map((skill) => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                          : 'bg-slate-50 dark:bg-[#111827] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-indigo-400'
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">
                Experience Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
              >
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">
                Availability
              </label>
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
              >
                {availabilities.map((av) => (
                  <option key={av} value={av}>
                    {av}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        {/* Center: Search Results & Developer Cards */}
        <div className="md:col-span-9 space-y-6">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, role (e.g. Staff Engineer), or skills..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Showing {filteredDevelopers.length} developers</span>
            <span>Sorted by relevance & activity</span>
          </div>

          {filteredDevelopers.length === 0 ? (
            <EmptyState
              variant="search"
              title="No developers found"
              description="Try adjusting your skills filter or searching for a broader term."
              actionText="Reset All Filters"
              onAction={resetFilters}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDevelopers.map((dev) => (
                <DeveloperCard
                  key={dev.id}
                  developer={dev}
                  onOpenMessage={(devId) => setMessageDevId(devId)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Messages Modal */}
      <MessagesModal
        isOpen={!!messageDevId}
        onClose={() => setMessageDevId(null)}
        defaultDevId={messageDevId}
      />
    </div>
  );
};
