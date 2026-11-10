import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Sun, 
  Moon, 
  Check, 
  Save, 
  Smartphone,
  Eye
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useToast } from '../components/common/Toast';

export const SettingsPage: React.FC = () => {
  const { 
    currentUser, 
    updateCurrentUser, 
    settings, 
    updateSettings, 
    theme, 
    setTheme 
  } = useAppStore();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'appearance' | 'privacy' | 'notifications' | 'security'>('profile');

  // Profile Form state
  const [profileForm, setProfileForm] = useState({
    name: currentUser.name,
    username: currentUser.username,
    headline: currentUser.headline,
    bio: currentUser.bio,
    location: currentUser.location,
    website: currentUser.website || '',
    github: currentUser.github || '',
    linkedin: currentUser.linkedin || '',
    avatar: currentUser.avatar
  });

  // Password state
  const [passwords, setPasswords] = useState({
    current: '',
    next: '',
    confirm: ''
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser(profileForm);
    showToast('Profile settings saved successfully!', 'success');
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwords.current || !passwords.next) {
      showToast('Please enter both current and new password', 'error');
      return;
    }
    if (passwords.next !== passwords.confirm) {
      showToast('New passwords do not match', 'error');
      return;
    }
    setPasswords({ current: '', next: '', confirm: '' });
    showToast('Security password updated!', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Developer Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your account preferences, security, appearance, and profile visibility
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Navigation Tabs List */}
        <div className="md:col-span-3 space-y-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
              activeTab === 'profile'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'hover:bg-slate-100 dark:hover:bg-[#151E2E] text-slate-700 dark:text-slate-300'
            }`}
          >
            <User className="w-4 h-4" /> Profile Info
          </button>

          <button
            onClick={() => setActiveTab('appearance')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
              activeTab === 'appearance'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'hover:bg-slate-100 dark:hover:bg-[#151E2E] text-slate-700 dark:text-slate-300'
            }`}
          >
            <Palette className="w-4 h-4" /> Appearance & Theme
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
              activeTab === 'privacy'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'hover:bg-slate-100 dark:hover:bg-[#151E2E] text-slate-700 dark:text-slate-300'
            }`}
          >
            <Eye className="w-4 h-4" /> Privacy & Visibility
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
              activeTab === 'notifications'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'hover:bg-slate-100 dark:hover:bg-[#151E2E] text-slate-700 dark:text-slate-300'
            }`}
          >
            <Bell className="w-4 h-4" /> Notification Alerts
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
              activeTab === 'security'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'hover:bg-slate-100 dark:hover:bg-[#151E2E] text-slate-700 dark:text-slate-300'
            }`}
          >
            <Shield className="w-4 h-4" /> Security & 2FA
          </button>
        </div>

        {/* Content Pane */}
        <div className="md:col-span-9">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Developer Profile Information
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  This information is displayed publicly on your DevConnect portfolio.
                </p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={profileForm.avatar}
                    alt=""
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/20"
                  />
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-slate-400 mb-1">
                      Avatar Image URL
                    </label>
                    <input
                      type="url"
                      value={profileForm.avatar}
                      onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">
                      Handle / Username
                    </label>
                    <input
                      type="text"
                      required
                      value={profileForm.username}
                      onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Professional Headline
                  </label>
                  <input
                    type="text"
                    required
                    value={profileForm.headline}
                    onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Bio & Technical Focus
                  </label>
                  <textarea
                    rows={3}
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={profileForm.location}
                      onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">
                      Portfolio Website
                    </label>
                    <input
                      type="url"
                      value={profileForm.website}
                      onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Profile
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Appearance & Theme */}
          {activeTab === 'appearance' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Interface Theme
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select your preferred color mode for coding and networking.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => {
                    setTheme('dark');
                    showToast('Dark theme activated', 'success');
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    theme === 'dark'
                      ? 'border-indigo-500 ring-2 ring-indigo-500/30 bg-[#090D16]'
                      : 'border-slate-200 dark:border-slate-800 bg-[#090D16] opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Moon className="w-4 h-4 text-indigo-400" /> Dark Mode
                    </span>
                    {theme === 'dark' && <Check className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    High-contrast dark canvas (#090D16) designed for prolonged IDE usage and low eye fatigue.
                  </p>
                </div>

                <div
                  onClick={() => {
                    setTheme('light');
                    showToast('Light theme activated', 'success');
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    theme === 'light'
                      ? 'border-indigo-500 ring-2 ring-indigo-500/30 bg-slate-50'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Sun className="w-4 h-4 text-amber-500" /> Light Mode
                    </span>
                    {theme === 'light' && <Check className="w-4 h-4 text-indigo-600" />}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Crisp, clean layout (#F8FAFC) optimized for high-brightness daylight environments.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Privacy & Visibility */}
          {activeTab === 'privacy' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Profile Visibility & Network Boundaries
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Control who can discover your architecture showcases and reach out.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-[#111827]">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Public Profile Indexing</h4>
                    <p className="text-[11px] text-slate-400">Allow your portfolio to be discoverable by search engines and guests</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.profileVisibility === 'public'}
                    onChange={(e) => {
                      updateSettings({ profileVisibility: e.target.checked ? 'public' : 'connections_only' });
                      showToast('Visibility updated', 'info');
                    }}
                    className="h-4 w-4 rounded text-indigo-600"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-[#111827]">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Display Email to Verified Peers</h4>
                    <p className="text-[11px] text-slate-400">Show your developer email on profile for direct contact</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.showEmail}
                    onChange={(e) => {
                      updateSettings({ showEmail: e.target.checked });
                      showToast('Email visibility updated', 'info');
                    }}
                    className="h-4 w-4 rounded text-indigo-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Notifications Alerts */}
          {activeTab === 'notifications' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Notification Delivery Preferences
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Choose which alerts trigger desktop push and email updates.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-[#111827]">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Email Digest & Connection Alerts</h4>
                    <p className="text-[11px] text-slate-400">Receive weekly summaries of stars, endorsements, and invites</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.emailAlerts}
                    onChange={(e) => {
                      updateSettings({ emailAlerts: e.target.checked });
                      showToast('Notification preference saved', 'info');
                    }}
                    className="h-4 w-4 rounded text-indigo-600"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-[#111827]">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Browser Push Notifications</h4>
                    <p className="text-[11px] text-slate-400">Instant sound and badge alerts when peers send direct messages</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.browserNotifications}
                    onChange={(e) => {
                      updateSettings({ browserNotifications: e.target.checked });
                      showToast('Browser notification preference saved', 'info');
                    }}
                    className="h-4 w-4 rounded text-indigo-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Security & 2FA */}
          {activeTab === 'security' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Password & Authentication Security
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Protect your developer account with strong cryptographic credentials.
                </p>
              </div>

              <form onSubmit={handleSavePassword} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwords.next}
                    onChange={(e) => setPasswords({ ...passwords, next: e.target.value })}
                    placeholder="New password (min 8 chars)"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    placeholder="Confirm new password"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30"
                >
                  Update Password
                </button>
              </form>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-emerald-400" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">Two-Factor Authentication (2FA)</h4>
                      <p className="text-[11px] text-slate-400">Hardware security key and TOTP authenticator enabled</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400">ACTIVE</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
