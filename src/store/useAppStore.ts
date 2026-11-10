import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  Developer, 
  Project, 
  Blog, 
  ConnectionRequest, 
  NotificationItem, 
  ChatMessage, 
  UserSettings 
} from '../types';
import { 
  CURRENT_USER, 
  INITIAL_DEVELOPERS, 
  INITIAL_PROJECTS, 
  INITIAL_BLOGS, 
  INITIAL_CONNECTION_REQUESTS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_MESSAGES, 
  INITIAL_SETTINGS 
} from '../data/mockData';

interface AppState {
  theme: 'dark' | 'light';
  isAuthenticated: boolean;
  currentUser: Developer;
  developers: Developer[];
  projects: Project[];
  blogs: Blog[];
  connectionRequests: ConnectionRequest[];
  notifications: NotificationItem[];
  messages: ChatMessage[];
  settings: UserSettings;
  activeChatUserId: string | null;
  searchQuery: string;

  // Actions
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  login: (email?: string) => void;
  logout: () => void;
  updateCurrentUser: (updates: Partial<Developer>) => void;
  endorseSkill: (developerId: string, skillName: string) => void;
  
  // Projects
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'stars' | 'authorId' | 'authorName' | 'authorAvatar' | 'authorHeadline'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  toggleStarProject: (id: string) => void;

  // Blogs
  addBlog: (blog: Omit<Blog, 'id' | 'publishedAt' | 'likes' | 'comments' | 'authorId' | 'authorName' | 'authorAvatar' | 'authorHeadline'>) => void;
  toggleLikeBlog: (id: string) => void;
  addBlogComment: (blogId: string, content: string) => void;

  // Connections
  sendConnectionRequest: (developerId: string, note?: string) => void;
  acceptConnectionRequest: (requestId: string) => void;
  declineConnectionRequest: (requestId: string) => void;
  cancelConnectionRequest: (developerId: string) => void;
  removeConnection: (developerId: string) => void;

  // Notifications
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotification: (id: string) => void;
  clearAllNotifications: () => void;

  // Messages
  sendMessage: (recipientId: string, text: string) => void;
  setActiveChatUserId: (userId: string | null) => void;

