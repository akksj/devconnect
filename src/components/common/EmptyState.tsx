import React from 'react';
import { LucideIcon, Search, FolderPlus, BellOff, MessageSquareDashed } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  variant?: 'search' | 'projects' | 'notifications' | 'messages' | 'default';
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: CustomIcon,
  title,
  description,
  actionText,
  onAction,
  variant = 'default'
}) => {
  const getDefaultIcon = () => {
    switch (variant) {
      case 'search':
        return Search;
      case 'projects':
        return FolderPlus;
      case 'notifications':
        return BellOff;
      case 'messages':
        return MessageSquareDashed;
      default:
        return Search;
    }
  };

  const IconComponent = CustomIcon || getDefaultIcon();

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl bg-white/60 dark:bg-[#151E2E]/60 border border-dashed border-slate-300 dark:border-slate-800 backdrop-blur-sm">
      <div className="w-16 h-16 mb-4 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 dark:text-indigo-400 flex items-center justify-center">
        <IconComponent className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 shadow-md shadow-indigo-600/25 transition-all"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
