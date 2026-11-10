import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UserPlus, 
  Star, 
  ThumbsUp, 
  MessageSquare, 
  Check, 
  X, 
  Trash2, 
  Info 
} from 'lucide-react';
import { NotificationItem as NotificationItemType } from '../../types';
import { useAppStore } from '../../store/useAppStore';
import { useToast } from '../common/Toast';

interface NotificationItemProps {
  notification: NotificationItemType;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const { 
    markNotificationAsRead, 
    clearNotification, 
    acceptConnectionRequest, 
    declineConnectionRequest 
  } = useAppStore();
  const { showToast } = useToast();

  const getIcon = () => {
    switch (notification.type) {
      case 'connection_request':
        return <UserPlus className="w-4 h-4 text-indigo-400" />;
      case 'connection_accepted':
        return <Check className="w-4 h-4 text-emerald-400" />;
      case 'star':
        return <Star className="w-4 h-4 text-amber-400 fill-current" />;
      case 'endorsement':
        return <ThumbsUp className="w-4 h-4 text-cyan-400" />;
      case 'comment':
        return <MessageSquare className="w-4 h-4 text-indigo-400" />;
      default:
        return <Info className="w-4 h-4 text-slate-400" />;
    }
  };

  const handleAccept = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (notification.connectionRequestId) {
      acceptConnectionRequest(notification.connectionRequestId);
      markNotificationAsRead(notification.id);
      showToast(`Connected with ${notification.actor.name}!`, 'success');
    }
  };

  const handleDecline = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (notification.connectionRequestId) {
      declineConnectionRequest(notification.connectionRequestId);
      markNotificationAsRead(notification.id);
      showToast('Connection request declined', 'info');
    }
  };

  return (
    <div
      onClick={() => markNotificationAsRead(notification.id)}
      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        !notification.read
          ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-500/30'
          : 'bg-white dark:bg-[#151E2E] border-slate-200 dark:border-[#1F293D]'
      }`}
    >
      <div className="flex items-start gap-3.5 flex-1 min-w-0">
        <div className="relative shrink-0">
          <img
            src={notification.actor.avatar}
            alt={notification.actor.name}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700"
          />
          <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-white dark:bg-[#151E2E] shadow-sm border border-slate-200 dark:border-slate-800">
            {getIcon()}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
              {notification.title}
            </h4>
            {!notification.read && (
              <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
            )}
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
            {notification.message}
          </p>

          <span className="text-[11px] text-slate-400 mt-1.5 block">
            {notification.timestamp}
          </span>
        </div>
      </div>

      {/* Action Area */}
      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
        {notification.actionRequired && notification.connectionRequestId ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handleAccept}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-colors"
            >
              Accept
            </button>
            <button
              onClick={handleDecline}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
            >
              Ignore
            </button>
          </div>
        ) : notification.targetUrl ? (
          <Link
            to={notification.targetUrl}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
          >
            View
          </Link>
        ) : null}

        <button
          onClick={(e) => {
            e.stopPropagation();
            clearNotification(notification.id);
          }}
          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
          title="Delete Notification"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
