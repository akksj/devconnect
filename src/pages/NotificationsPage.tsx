import React, { useState } from 'react';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  Filter 
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { NotificationItem } from '../components/cards/NotificationItem';
import { EmptyState } from '../components/common/EmptyState';
import { useToast } from '../components/common/Toast';
import { NotificationItem as NotificationItemType } from '../types';

export const NotificationsPage: React.FC = () => {
  const { 
    notifications, 
    markAllNotificationsAsRead, 
    clearAllNotifications 
  } = useAppStore();
  const { showToast } = useToast();

  const [filterType, setFilterType] = useState<string>('all');

  const filteredNotifications = notifications.filter((n: NotificationItemType) => {
    if (filterType === 'unread') return !n.read;
    if (filterType === 'connections') return n.type === 'connection_request' || n.type === 'connection_accepted';
    if (filterType === 'endorsements') return n.type === 'endorsement';
    if (filterType === 'stars') return n.type === 'star';
    return true;
  });

  const unreadCount = notifications.filter((n: NotificationItemType) => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Notification Center
              </h1>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-600 text-white">
                  {unreadCount} unread
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Real-time activity updates from peer developers and projects
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={() => {
                markAllNotificationsAsRead();
                showToast('All notifications marked as read', 'success');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 hover:bg-indigo-100 transition-colors"
            >
              <CheckCheck className="w-3.5 h-3.5" /> Mark all read
            </button>
          )}

          {notifications.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Clear all notifications?')) {
                  clearAllNotifications();
                  showToast('All notifications cleared', 'info');
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear all
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            filterType === 'all'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] text-slate-600 dark:text-slate-400'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilterType('unread')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            filterType === 'unread'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] text-slate-600 dark:text-slate-400'
          }`}
        >
          Unread ({unreadCount})
        </button>
        <button
          onClick={() => setFilterType('connections')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            filterType === 'connections'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] text-slate-600 dark:text-slate-400'
          }`}
        >
          Connections
        </button>
        <button
          onClick={() => setFilterType('endorsements')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            filterType === 'endorsements'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] text-slate-600 dark:text-slate-400'
          }`}
        >
          Endorsements
        </button>
        <button
          onClick={() => setFilterType('stars')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            filterType === 'stars'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] text-slate-600 dark:text-slate-400'
          }`}
        >
          Project Stars
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <EmptyState
            variant="notifications"
            title="No notifications to show"
            description="You are completely caught up! New invites, stars, and skill endorsements will appear here."
          />
        ) : (
          filteredNotifications.map((notif: NotificationItemType) => (
            <NotificationItem key={notif.id} notification={notif} />
          ))
        )}
      </div>
    </div>
  );
};
