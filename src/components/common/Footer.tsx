import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Heart, ExternalLink } from 'lucide-react';
import { GithubIcon, TwitterIcon, LinkedinIcon } from './BrandIcons';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-50 dark:bg-[#090D16] border-t border-slate-200 dark:border-[#1F293D] mt-20 pt-16 pb-24 md:pb-12 text-slate-600 dark:text-slate-400 text-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand Info */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group inline-block">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[1px]">
                <div className="w-full h-full bg-white dark:bg-[#090D16] rounded-[11px] flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                </div>
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                Dev<span className="text-indigo-500 dark:text-cyan-400">Connect</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mb-6 leading-relaxed">
              The premier professional network and portfolio platform built by developers, for developers. Showcase your architecture, connect with peers, and unlock opportunities.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/explore" className="hover:text-indigo-500 transition-colors">
                  Explore Developers
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-indigo-500 transition-colors">
                  Project Showcase
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-indigo-500 transition-colors">
                  Engineering Blogs
                </Link>
              </li>
              <li>
                <Link to="/connections" className="hover:text-indigo-500 transition-colors">
                  Networking Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#features" className="hover:text-indigo-500 transition-colors">
                  Platform Features
                </a>
              </li>
              <li>
                <a href="#stats" className="hover:text-indigo-500 transition-colors">
                  Community Stats
                </a>
              </li>
              <li>
                <Link to="/settings" className="hover:text-indigo-500 transition-colors">
                  Developer Settings
                </Link>
              </li>
              <li>
                <span className="inline-flex items-center gap-1.5 text-emerald-500 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Systems Operational
                </span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Legal & Trust
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#" className="hover:text-indigo-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-500 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-500 transition-colors">
                  Code of Conduct
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-500 transition-colors">
                  Security Disclosures
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-[#1F293D] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} DevConnect Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered for elite software developers with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
          </p>
        </div>
      </div>
    </footer>
  );
};
