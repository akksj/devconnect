import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Lock, Mail, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { GithubIcon } from '../components/common/BrandIcons';
import { useAppStore } from '../store/useAppStore';
import { useToast } from '../components/common/Toast';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('alex.rivera@devconnect.io');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const { login } = useAppStore();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please provide email and password', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      login(email);
      showToast('Welcome back, Alex Rivera!', 'success');
      navigate('/dashboard');
    }, 600);
  };

  const handleGithubLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login();
      showToast('Signed in via GitHub OAuth!', 'success');
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 rounded-3xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-2xl overflow-hidden">
        {/* Left Section: Branding & Developer Graphic */}
        <div className="p-8 sm:p-12 bg-gradient-to-br from-indigo-950 via-slate-900 to-[#090D16] text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-8">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 p-[1px] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="font-extrabold text-xl tracking-tight">
                Dev<span className="text-cyan-400">Connect</span>
              </span>
            </Link>

            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-4">
              Welcome back to your developer hub.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Showcase architecture, discover open source collaborations, and grow with leading engineers.
            </p>
          </div>

          <div className="my-8 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <p className="text-xs italic text-slate-300 leading-relaxed">
              "DevConnect revolutionized how we hire staff engineers. No resume buzzwords—just clean code, architecture writeups, and verified peer endorsements."
            </p>
            <div className="mt-3 flex items-center gap-2.5">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                alt="Sophia Chen"
                className="w-7 h-7 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-bold">Sophia Chen</p>
                <p className="text-[10px] text-cyan-400">Staff Frontend Engineer @ Vercel</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> End-to-end Encrypted
            </span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Free Forever
            </span>
          </div>
        </div>

        {/* Right Section: Login Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Sign In to DevConnect
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Enter your credentials or continue with GitHub
            </p>
          </div>

          {/* GitHub 1-Click Login */}
          <button
            onClick={handleGithubLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors shadow-sm mb-5"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Continue with GitHub</span>
          </button>

          <div className="relative flex items-center justify-center mb-5">
            <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
            <span className="bg-white dark:bg-[#151E2E] px-3 text-[11px] uppercase tracking-wider text-slate-400 absolute">
              or with email
            </span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Developer Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.rivera@devconnect.io"
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => showToast('Password reset link sent to your email!', 'info')}
                  className="text-xs text-indigo-500 hover:text-indigo-400"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-600 dark:text-slate-400">
                Remember this device for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 shadow-lg shadow-indigo-600/30 transition-all"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6">
            Don't have a DevConnect profile yet?{' '}
            <Link to="/register" className="font-semibold text-indigo-500 hover:text-indigo-400">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
