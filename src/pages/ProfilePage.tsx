import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Globe, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  Edit3, 
  UserPlus, 
  Check, 
  Clock, 
  MessageSquare, 
  Share2, 
  Flame,
  Award
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../components/common/BrandIcons';
import { useAppStore } from '../store/useAppStore';
import { SkillBadge } from '../components/common/SkillBadge';
import { ProjectCard } from '../components/cards/ProjectCard';
import { BlogCard } from '../components/cards/BlogCard';
import { EditProfileModal } from '../components/modals/EditProfileModal';
import { ProjectDetailModal } from '../components/modals/ProjectDetailModal';
import { MessagesModal } from '../components/modals/MessagesModal';
import { useToast } from '../components/common/Toast';
import { Project, Developer } from '../types';

export const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    currentUser, 
    developers, 
    projects, 
    blogs, 
    sendConnectionRequest, 
    cancelConnectionRequest, 
    endorseSkill 
  } = useAppStore();
  const { showToast } = useToast();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'experience' | 'blogs'>('overview');

  // Identify target developer
  const profileDev: Developer = id === 'current-user' || id === currentUser.id
    ? currentUser
    : developers.find((d) => d.id === id) || currentUser;

  const isOwnProfile = profileDev.id === currentUser.id;

  // Filter projects and blogs by this developer
  const devProjects = projects.filter((p) => p.authorId === profileDev.id || (isOwnProfile && p.authorId === 'current-user'));
  const devBlogs = blogs.filter((b) => b.authorId === profileDev.id || (isOwnProfile && b.authorId === 'current-user'));

  const handleConnect = () => {
    if (profileDev.connectionStatus === 'connected') {
      showToast(`Already connected with ${profileDev.name}`, 'info');
    } else if (profileDev.connectionStatus === 'pending_sent') {
      cancelConnectionRequest(profileDev.id);
      showToast('Connection request withdrawn', 'info');
    } else {
      sendConnectionRequest(profileDev.id);
      showToast(`Connection request sent to ${profileDev.name}!`, 'success');
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Profile URL copied to clipboard!', 'info');
  };

  // Generate GitHub style contribution heatmap data (32 weeks x 7 days)
  const generateContributionHeatmap = () => {
    const weeks = [];
    for (let w = 0; w < 32; w++) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        const val = Math.floor(Math.sin(w * 0.4 + d) * 5 + Math.cos(w * 0.8) * 4);
        const count = val > 6 ? val : val > 3 ? 3 : val > 1 ? 1 : 0;
        days.push(count);
      }
      weeks.push(days);
    }
    return weeks;
  };

  const heatmapWeeks = generateContributionHeatmap();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Profile Header & Banner */}
      <div className="rounded-3xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-md overflow-hidden">
        {/* Cover Image */}
        <div className="h-56 sm:h-72 w-full relative overflow-hidden bg-slate-900">
          <img
            src={profileDev.coverImage}
            alt=""
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-slate-900/80 text-white backdrop-blur-md border border-white/10 hover:bg-slate-900 transition-colors"
              title="Share Profile"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {isOwnProfile && (
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-900 hover:bg-slate-100 shadow-lg transition-all"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        {/* Profile Main Details Bar */}
        <div className="px-6 sm:px-10 pb-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
            <div className="relative inline-block">
              <img
                src={profileDev.avatar}
                alt={profileDev.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover ring-4 ring-white dark:ring-[#151E2E] shadow-2xl"
              />
              <span className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-[#151E2E]" />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {!isOwnProfile ? (
                <>
                  <button
                    onClick={handleConnect}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                      profileDev.connectionStatus === 'connected'
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                        : profileDev.connectionStatus === 'pending_sent'
                        ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                    }`}
                  >
                    {profileDev.connectionStatus === 'connected' ? (
                      <>
                        <Check className="w-4 h-4" /> Connected
                      </>
                    ) : profileDev.connectionStatus === 'pending_sent' ? (
                      <>
                        <Clock className="w-4 h-4" /> Pending
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" /> Connect
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setIsMessageModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Message</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Update Profile Info</span>
                </button>
              )}
            </div>
          </div>

          {/* Name & Headline */}
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {profileDev.name}
              </h1>
              <span className="text-xs font-mono text-indigo-500 dark:text-cyan-400">
                @{profileDev.username}
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                {profileDev.availability}
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              {profileDev.headline}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> {profileDev.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Joined {profileDev.joinedDate}
              </span>
              {profileDev.website && (
                <a
                  href={profileDev.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-indigo-500 hover:underline"
                >
                  <Globe className="w-3.5 h-3.5" /> {profileDev.website.replace('https://', '')}
                </a>
              )}
            </div>
          </div>

          {/* Social Links Bar */}
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            {profileDev.github && (
              <a
                href={profileDev.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:text-indigo-400 transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {profileDev.linkedin && (
              <a
                href={profileDev.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:text-indigo-400 transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}
            {profileDev.twitter && (
              <a
                href={profileDev.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:text-indigo-400 transition-colors"
                title="Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Profile Statistics Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-slate-200 dark:border-[#1F293D] divide-x divide-slate-200 dark:divide-slate-800 bg-slate-50 dark:bg-[#111827]">
          <div className="p-4 text-center">
            <span className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              {profileDev.connectionsCount}
            </span>
            <span className="text-[11px] uppercase tracking-wider text-slate-500 block">Connections</span>
          </div>
          <div className="p-4 text-center">
            <span className="text-xl sm:text-2xl font-extrabold text-indigo-500 dark:text-cyan-400">
              {devProjects.length || profileDev.projectsCount}
            </span>
            <span className="text-[11px] uppercase tracking-wider text-slate-500 block">Projects</span>
          </div>
          <div className="p-4 text-center">
            <span className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              {profileDev.endorsementsCount}
            </span>
            <span className="text-[11px] uppercase tracking-wider text-slate-500 block">Endorsements</span>
          </div>
          <div className="p-4 text-center">
            <span className="text-xl sm:text-2xl font-extrabold text-emerald-500">
              {profileDev.profileViews}
            </span>
            <span className="text-[11px] uppercase tracking-wider text-slate-500 block">Profile Views</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'overview'
              ? 'border-indigo-600 text-indigo-600 dark:border-cyan-400 dark:text-cyan-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Overview & Experience
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'projects'
              ? 'border-indigo-600 text-indigo-600 dark:border-cyan-400 dark:text-cyan-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Showcased Projects ({devProjects.length})
        </button>
        <button
          onClick={() => setActiveTab('blogs')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'blogs'
              ? 'border-indigo-600 text-indigo-600 dark:border-cyan-400 dark:text-cyan-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Technical Blogs ({devBlogs.length})
        </button>
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* About Me Section */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm">
              <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                About Me
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {profileDev.bio}
              </p>
            </div>

            {/* Experience Section */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Briefcase className="w-5 h-5 text-indigo-500 dark:text-cyan-400" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Professional Experience
                </h2>
              </div>

              {profileDev.experience.length > 0 ? (
                <div className="space-y-8 relative pl-6 border-l-2 border-slate-200 dark:border-slate-800">
                  {profileDev.experience.map((exp) => (
                    <div key={exp.id} className="relative group">
                      <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white dark:bg-[#151E2E] border-2 border-indigo-500 group-hover:scale-125 transition-transform" />
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          {exp.role}
                        </h3>
                        <span className="text-xs text-slate-400 font-mono">
                          {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-indigo-500 dark:text-cyan-400 mt-0.5">
                        {exp.company} • {exp.location}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {exp.technologies.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">No work experience listed yet.</p>
              )}
            </div>

            {/* Education Section */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="w-5 h-5 text-indigo-500 dark:text-cyan-400" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Education & Honors
                </h2>
              </div>
              {profileDev.education.length > 0 ? (
                <div className="space-y-4">
                  {profileDev.education.map((edu) => (
                    <div key={edu.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111827] border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{edu.institution}</h4>
                        <span className="text-xs text-slate-400 font-mono">{edu.year}</span>
                      </div>
                      <p className="text-xs text-indigo-500 dark:text-cyan-400 mt-0.5">{edu.degree}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{edu.field}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">Education not specified.</p>
              )}
            </div>

            {/* GitHub Activity Heatmap */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <GithubIcon className="w-5 h-5 text-indigo-500 dark:text-cyan-400" />
                  <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    GitHub Activity Matrix
                  </h2>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1">
                  <Flame className="w-4 h-4 text-amber-500" /> 1,480 commits this year
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111827] border border-slate-100 dark:border-slate-800 overflow-x-auto">
                <div className="flex gap-1.5 min-w-[580px]">
                  {heatmapWeeks.map((week, wIndex) => (
                    <div key={wIndex} className="flex flex-col gap-1.5 flex-1">
                      {week.map((level, dIndex) => {
                        const levelColor =
                          level === 0
                            ? 'bg-slate-200 dark:bg-slate-800'
                            : level === 1
                            ? 'bg-indigo-300 dark:bg-indigo-900'
                            : level === 3
                            ? 'bg-indigo-500 dark:bg-indigo-600'
                            : 'bg-cyan-400 dark:bg-cyan-400';
                        return (
                          <div
                            key={dIndex}
                            title={`${level * 3} contributions`}
                            className={`w-3 h-3 rounded-sm ${levelColor} transition-all hover:ring-2 hover:ring-white`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <span>Calculated via official GitHub commit logs</span>
                  <div className="flex items-center gap-1.5">
                    <span>Less</span>
                    <span className="w-2.5 h-2.5 rounded-sm bg-slate-200 dark:bg-slate-800" />
                    <span className="w-2.5 h-2.5 rounded-sm bg-indigo-300 dark:bg-indigo-900" />
                    <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500 dark:bg-indigo-600" />
                    <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400" />
                    <span>More</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Skills & Recommendations */}
          <div className="lg:col-span-4 space-y-8">
            {/* Skills & Endorsements Section */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Technical Skills ({profileDev.skills.length})
                </h3>
                <span className="text-xs text-indigo-400 font-mono">Click to endorse</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {profileDev.skills.map((skill) => (
                  <SkillBadge
                    key={skill.name}
                    name={skill.name}
                    endorsements={skill.endorsements}
                    isEndorsed={skill.endorsedByCurrentUser}
                    interactive={!isOwnProfile}
                    onEndorse={() => {
                      endorseSkill(profileDev.id, skill.name);
                      showToast(
                        skill.endorsedByCurrentUser
                          ? `Removed endorsement for ${skill.name}`
                          : `Endorsed ${profileDev.name} for ${skill.name}!`,
                        'success'
                      );
                    }}
                    size="md"
                  />
                ))}
              </div>
            </div>

            {/* Testimonials / Peer Endorsements */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Peer Recommendations
                </h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111827] border border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
                    "{profileDev.name.split(' ')[0]} is an exceptional engineer. Their deep grasp of distributed concurrency and sub-millisecond edge architecture made our entire infrastructure rock-solid."
                  </p>
                  <div className="mt-3 flex items-center gap-2.5">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                      alt=""
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Marcus Vance</p>
                      <p className="text-[10px] text-slate-400">Principal Systems Architect @ Cloudflare</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Showcased Projects */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Projects by {profileDev.name}
            </h2>
            {isOwnProfile && (
              <Link
                to="/projects"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
              >
                + Add New Project
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devProjects.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onOpenDetails={setSelectedProject}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tab: Technical Blogs */}
      {activeTab === 'blogs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Articles Published by {profileDev.name}
            </h2>
            {isOwnProfile && (
              <Link
                to="/blogs/new"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
              >
                + Write New Article
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devBlogs.map((b) => (
              <BlogCard key={b.id} blog={b} />
            ))}
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

      {/* Detail Project Modal */}
      <ProjectDetailModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />

      {/* Messages Modal */}
      <MessagesModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        defaultDevId={profileDev.id}
      />
    </div>
  );
};
