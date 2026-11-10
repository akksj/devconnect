import React from 'react';
import { ThumbsUp } from 'lucide-react';

interface SkillBadgeProps {
  name: string;
  endorsements?: number;
  isEndorsed?: boolean;
  onEndorse?: () => void;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({
  name,
  endorsements = 0,
  isEndorsed = false,
  onEndorse,
  size = 'md',
  interactive = false
}) => {
  // Category or tech color accents
  const getBadgeStyle = (tech: string) => {
    const t = tech.toLowerCase();
    if (t.includes('react') || t.includes('cyan')) return 'border-cyan-500/30 text-cyan-400 bg-cyan-950/20 hover:border-cyan-400';
    if (t.includes('rust') || t.includes('orange')) return 'border-amber-500/30 text-amber-400 bg-amber-950/20 hover:border-amber-400';
    if (t.includes('python') || t.includes('green') || t.includes('pytorch')) return 'border-emerald-500/30 text-emerald-400 bg-emerald-950/20 hover:border-emerald-400';
    if (t.includes('typescript') || t.includes('node') || t.includes('next')) return 'border-indigo-500/30 text-indigo-400 bg-indigo-950/20 hover:border-indigo-400';
    return 'border-slate-700/60 text-slate-300 bg-slate-800/40 hover:border-indigo-500/50';
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2'
  };

  return (
    <div
      onClick={interactive && onEndorse ? onEndorse : undefined}
      role={interactive ? 'button' : undefined}
      title={interactive ? (isEndorsed ? 'Click to remove endorsement' : 'Click to endorse this skill') : undefined}
      className={`inline-flex items-center font-medium rounded-full border transition-all duration-200 select-none ${getBadgeStyle(name)} ${sizeClasses[size]} ${
        interactive ? 'cursor-pointer active:scale-95 hover:shadow-sm' : ''
      } ${isEndorsed ? 'ring-1 ring-indigo-500 shadow-glow-brand/20 bg-indigo-500/10' : ''}`}
    >
      <span>{name}</span>
      {endorsements > 0 && (
        <span
          className={`inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-semibold transition-colors ${
            isEndorsed
              ? 'bg-indigo-500 text-white'
              : 'bg-slate-800 text-slate-400 border border-slate-700/50'
          }`}
        >
          {interactive && <ThumbsUp className={`w-2.5 h-2.5 ${isEndorsed ? 'fill-current' : ''}`} />}
          {endorsements}
        </span>
      )}
    </div>
  );
};
