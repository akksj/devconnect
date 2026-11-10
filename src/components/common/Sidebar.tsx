import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  FolderGit2,
  BookOpen,
  Users,
  Compass,
  Bell,
  Settings,
  Sparkles
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const Sidebar: React.FC = () => {
  const { notifications, connectionRequests, currentUser } = useAppStore();

  const unreadNotifs = notifications.filter((n) => !n.read).length;
  const pendingRequests = connectionRequests.filter((r) => r.status === 'pending').length;

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
    { label: 'My Profile', icon: User, to: `/profile/${currentUser.id}` },
    { label: 'My Projects', icon: FolderGit2, to: '/projects?filter=mine' },
    { label: 'My Blogs', icon: BookOpen, to: '/blogs' },
    { label: 'Connections', icon: Users, to: '/connections', badge: pendingRequests > 0 ? pendingRequests : undefined },
    { label: 'Explore Developers', icon: Compass, to: '/explore' },
    { label: 'Notifications', icon: Bell, to: '/notifications', badge: unreadNotifs > 0 ? unreadNotifs : undefined },
    { label: 'Settings', icon: Settings, to: '/settings' },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
      isActive
        ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20'
        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#151E2E]'
    }`;

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-6">
      {/* Mini Profile Card */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/20"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#151E2E]" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
              {currentUser.name}
            </h4>
            <p className="text-xs text-indigo-500 dark:text-cyan-400 font-mono truncate">
              @{currentUser.username}
            </p>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-center">
          <div className="p-1.5 rounded-xl bg-slate-50 dark:bg-[#111827]">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Connections</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white">{currentUser.connectionsCount}</span>
          </div>
          <div className="p-1.5 rounded-xl bg-slate-50 dark:bg-[#111827]">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Projects</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white">{currentUser.projectsCount}</span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="p-2 rounded-2xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-400 group-[.bg-indigo-600]:bg-white group-[.bg-indigo-600]:text-indigo-600">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Pro Badge Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-900 border border-indigo-500/20 text-white relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            DevConnect Pro
          </span>
        </div>
        <p className="text-xs text-slate-300 mb-3 leading-relaxed">
          Unlock prioritized hiring visibility, unlimited endorsements, and advanced profile analytics.
        </p>
        <button className="w-full py-1.5 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-colors">
          Upgrade Profile
        </button>
      </div>
    </aside>
  );
};
