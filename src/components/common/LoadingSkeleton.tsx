import React from 'react';

interface LoadingSkeletonProps {
  type?: 'card' | 'profile' | 'feed' | 'text' | 'badge';
  count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ type = 'card', count = 1 }) => {
  const items = Array.from({ length: count });

  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] overflow-hidden p-5">
            <div className="h-44 bg-slate-200 dark:bg-slate-800 rounded-xl mb-4" />
            <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-2" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mb-4" />
            <div className="flex gap-2 mb-4">
              <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
              <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
              <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
            </div>
            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'profile') {
    return (
      <div className="animate-pulse rounded-2xl bg-white dark:bg-[#151E2E] border border-slate-200 dark:border-[#1F293D] p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-pulse">
      {items.map((_, i) => (
        <div key={i} className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl" />
      ))}
    </div>
  );
};
