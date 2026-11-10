import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, UserPlus, Check, Clock, MessageSquare, ExternalLink, Sparkles } from 'lucide-react';
import { Developer } from '../../types';
import { useAppStore } from '../../store/useAppStore';
import { SkillBadge } from '../common/SkillBadge';
import { useToast } from '../common/Toast';

interface DeveloperCardProps {
  developer: Developer;
  onOpenMessage?: (devId: string) => void;
}

export const DeveloperCard: React.FC<DeveloperCardProps> = ({ developer, onOpenMessage }) => {
  const { 
    currentUser, 
    sendConnectionRequest, 
    cancelConnectionRequest, 
    endorseSkill 
  } = useAppStore();
  const { showToast } = useToast();

  const isCurrentUser = currentUser.id === developer.id;

  const handleConnectClick = () => {
    if (developer.connectionStatus === 'connected') {
      showToast(`Already connected with ${developer.name}`, 'info');
    } else if (developer.connectionStatus === 'pending_sent') {
      cancelConnectionRequest(developer.id);
      showToast('Connection request cancelled', 'info');
    } else {
      sendConnectionRequest(developer.id);
      showToast(`Connection request sent to ${developer.name}!`, 'success');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Open to Work':
        return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'Hiring':
        return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
      case 'Mentoring':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
      default:
        return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="group relative rounded-2xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm hover:shadow-xl dark:hover:border-indigo-500/40 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
      {/* Cover Header */}
      <div className="h-24 w-full relative overflow-hidden bg-slate-800">
        <img
          src={developer.coverImage}
          alt=""
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        {developer.availability && (
          <span
            className={`absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full border backdrop-blur-md ${getStatusBadge(
              developer.availability
            )}`}
          >
            {developer.availability}
          </span>
        )}
      </div>

      {/* Profile Info */}
      <div className="px-5 pt-0 pb-5 flex-1 flex flex-col -mt-10 relative">
        <div className="flex items-end justify-between mb-3">
          <Link to={`/profile/${developer.id}`} className="relative shrink-0">
            <img
              src={developer.avatar}
              alt={developer.name}
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white dark:ring-[#151E2E] shadow-md transition-transform group-hover:scale-105"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#151E2E]" />
          </Link>

          {developer.mutualConnections !== undefined && (
            <span className="text-[11px] text-slate-400">
              {developer.mutualConnections} mutual connections
            </span>
          )}
        </div>

        <div>
          <Link to={`/profile/${developer.id}`}>
            <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-cyan-400 transition-colors flex items-center gap-1.5 truncate">
              {developer.name}
            </h3>
          </Link>
          <p className="text-xs font-mono text-indigo-500 dark:text-cyan-400">
            @{developer.username}
          </p>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
          {developer.headline}
        </p>

        <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 mt-2">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="truncate">{developer.location}</span>
        </div>

        {/* Top Skills with endorsement clickability */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex flex-wrap gap-1.5">
            {developer.skills.slice(0, 4).map((skill) => (
              <SkillBadge
                key={skill.name}
                name={skill.name}
                endorsements={skill.endorsements}
                isEndorsed={skill.endorsedByCurrentUser}
                interactive={!isCurrentUser}
                onEndorse={() => {
                  endorseSkill(developer.id, skill.name);
                  showToast(
                    skill.endorsedByCurrentUser
                      ? `Removed endorsement for ${skill.name}`
                      : `Endorsed ${developer.name} for ${skill.name}!`,
                    'success'
                  );
                }}
                size="sm"
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
          {!isCurrentUser ? (
            <>
              <button
                onClick={handleConnectClick}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  developer.connectionStatus === 'connected'
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20'
                    : developer.connectionStatus === 'pending_sent'
                    ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20 hover:bg-amber-500/20'
                    : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-sm shadow-indigo-600/30'
                }`}
              >
                {developer.connectionStatus === 'connected' ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Connected
                  </>
                ) : developer.connectionStatus === 'pending_sent' ? (
                  <>
                    <Clock className="w-3.5 h-3.5" /> Pending
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3.5 h-3.5" /> Connect
                  </>
                )}
              </button>

              {developer.connectionStatus === 'connected' && onOpenMessage && (
                <button
                  onClick={() => onOpenMessage(developer.id)}
                  title="Direct Message"
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              )}
            </>
          ) : (
            <Link
              to={`/profile/${developer.id}`}
              className="w-full text-center py-2 px-3 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors"
            >
              View Your Profile
            </Link>
          )}

          <Link
            to={`/profile/${developer.id}`}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            title="View Full Profile"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
