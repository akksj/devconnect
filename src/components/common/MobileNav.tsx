import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, FolderGit2, Bell, User } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const MobileNav: React.FC = () => {
  const { notifications, currentUser } = useAppStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const itemClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center flex-1 py-2 text-[10px] font-semibold transition-colors relative ${
      isActive
        ? 'text-indigo-600 dark:text-cyan-400'
        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
    }`;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#090D16]/95 backdrop-blur-lg border-t border-slate-200 dark:border-[#1F293D] px-2 py-1 flex items-center justify-around shadow-lg">
      <NavLink to="/" end className={itemClass}>
        <Home className="w-5 h-5 mb-0.5" />
        <span>Home</span>
      </NavLink>

      <NavLink to="/explore" className={itemClass}>
        <Compass className="w-5 h-5 mb-0.5" />
        <span>Explore</span>
      </NavLink>

      <NavLink to="/projects" className={itemClass}>
        <FolderGit2 className="w-5 h-5 mb-0.5" />
        <span>Projects</span>
      </NavLink>

      <NavLink to="/notifications" className={itemClass}>
        <div className="relative">
          <Bell className="w-5 h-5 mb-0.5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-2 min-w-[14px] h-[14px] rounded-full bg-indigo-600 text-[9px] font-bold text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
        <span>Alerts</span>
      </NavLink>

      <NavLink to={`/profile/${currentUser.id}`} className={itemClass}>
        <User className="w-5 h-5 mb-0.5" />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
};