  // Settings
  updateSettings: (updates: Partial<UserSettings>) => void;
  setSearchQuery: (query: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      isAuthenticated: true,
      currentUser: CURRENT_USER,
      developers: INITIAL_DEVELOPERS,
      projects: INITIAL_PROJECTS,
      blogs: INITIAL_BLOGS,
      connectionRequests: INITIAL_CONNECTION_REQUESTS,
      notifications: INITIAL_NOTIFICATIONS,
      messages: INITIAL_MESSAGES,
      settings: INITIAL_SETTINGS,
      activeChatUserId: null,
      searchQuery: '',

      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark';
        if (typeof document !== 'undefined') {
          if (next === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
        set({ theme: next });
      },

      setTheme: (theme) => {
        if (typeof document !== 'undefined') {
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
        set({ theme });
      },

      login: () => {
        set({ isAuthenticated: true });
      },

      logout: () => {
        set({ isAuthenticated: false });
      },

      updateCurrentUser: (updates) => {
        set((state) => {
          const updatedUser = { ...state.currentUser, ...updates };
          return {
            currentUser: updatedUser,
            developers: state.developers.map((d) => (d.id === state.currentUser.id ? updatedUser : d))
          };
        });
      },

      endorseSkill: (developerId, skillName) => {
        set((state) => {
          const updateDevSkills = (dev: Developer): Developer => {
            if (dev.id !== developerId) return dev;
            const updatedSkills = dev.skills.map((skill) => {
              if (skill.name.toLowerCase() === skillName.toLowerCase()) {
                const currentlyEndorsed = skill.endorsedByCurrentUser;
                return {
                  ...skill,
                  endorsements: currentlyEndorsed ? skill.endorsements - 1 : skill.endorsements + 1,
                  endorsedByCurrentUser: !currentlyEndorsed
                };
              }
              return skill;
            });
            const totalEndorsements = updatedSkills.reduce((acc, s) => acc + s.endorsements, 0);
            return {
              ...dev,
              skills: updatedSkills,
              endorsementsCount: totalEndorsements
            };
          };

          const newCurrentUser = state.currentUser.id === developerId 
            ? updateDevSkills(state.currentUser) 
            : state.currentUser;

          return {
            currentUser: newCurrentUser,
            developers: state.developers.map(updateDevSkills)
          };
        });
      },

      addProject: (projectData) => {
        set((state) => {
          const newProject: Project = {
            ...projectData,
            id: `proj-${Date.now()}`,
            createdAt: new Date().toISOString().split('T')[0],
            stars: 1,
            isStarred: true,
            authorId: state.currentUser.id,
            authorName: state.currentUser.name,
            authorAvatar: state.currentUser.avatar,
            authorHeadline: state.currentUser.headline
          };

          const updatedUser = {
            ...state.currentUser,
            projectsCount: state.currentUser.projectsCount + 1
          };

          return {
            projects: [newProject, ...state.projects],
            currentUser: updatedUser,
            developers: state.developers.map((d) => (d.id === updatedUser.id ? updatedUser : d))
          };
        });
      },

      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map((p) => (p.id === id ? { ...p, ...updates } : p))
        }));
      },

      deleteProject: (id) => {
        set((state) => {
          const target = state.projects.find((p) => p.id === id);
          const isCurrentUserProject = target?.authorId === state.currentUser.id;
          const updatedUser = isCurrentUserProject 
            ? { ...state.currentUser, projectsCount: Math.max(0, state.currentUser.projectsCount - 1) }
            : state.currentUser;

          return {
            projects: state.projects.filter((p) => p.id !== id),
            currentUser: updatedUser,
            developers: state.developers.map((d) => (d.id === updatedUser.id ? updatedUser : d))
          };
        });
      },

      toggleStarProject: (id) => {
        set((state) => ({
          projects: state.projects.map((p) => {
            if (p.id === id) {
              const wasStarred = p.isStarred;
              return {
                ...p,
                isStarred: !wasStarred,
                stars: wasStarred ? p.stars - 1 : p.stars + 1
              };
            }
            return p;
          })
        }));
      },

      addBlog: (blogData) => {
        set((state) => {
          const newBlog: Blog = {
            ...blogData,
            id: `blog-${Date.now()}`,
            slug: blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
            publishedAt: 'Just now',
            likes: 1,
            isLiked: true,
            comments: [],
            authorId: state.currentUser.id,
            authorName: state.currentUser.name,
            authorAvatar: state.currentUser.avatar,
            authorHeadline: state.currentUser.headline
          };

          return {
            blogs: [newBlog, ...state.blogs]
          };
        });
      },

      toggleLikeBlog: (id) => {
        set((state) => ({
          blogs: state.blogs.map((b) => {
            if (b.id === id) {
              const wasLiked = b.isLiked;
              return {
                ...b,
                isLiked: !wasLiked,
                likes: wasLiked ? b.likes - 1 : b.likes + 1
              };
            }
            return b;
          })
        }));
      },

      addBlogComment: (blogId, content) => {
        set((state) => {
          const newComment = {
            id: `c-${Date.now()}`,
            authorName: state.currentUser.name,
            authorAvatar: state.currentUser.avatar,
            authorHeadline: state.currentUser.headline,
            content,
            createdAt: 'Just now'
          };

          return {
            blogs: state.blogs.map((b) => {
              if (b.id === blogId) {
                return {
                  ...b,
                  comments: [...b.comments, newComment]
                };
              }
              return b;
            })
          };
        });
      },

      sendConnectionRequest: (developerId, note) => {
        set((state) => {
          const targetDev = state.developers.find((d) => d.id === developerId);
          if (!targetDev) return state;

          const newRequest: ConnectionRequest = {
            id: `req-${Date.now()}`,
            fromUser: {
              id: state.currentUser.id,
              name: state.currentUser.name,
              username: state.currentUser.username,
              avatar: state.currentUser.avatar,
              headline: state.currentUser.headline,
              skills: state.currentUser.skills.map((s) => s.name),
              mutualConnections: targetDev.mutualConnections || 3
            },
            toUserId: developerId,
            status: 'pending',
            sentAt: 'Just now',
            note
          };

          return {
            connectionRequests: [...state.connectionRequests, newRequest],
            developers: state.developers.map((d) => 
              d.id === developerId ? { ...d, connectionStatus: 'pending_sent' } : d
            )
          };
        });
      },

      acceptConnectionRequest: (requestId) => {
        set((state) => {
          const request = state.connectionRequests.find((r) => r.id === requestId);
          if (!request) return state;

          const updatedRequests = state.connectionRequests.filter((r) => r.id !== requestId);
          const fromDevId = request.fromUser.id;

          const updatedCurrentUser = {
            ...state.currentUser,
            connectionsCount: state.currentUser.connectionsCount + 1
          };

          const newNotification: NotificationItem = {
            id: `notif-${Date.now()}`,
            type: 'connection_accepted',
            actor: {
              id: request.fromUser.id,
              name: request.fromUser.name,
              username: request.fromUser.username,
              avatar: request.fromUser.avatar
            },
            title: 'Connection Accepted',
            message: `You are now connected with ${request.fromUser.name}.`,
            timestamp: 'Just now',
            read: false,
            targetUrl: `/profile/${request.fromUser.id}`
          };

          return {
            currentUser: updatedCurrentUser,
            connectionRequests: updatedRequests,
            notifications: [newNotification, ...state.notifications],
            developers: state.developers.map((d) => {
              if (d.id === fromDevId) {
                return { ...d, connectionStatus: 'connected', connectionsCount: d.connectionsCount + 1 };
              }
              if (d.id === updatedCurrentUser.id) {
                return updatedCurrentUser;
              }
              return d;
            })
          };
        });
      },

      declineConnectionRequest: (requestId) => {
        set((state) => {
          const request = state.connectionRequests.find((r) => r.id === requestId);
          const fromDevId = request?.fromUser.id;

          return {
            connectionRequests: state.connectionRequests.filter((r) => r.id !== requestId),
            developers: state.developers.map((d) => 
              d.id === fromDevId ? { ...d, connectionStatus: 'none' } : d
            )
          };
        });
      },

      cancelConnectionRequest: (developerId) => {
        set((state) => ({
          connectionRequests: state.connectionRequests.filter((r) => !(r.toUserId === developerId && r.fromUser.id === state.currentUser.id)),
          developers: state.developers.map((d) => 
            d.id === developerId ? { ...d, connectionStatus: 'none' } : d
          )
        }));
      },

      removeConnection: (developerId) => {
        set((state) => {
          const updatedUser = {
            ...state.currentUser,
            connectionsCount: Math.max(0, state.currentUser.connectionsCount - 1)
          };

          return {
            currentUser: updatedUser,
            developers: state.developers.map((d) => {
              if (d.id === developerId) {
                return {
                  ...d,
                  connectionStatus: 'none',
                  connectionsCount: Math.max(0, d.connectionsCount - 1)
                };
              }
              if (d.id === updatedUser.id) return updatedUser;
              return d;
            })
          };
        });
      },

      markNotificationAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
        }));
      },

      markAllNotificationsAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true }))
        }));
      },

      clearNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id)
        }));
      },

      clearAllNotifications: () => {
        set({ notifications: [] });
      },

      sendMessage: (recipientId, text) => {
        set((state) => {
          const newMsg: ChatMessage = {
            id: `msg-${Date.now()}`,
            senderId: state.currentUser.id,
            recipientId,
            text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };

          return {
            messages: [...state.messages, newMsg]
          };
        });
      },

      setActiveChatUserId: (userId) => {
        set({ activeChatUserId: userId });
      },

      updateSettings: (updates) => {
        set((state) => ({
          settings: { ...state.settings, ...updates }
        }));
      },

      setSearchQuery: (query) => {
        set({ searchQuery: query });
      }
    }),
    {
      name: 'devconnect_storage',
      partialize: (state) => ({
        theme: state.theme,
        isAuthenticated: state.isAuthenticated,
        currentUser: state.currentUser,
        developers: state.developers,
        projects: state.projects,
        blogs: state.blogs,
        connectionRequests: state.connectionRequests,
        notifications: state.notifications,
        messages: state.messages,
        settings: state.settings
      })
    }
  )
);
