export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
}

export function getInitials(name: string): string {
  if (!name) return 'DC';
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function calculatePasswordStrength(password: string): {
  score: number; // 0 to 4
  label: 'Too Weak' | 'Weak' | 'Medium' | 'Strong' | 'Very Strong';
  color: string;
} {
  if (!password) {
    return { score: 0, label: 'Too Weak', color: 'bg-slate-600' };
  }
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  switch (score) {
    case 0:
    case 1:
      return { score: 1, label: 'Weak', color: 'bg-rose-500' };
    case 2:
      return { score: 2, label: 'Medium', color: 'bg-amber-500' };
    case 3:
      return { score: 3, label: 'Strong', color: 'bg-emerald-500' };
    case 4:
      return { score: 4, label: 'Very Strong', color: 'bg-cyan-400' };
    default:
      return { score: 0, label: 'Too Weak', color: 'bg-slate-600' };
  }
}
