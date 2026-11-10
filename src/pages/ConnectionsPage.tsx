import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  UserCheck, 
  Clock, 
  Sparkles, 
  Search, 
  Check, 
  X, 
  Trash2, 
  MessageSquare, 
  ExternalLink,
  Plus
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useToast } from '../components/common/Toast';
import { EmptyState } from '../components/common/EmptyState';
import { MessagesModal } from '../components/modals/MessagesModal';

export const ConnectionsPage: React.FC = () => {
  const { 
    currentUser, 
    developers, 
    connectionRequests, 
    acceptConnectionRequest, 
    declineConnectionRequest, 
    cancelConnectionRequest, 
    removeConnection,
    sendConnectionRequest 
  } = useAppStore();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'my' | 'pending' | 'sent' | 'suggestions'>('my');
  const [search, setSearch] = useState('');
  const [activeChatDevId, setActiveChatDevId] = useState<string | null>(null);

  // Connected devs
  const connectedDevs = developers.filter((d) => d.connectionStatus === 'connected' && d.id !== currentUser.id);

  // Pending incoming requests
  const pendingRequests = connectionRequests.filter(
    (r) => r.status === 'pending' && r.toUserId === currentUser.id
  );

  // Sent requests
  const sentRequests = connectionRequests.filter(
    (r) => r.status === 'pending' && r.fromUser.id === currentUser.id
  );

  // Suggestions
  const suggestions = developers.filter(
    (d) => d.id !== currentUser.id && d.connectionStatus !== 'connected' && d.connectionStatus !== 'pending_sent'
  );

  const filteredConnectedDevs = connectedDevs.filter((d) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return d.name.toLowerCase().includes(q) || d.headline.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-[#090D16] border border-slate-200 dark:border-[#1F293D] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-indigo-500 dark:text-cyan-400 uppercase tracking-widest">
              Professional Network
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-xs text-slate-400">{currentUser.connectionsCount} Active Connections</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Developer Connections
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
            Manage your peer relationships, accept invitations from software engineers, and expand your network.
          </p>
        </div>
      </div>

      {/* Tabs & Search Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('my')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'my'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>My Connections ({connectedDevs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('pending')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'pending'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Pending Requests</span>
            {pendingRequests.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-cyan-400 text-slate-950 font-bold">
                {pendingRequests.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('sent')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'sent'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Sent Requests ({sentRequests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('suggestions')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'suggestions'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Suggestions</span>
          </button>
        </div>

        {activeTab === 'my' && (
          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search connections..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] text-slate-900 dark:text-white focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Tab: My Connections */}
      {activeTab === 'my' && (
        <div>
          {filteredConnectedDevs.length === 0 ? (
            <EmptyState
              title="No connections found"
              description="You have not connected with any developers matching your criteria yet. Explore suggestions to grow your network."
              actionText="Discover Engineers"
              onAction={() => setActiveTab('suggestions')}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConnectedDevs.map((dev) => (
                <div
                  key={dev.id}
                  className="p-5 rounded-2xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="flex items-start gap-3.5 mb-4">
                    <img
                      src={dev.avatar}
                      alt={dev.name}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500/20 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <Link to={`/profile/${dev.id}`}>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white hover:text-indigo-400 truncate">
                          {dev.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-indigo-500 dark:text-cyan-400 font-mono truncate">
                        @{dev.username}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                        {dev.headline}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setActiveChatDevId(dev.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Message</span>
                    </button>

                    <Link
                      to={`/profile/${dev.id}`}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                      title="View Profile"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => {
                        if (window.confirm(`Disconnect from ${dev.name}?`)) {
                          removeConnection(dev.id);
                          showToast(`Removed ${dev.name} from connections`, 'info');
                        }
                      }}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                      title="Remove Connection"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Pending Requests */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          {pendingRequests.length === 0 ? (
            <EmptyState
              title="No pending invitations"
              description="When other engineers invite you to connect, their invitations will appear here."
            />
          ) : (
            pendingRequests.map((req) => (
              <div
                key={req.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={req.fromUser.avatar}
                    alt={req.fromUser.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/20 shrink-0"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {req.fromUser.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {req.fromUser.headline}
                    </p>
                    {req.note && (
                      <p className="text-xs text-indigo-400 mt-2 p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 italic">
                        "{req.note}"
                      </p>
                    )}
                    <span className="text-[10px] text-slate-400 mt-2 block">
                      Sent {req.sentAt} • {req.fromUser.mutualConnections} mutual connections
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => {
                      acceptConnectionRequest(req.id);
                      showToast(`Accepted invitation from ${req.fromUser.name}!`, 'success');
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm"
                  >
                    <Check className="w-3.5 h-3.5" /> Accept
                  </button>

                  <button
                    onClick={() => {
                      declineConnectionRequest(req.id);
                      showToast('Invitation declined', 'info');
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                  >
                    <X className="w-3.5 h-3.5" /> Decline
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab: Sent Requests */}
      {activeTab === 'sent' && (
        <div className="space-y-4">
          {sentRequests.length === 0 ? (
            <EmptyState
              title="No outgoing requests"
              description="You have no pending outgoing connection invitations."
            />
          ) : (
            sentRequests.map((req) => (
              <div
                key={req.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm flex items-center justify-between"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Request sent to developer
                  </h4>
                  <span className="text-xs text-slate-400">Status: Waiting for acceptance</span>
                </div>

                <button
                  onClick={() => {
                    cancelConnectionRequest(req.toUserId);
                    showToast('Connection request cancelled', 'info');
                  }}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors"
                >
                  Cancel Request
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab: Suggestions */}
      {activeTab === 'suggestions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestions.map((dev) => (
            <div
              key={dev.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-start gap-3.5 mb-3">
                <img
                  src={dev.avatar}
                  alt={dev.name}
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500/20 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <Link to={`/profile/${dev.id}`}>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white hover:text-indigo-400 truncate">
                      {dev.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-indigo-400 font-mono">@{dev.username}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                    {dev.headline}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => {
                    sendConnectionRequest(dev.id);
                    showToast(`Connection request sent to ${dev.name}!`, 'success');
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Connect</span>
                </button>

                <Link
                  to={`/profile/${dev.id}`}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Messages Modal */}
      <MessagesModal
        isOpen={!!activeChatDevId}
        onClose={() => setActiveChatDevId(null)}
        defaultDevId={activeChatDevId}
      />
    </div>
  );
};
