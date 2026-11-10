export type AvailabilityStatus = 'Open to Work' | 'Hiring' | 'Mentoring' | 'Building' | 'Not Available';

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'database' | 'ai' | 'mobile' | 'tools';
  endorsements: number;
  endorsedByCurrentUser?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyLogo?: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  field: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  coverImage: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorHeadline: string;
  stars: number;
  isStarred?: boolean;
  createdAt: string;
  category: 'Full Stack' | 'Frontend' | 'Backend' | 'AI / ML' | 'Mobile' | 'Open Source' | 'DevOps';
  featured?: boolean;
}

export interface BlogComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorHeadline: string;
  content: string;
  createdAt: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorHeadline: string;
  category: 'Frontend' | 'Backend' | 'Architecture' | 'AI & ML' | 'DevOps' | 'Career';
  tags: string[];
  readingTime: string;
  publishedAt: string;
  likes: number;
  isLiked?: boolean;
  comments: BlogComment[];
  featured?: boolean;
}

export interface Developer {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  coverImage: string;
  headline: string;
  bio: string;
  location: string;
  availability: AvailabilityStatus;
  experienceLevel: 'Junior' | 'Mid-Level' | 'Senior' | 'Staff/Principal' | 'Lead';
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  joinedDate: string;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  connectionsCount: number;
  projectsCount: number;
  endorsementsCount: number;
  profileViews: number;
  mutualConnections?: number;
  connectionStatus: 'none' | 'pending_sent' | 'pending_received' | 'connected';
  githubContributions?: {
    totalContributions: number;
    weeks: { count: number; date: string }[][];
  };
}

export interface ConnectionRequest {
  id: string;
  fromUser: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    headline: string;
    skills: string[];
    mutualConnections: number;
  };
  toUserId: string;
  status: 'pending' | 'accepted' | 'declined';
  sentAt: string;
  note?: string;
}

export interface NotificationItem {
  id: string;
  type: 'connection_request' | 'connection_accepted' | 'endorsement' | 'star' | 'comment' | 'system';
  actor: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  targetUrl?: string;
  actionRequired?: boolean;
  connectionRequestId?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  recipientId: string;
  text: string;
  timestamp: string;
  isCodeSnippet?: boolean;
  codeLanguage?: string;
}

export interface UserSettings {
  profileVisibility: 'public' | 'connections_only' | 'private';
  showEmail: boolean;
  emailAlerts: boolean;
  browserNotifications: boolean;
  newsletter: boolean;
  theme: 'dark' | 'light' | 'system';
  twoFactorEnabled: boolean;
}
