import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  change?: string;
  isPositive?: boolean;
  accentColor?: 'indigo' | 'cyan' | 'emerald' | 'amber';
  suffix?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon: Icon,
  change,
  isPositive = true,
  accentColor = 'indigo',
  suffix = ''
}) => {
  const colorMap = {
    indigo: {
      bg: 'bg-indigo-500/10 dark:bg-indigo-500/10',
      text: 'text-indigo-600 dark:text-indigo-400',
      border: 'border-indigo-500/20',
      glow: 'group-hover:shadow-glow-brand/20'
    },
    cyan: {
      bg: 'bg-cyan-500/10 dark:bg-cyan-500/10',
      text: 'text-cyan-600 dark:text-cyan-400',
      border: 'border-cyan-500/20',
      glow: 'group-hover:shadow-glow-cyan/20'
    },
    emerald: {
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/10',
      text: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-500/20',
      glow: 'group-hover:shadow-emerald-500/20'
    },
    amber: {
      bg: 'bg-amber-500/10 dark:bg-amber-500/10',
      text: 'text-amber-600 dark:text-amber-400',
      border: 'border-amber-500/20',
      glow: 'group-hover:shadow-amber-500/20'
    }
  };

  const scheme = colorMap[accentColor];

  return (
    <div className={`group relative p-5 rounded-2xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] shadow-sm hover:shadow-md transition-all duration-300 ${scheme.glow} hover:-translate-y-0.5`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {label}
        </span>
        <div className={`p-2.5 rounded-xl ${scheme.bg} ${scheme.text} border ${scheme.border} transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {formatNumber(value)}{suffix}
        </div>

        {change && (
          <div className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
            isPositive
              ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
              : 'text-rose-600 dark:text-rose-400 bg-rose-500/10'
          }`}>
            {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
            {change}
          </div>
        )}
      </div>
    </div>
  );
};
