import { Developer, Project, Blog, ConnectionRequest, NotificationItem, ChatMessage, UserSettings } from '../types';

export const CURRENT_USER: Developer = {
  id: 'current-user',
  name: 'Alex Rivera',
  username: 'alexrivera',
  email: 'alex.rivera@devconnect.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop&q=80',
  headline: 'Senior Full Stack & Distributed Systems Architect | Ex-Stripe | Open Source Contributor',
  bio: 'Staff level engineer passionate about building high-throughput distributed systems, microfrontends, and developer tooling. Currently architecting next-generation cloud infrastructure and writing technical deep dives on concurrency and performance.',
  location: 'San Francisco, CA (Remote)',
  availability: 'Open to Work',
  experienceLevel: 'Staff/Principal',
  website: 'https://alexrivera.dev',
  github: 'https://github.com/alexrivera-dev',
  linkedin: 'https://linkedin.com/in/alexrivera-tech',
  twitter: 'https://twitter.com/alexrivera_code',
  joinedDate: 'March 2023',
  connectionsCount: 482,
  projectsCount: 12,
  endorsementsCount: 156,
  profileViews: 3840,
  connectionStatus: 'none',
  skills: [
    { name: 'TypeScript', category: 'frontend', endorsements: 64, endorsedByCurrentUser: true },
    { name: 'React 19', category: 'frontend', endorsements: 58, endorsedByCurrentUser: true },
    { name: 'Rust', category: 'backend', endorsements: 49, endorsedByCurrentUser: true },
    { name: 'Node.js', category: 'backend', endorsements: 44, endorsedByCurrentUser: false },
    { name: 'PostgreSQL', category: 'database', endorsements: 38, endorsedByCurrentUser: true },
    { name: 'Docker / K8s', category: 'devops', endorsements: 32, endorsedByCurrentUser: false },
    { name: 'GraphQL', category: 'backend', endorsements: 29, endorsedByCurrentUser: true },
    { name: 'Tailwind CSS', category: 'frontend', endorsements: 41, endorsedByCurrentUser: true },
    { name: 'Next.js', category: 'frontend', endorsements: 52, endorsedByCurrentUser: false },
    { name: 'Go', category: 'backend', endorsements: 27, endorsedByCurrentUser: false },
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'Staff Infrastructure Architect',
      company: 'Apex Cloud Systems',
      location: 'San Francisco, CA',
      startDate: 'Jan 2023',
      endDate: 'Present',
      current: true,
      description: 'Spearheaded migration of core streaming pipeline to Rust microservices, cutting p99 latency by 68% and cloud costs by $240k/yr. Mentored 14 senior engineers across distributed systems best practices.',
      technologies: ['Rust', 'Kafka', 'Kubernetes', 'gRPC', 'PostgreSQL']
    },
    {
      id: 'exp-2',
      role: 'Senior Full Stack Engineer',
      company: 'Stripe',
      location: 'South San Francisco, CA',
      startDate: 'Aug 2020',
      endDate: 'Dec 2022',
      current: false,
      description: 'Built merchant analytics telemetry dashboards handling 100M+ daily events. Co-authored internal component design system used by 200+ product engineers.',
      technologies: ['React', 'TypeScript', 'Ruby', 'GraphQL', 'AWS']
    },
    {
      id: 'exp-3',
      role: 'Software Engineer',
      company: 'Datadog',
      location: 'New York, NY',
      startDate: 'Jun 2018',
      endDate: 'Jul 2020',
      current: false,
      description: 'Designed real-time metric visualization charting widgets with WebGL canvas rendering, enabling smooth 60fps rendering for massive timeseries datasets.',
      technologies: ['TypeScript', 'WebGL', 'Go', 'Docker']
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.S. in Computer Science & Engineering',
      institution: 'UC Berkeley',
      year: '2018',
      field: 'Distributed Systems & Operating Systems'
    }
  ]
};

export const INITIAL_DEVELOPERS: Developer[] = [
  CURRENT_USER,
  {
    id: 'dev-1',
    name: 'Sophia Chen',
    username: 'sophiachen',
    email: 'sophia@vercel.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&auto=format&fit=crop&q=80',
    headline: 'Staff Frontend Engineer @ Vercel | Next.js Core Team Contributor | UI/UX Purist',
    bio: 'Obsessed with sub-millisecond web performance, accessibility, micro-interactions, and the future of React Server Components. Author of popular open-source animation primitives.',
    location: 'Seattle, WA',
    availability: 'Mentoring',
    experienceLevel: 'Staff/Principal',
    website: 'https://sophiachen.design',
    github: 'https://github.com/sophiachen',
    linkedin: 'https://linkedin.com/in/sophiachen-ui',
    twitter: 'https://twitter.com/sophiacodes',
    joinedDate: 'Jan 2023',
    connectionsCount: 890,
    projectsCount: 16,
    endorsementsCount: 310,
    profileViews: 9240,
    mutualConnections: 18,
    connectionStatus: 'connected',
    skills: [
      { name: 'React 19', category: 'frontend', endorsements: 142 },
      { name: 'Next.js', category: 'frontend', endorsements: 128 },
      { name: 'TypeScript', category: 'frontend', endorsements: 110 },
      { name: 'Tailwind CSS', category: 'frontend', endorsements: 95 },
      { name: 'Web Performance', category: 'frontend', endorsements: 88 }
    ],
    experience: [
      {
        id: 'exp-s1',
        role: 'Staff Frontend Engineer',
        company: 'Vercel',
        location: 'Remote',
        startDate: '2022',
        endDate: 'Present',
        current: true,
        description: 'Leading Next.js devtools and compiler ergonomics. Improved hydration performance across 50,000 top enterprise sites.',
        technologies: ['Next.js', 'React', 'Turbopack', 'Rust']
      }
    ],
    education: [
      { id: 'edu-s1', degree: 'M.S. Human-Computer Interaction', institution: 'University of Washington', year: '2019', field: 'HCI' }
    ]
  },
  {
    id: 'dev-2',
    name: 'Marcus Vance',
    username: 'marcusvance',
    email: 'marcus@cloudflare.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop&q=80',
    headline: 'Principal Systems Architect @ Cloudflare | Rust Evangelist | WASM Pioneer',
    bio: 'Low-level systems nerd building zero-allocation network proxies, custom memory allocators, and WebAssembly runtimes at the edge. Keynote speaker at RustConf.',
    location: 'Austin, TX',
    availability: 'Hiring',
    experienceLevel: 'Staff/Principal',
    website: 'https://marcusvance.io',
    github: 'https://github.com/marcusvance',
    linkedin: 'https://linkedin.com/in/marcusvance-systems',
    joinedDate: 'February 2023',
    connectionsCount: 1240,
    projectsCount: 9,
    endorsementsCount: 420,
    profileViews: 14200,
    mutualConnections: 24,
    connectionStatus: 'connected',
    skills: [
      { name: 'Rust', category: 'backend', endorsements: 198 },
      { name: 'WebAssembly', category: 'tools', endorsements: 145 },
      { name: 'C++', category: 'backend', endorsements: 120 },
      { name: 'Networking (eBPF)', category: 'devops', endorsements: 98 },
      { name: 'Linux Kernel', category: 'backend', endorsements: 86 }
    ],
    experience: [
      {
        id: 'exp-m1',
        role: 'Principal Systems Architect',
        company: 'Cloudflare',
        location: 'Austin, TX',
        startDate: '2021',
        endDate: 'Present',
        current: true,
        description: 'Architected edge worker sandboxing with WebAssembly, handling 45M requests per second with sub-microsecond isolation.',
        technologies: ['Rust', 'WASM', 'eBPF', 'Tokio']
      }
    ],
    education: [
      { id: 'edu-m1', degree: 'B.S. in Computer Engineering', institution: 'UT Austin', year: '2016', field: 'Systems' }
    ]
  },
  {
    id: 'dev-3',
    name: 'Elena Rostova',
    username: 'elenarostova',
    email: 'elena@anthropic.ai',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1600&auto=format&fit=crop&q=80',
    headline: 'AI Research Engineer @ Anthropic | LLM Fine-Tuning, Alignment & Autonomous Agents',
    bio: 'Researches recursive agentic workflows, synthetic data generation, and context-aware tool routing. Stanford AI Lab alumni.',
    location: 'San Francisco, CA',
    availability: 'Building',
    experienceLevel: 'Senior',
    website: 'https://elenarostova.ai',
    github: 'https://github.com/elena-rostova',
    linkedin: 'https://linkedin.com/in/elena-rostova-ai',
    joinedDate: 'May 2023',
    connectionsCount: 750,
    projectsCount: 14,
    endorsementsCount: 290,
    profileViews: 11400,
    mutualConnections: 12,
    connectionStatus: 'pending_received',
    skills: [
      { name: 'PyTorch', category: 'ai', endorsements: 165 },
      { name: 'Python', category: 'ai', endorsements: 154 },
      { name: 'LLM Agents', category: 'ai', endorsements: 140 },
      { name: 'Transformers', category: 'ai', endorsements: 130 },
      { name: 'CUDA', category: 'ai', endorsements: 82 }
    ],
    experience: [
      {
        id: 'exp-e1',
        role: 'Research Engineer',
        company: 'Anthropic',
        location: 'San Francisco, CA',
        startDate: '2023',
        endDate: 'Present',
        current: true,
        description: 'Trained model alignment evaluators and autonomous task decoders on multi-modal benchmark datasets.',
        technologies: ['PyTorch', 'Python', 'JAX', 'Distributed Training']
      }
    ],
    education: [
      { id: 'edu-e1', degree: 'Ph.D. in Artificial Intelligence', institution: 'Stanford University', year: '2022', field: 'Deep Learning' }
    ]
  },
  {
    id: 'dev-4',
    name: 'David Kim',
    username: 'davidkim',
    email: 'david@platformops.io',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=1600&auto=format&fit=crop&q=80',
    headline: 'Lead Platform Engineer @ Datadog | Kubernetes, Terraform & GitOps Specialist',
    bio: 'Automating everything from bare metal to multi-cloud Kubernetes clusters with ArgoCD, Cilium, and Prometheus. CNCF Ambassador.',
    location: 'New York, NY',
    availability: 'Open to Work',
    experienceLevel: 'Lead',
    website: 'https://davidkimops.dev',
    github: 'https://github.com/davidkimops',
    linkedin: 'https://linkedin.com/in/davidkim-platform',
    joinedDate: 'August 2023',
    connectionsCount: 620,
    projectsCount: 7,
    endorsementsCount: 180,
    profileViews: 4100,
    mutualConnections: 9,
    connectionStatus: 'none',
    skills: [
      { name: 'Kubernetes', category: 'devops', endorsements: 130 },
      { name: 'Terraform', category: 'devops', endorsements: 115 },
      { name: 'Go', category: 'backend', endorsements: 92 },
      { name: 'AWS / GCP', category: 'devops', endorsements: 88 },
      { name: 'ArgoCD', category: 'devops', endorsements: 76 }
    ],
    experience: [],
    education: []
  },
  {
    id: 'dev-5',
    name: 'Amara Okafor',
    username: 'amaraokafor',
    email: 'amara@fluttercraft.dev',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&auto=format&fit=crop&q=80',
    headline: 'Staff Mobile Engineer @ Monzo | React Native & Swift | 60fps Mobile Interfaces',
    bio: 'Crafting pixel-perfect, hyper-fluid mobile apps used by millions. Passionate about offline-first architectures, CRDTs, and gestures.',
    location: 'London, UK',
    availability: 'Mentoring',
    experienceLevel: 'Senior',
    website: 'https://amaraokafor.me',
    github: 'https://github.com/amaraokafor',
    linkedin: 'https://linkedin.com/in/amara-okafor',
    joinedDate: 'April 2023',
    connectionsCount: 540,
    projectsCount: 11,
    endorsementsCount: 215,
    profileViews: 5200,
    mutualConnections: 6,
    connectionStatus: 'none',
    skills: [
      { name: 'React Native', category: 'mobile', endorsements: 140 },
      { name: 'Swift', category: 'mobile', endorsements: 98 },
      { name: 'TypeScript', category: 'frontend', endorsements: 90 },
      { name: 'GraphQL', category: 'backend', endorsements: 75 }
    ],
    experience: [],
    education: []
  },
  {
    id: 'dev-6',
    name: 'Lucas Silva',
    username: 'lucassilva',
    email: 'lucas@linear.app',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80',
    headline: 'Frontend Architect @ Linear | Local-First Sync, SQLite in Browser & Keyboard UI',
    bio: 'Building the fastest software workflows on the planet. Deeply invested in optimistic UI, Web Workers, IndexedDB, and zero-latency interactions.',
    location: 'Berlin, Germany',
    availability: 'Building',
    experienceLevel: 'Lead',
    website: 'https://lucassilva.tech',
    github: 'https://github.com/lucassilva',
    linkedin: 'https://linkedin.com/in/lucassilva-arch',
    joinedDate: 'June 2023',
    connectionsCount: 810,
    projectsCount: 10,
    endorsementsCount: 260,
    profileViews: 7600,
    mutualConnections: 15,
    connectionStatus: 'none',
    skills: [
      { name: 'TypeScript', category: 'frontend', endorsements: 150 },
      { name: 'React', category: 'frontend', endorsements: 135 },
      { name: 'SQLite (WASM)', category: 'database', endorsements: 94 },
      { name: 'WebSockets', category: 'backend', endorsements: 82 }
    ],
    experience: [],
    education: []
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'HyperSync Engine',
    tagline: 'Ultra-low latency real-time data sync with CRDTs and WebSockets',
    description: 'A distributed real-time synchronization framework written in Rust with Node.js and WebAssembly bindings. Handles conflict-free replicated data types (CRDTs) with state-based delta compression, achieving sub-10ms synchronization across geo-distributed nodes.',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    technologies: ['Rust', 'WebSockets', 'WebAssembly', 'TypeScript', 'Docker'],
    githubUrl: 'https://github.com/alexrivera-dev/hypersync-engine',
    liveUrl: 'https://hypersync.devconnect.preview',
    authorId: 'current-user',
    authorName: 'Alex Rivera',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    authorHeadline: 'Senior Full Stack & Distributed Systems Architect',
    stars: 342,
    isStarred: true,
    createdAt: '2024-08-15',
    category: 'Open Source',
    featured: true
  },
  {
    id: 'proj-2',
    title: 'DevPulse UI',
    tagline: 'Accessible, dark-mode native component system inspired by Linear & Vercel',
    description: '45+ carefully engineered React components featuring Radix UI primitives, Tailwind CSS, automatic keyboard navigation, micro-interactions, and built-in screen reader announcements. Used by over 1,200 developers.',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'Framer Motion'],
    githubUrl: 'https://github.com/sophiachen/devpulse-ui',
    liveUrl: 'https://devpulse.ui.preview',
    authorId: 'dev-1',
    authorName: 'Sophia Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    authorHeadline: 'Staff Frontend Engineer @ Vercel',
    stars: 829,
    isStarred: false,
    createdAt: '2024-09-02',
    category: 'Frontend',
    featured: true
  },
  {
    id: 'proj-3',
    title: 'AgentCraft Framework',
    tagline: 'Autonomous multi-modal LLM agent orchestration with memory and tool synthesis',
    description: 'An open-source Python framework for building self-correcting AI agents that synthesize code, execute terminal commands safely in sandboxed Firecracker microVMs, and maintain persistent episodic vector memory.',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80',
    technologies: ['Python', 'PyTorch', 'FastAPI', 'Qdrant', 'Docker'],
    githubUrl: 'https://github.com/elena-rostova/agentcraft',
    liveUrl: 'https://agentcraft.ai.preview',
    authorId: 'dev-3',
    authorName: 'Elena Rostova',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    authorHeadline: 'AI Research Engineer @ Anthropic',
    stars: 1250,
    isStarred: true,
    createdAt: '2024-10-10',
    category: 'AI / ML',
    featured: true
  },
  {
    id: 'proj-4',
    title: 'ByteQuery Edge DB',
    tagline: 'Embeddable SQL database engine with WAL replication designed for Cloudflare Workers',
    description: 'Pure Rust database engine compiled to WebAssembly with zero dynamic allocations in hot path. Features full ACID compliance, B+ Tree indexing, and automatic sync to S3 compatible object storage.',
    coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80',
    technologies: ['Rust', 'WebAssembly', 'SQLite', 'Cloudflare Workers'],
    githubUrl: 'https://github.com/marcusvance/bytequery',
    authorId: 'dev-2',
    authorName: 'Marcus Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    authorHeadline: 'Principal Systems Architect @ Cloudflare',
    stars: 670,
    isStarred: false,
    createdAt: '2024-07-28',
    category: 'Backend',
    featured: false
  },
  {
    id: 'proj-5',
    title: 'GitScope Security Scanner',
    tagline: 'AI-assisted AST vulnerability detection action for GitHub Workflows',
    description: 'Scans pull requests for logic flaws, secret leakage, and supply chain vulnerabilities using static analysis and contextual LLM audits. Generates inline GitHub annotations with verified remediation patches.',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
    technologies: ['Go', 'GitHub Actions', 'OpenAI API', 'Docker'],
    githubUrl: 'https://github.com/davidkimops/gitscope',
    liveUrl: 'https://gitscope.dev.preview',
    authorId: 'dev-4',
    authorName: 'David Kim',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    authorHeadline: 'Lead Platform Engineer @ Datadog',
    stars: 490,
    isStarred: false,
    createdAt: '2024-06-12',
    category: 'DevOps',
    featured: false
  },
  {
    id: 'proj-6',
    title: 'OmniFlow Mobile',
    tagline: 'Offline-first collaborative task canvas for engineering teams',
    description: 'Cross-platform mobile application supporting instant pen/touch diagramming, live markdown sync, and biometric encryption. Powered by SQLite and local WebRTC mesh data channels.',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    technologies: ['React Native', 'TypeScript', 'WebRTC', 'SQLite', 'Tailwind CSS'],
    githubUrl: 'https://github.com/amaraokafor/omniflow-mobile',
    liveUrl: 'https://omniflow.app.preview',
    authorId: 'dev-5',
    authorName: 'Amara Okafor',
    authorAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
    authorHeadline: 'Staff Mobile Engineer @ Monzo',
    stars: 388,
    isStarred: false,
    createdAt: '2024-08-30',
    category: 'Mobile',
    featured: false
  }
];

export const INITIAL_BLOGS: Blog[] = [
  {
    id: 'blog-1',
    title: 'Mastering React 19 Server Actions & Optimistic UI Architecture',
    slug: 'mastering-react-19-server-actions',
    excerpt: 'A comprehensive deep dive into the paradigm shift of React 19: useActionState, useOptimistic, server-side mutations, and error handling without boilerplate.',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&auto=format&fit=crop&q=80',
    authorId: 'dev-1',
    authorName: 'Sophia Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    authorHeadline: 'Staff Frontend Engineer @ Vercel',
    category: 'Frontend',
    tags: ['React 19', 'Next.js', 'TypeScript', 'Architecture'],
    readingTime: '6 min read',
    publishedAt: '2 days ago',
    likes: 284,
    isLiked: true,
    featured: true,
    content: `
# Mastering React 19 Server Actions & Optimistic UI Architecture

React 19 brings the single largest shift in frontend state management since Hooks were introduced in 2018. Rather than wrestling with manual isLoading, error, and data states via separate useEffect cascades, React 19 introduces primitives that embrace the network boundary directly.

## The Core Primitives

The core mental model revolves around **Actions** — asynchronous functions triggered by user interactions that manage transition states automatically.

\`\`\`tsx
import { useActionState, useOptimistic } from 'react';
import { updateProjectStar } from './actions';

export function StarButton({ projectId, currentStars }: { projectId: string; currentStars: number }) {
  const [optimisticStars, setOptimisticStars] = useOptimistic(
    currentStars,
    (state, delta: number) => state + delta
  );

  const [state, formAction, isPending] = useActionState(
    async (_prevState: unknown, formData: FormData) => {
      setOptimisticStars(1);
      const res = await updateProjectStar(projectId);
      return res;
    },
    null
  );

  return (
    <form action={formAction}>
      <button 
        type="submit" 
        disabled={isPending}
        className="px-4 py-2 bg-indigo-600 rounded-lg text-white font-medium hover:bg-indigo-500 transition-colors"
      >
        ★ {optimisticStars} {isPending ? '(Saving...)' : ''}
      </button>
    </form>
  );
}
\`\`\`

## Key Architectural Advantages

1. **Zero Client-Side Mutation Race Conditions:** React queues updates and resets optimistic values automatically if the server rejects the transaction.
2. **Progressive Enhancement:** Server Actions work natively with standard HTML form submissions before hydration completes.
3. **No Redux / Zustand Boilerplate for Remote Data:** Keep your client stores strictly for truly client-local state (like active modals or dark theme).
    `,
    comments: [
      {
        id: 'c-1',
        authorName: 'Alex Rivera',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        authorHeadline: 'Senior Full Stack & Distributed Systems Architect',
        content: 'Spot on article, Sophia! The rollback behavior in useOptimistic solves so many subtle edge cases we previously spent hundreds of lines handling manually.',
        createdAt: '1 day ago'
      },
      {
        id: 'c-2',
        authorName: 'Lucas Silva',
        authorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
        authorHeadline: 'Frontend Architect @ Linear',
        content: 'We migrated our issue status transitions to this pattern and reduced bundle size by 14kb while eliminating 90% of our synchronization glitches.',
        createdAt: '14 hours ago'
      }
    ]
  },
  {
    id: 'blog-2',
    title: 'Designing Distributed Cache Invalidations at 10M QPS',
    slug: 'designing-distributed-cache-invalidations-10m-qps',
    excerpt: 'There are only two hard things in Computer Science: cache invalidation and naming things. Here is how we tackled real-time multi-region invalidation with Redis streams and Raft consensus.',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
    authorId: 'current-user',
    authorName: 'Alex Rivera',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    authorHeadline: 'Senior Full Stack & Distributed Systems Architect',
    category: 'Architecture',
    tags: ['Distributed Systems', 'Redis', 'Kafka', 'Performance'],
    readingTime: '9 min read',
    publishedAt: '5 days ago',
    likes: 412,
    isLiked: false,
    featured: true,
    content: `
# Designing Distributed Cache Invalidations at 10M QPS

When serving tens of millions of queries per second across 12 global regions, relying on simple time-to-live (TTL) caches leads to stale data or stampeding herds. In this article, we break down our event-driven bus architecture.

## The Dual-Layer Invalidation Strategy

Rather than broadcasting every single mutation to all edge nodes synchronously, we decoupled writes using an idempotent change-data-capture (CDC) pipeline.

\`\`\`rust
// Rust edge cache validation handler
pub async fn verify_token_lease(
    cache: &Arc<LocalEdgeCache>,
    key: &str,
    generation_id: u64
) -> Result<CachedValue, CacheError> {
    if let Some(entry) = cache.get(key) {
        if entry.generation >= generation_id {
            return Ok(entry.value);
        }
    }
    // Asynchronous revalidation back to primary regional cluster
    revalidate_and_swap(cache, key).await
}
\`\`\`

## Key Takeaways
- Always version your cached payloads with monotonic generation counters.
- Never let multiple concurrent edge workers trigger duplicate origin fetches — use single-flight request coalescing.
    `,
    comments: [
      {
        id: 'c-3',
        authorName: 'Marcus Vance',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
        authorHeadline: 'Principal Systems Architect @ Cloudflare',
        content: 'Single-flight request deduplication is an absolute lifesaver. We cut origin load spikes by 95% using this exact technique.',
        createdAt: '3 days ago'
      }
    ]
  },
  {
    id: 'blog-3',
    title: 'Building Production-Ready Autonomous AI Agents with Structured Outputs',
    slug: 'building-production-ready-ai-agents',
    excerpt: 'Move beyond toy chat interfaces. Discover how to build deterministic, testable, and secure multi-turn agentic pipelines with function calling and sandbox validation.',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    authorId: 'dev-3',
    authorName: 'Elena Rostova',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    authorHeadline: 'AI Research Engineer @ Anthropic',
    category: 'AI & ML',
    tags: ['AI', 'Python', 'LLM', 'System Design'],
    readingTime: '7 min read',
    publishedAt: '1 week ago',
    likes: 530,
    isLiked: true,
    featured: false,
    content: `
# Building Production-Ready Autonomous AI Agents with Structured Outputs

Prompt engineering alone fails when building mission-critical developer tools. You need strict JSON schemas, AST validation of generated code, and deterministic guardrails.
    `,
    comments: []
  }
];

export const INITIAL_CONNECTION_REQUESTS: ConnectionRequest[] = [
  {
    id: 'req-1',
    fromUser: {
      id: 'dev-3',
      name: 'Elena Rostova',
      username: 'elenarostova',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
      headline: 'AI Research Engineer @ Anthropic | LLM Fine-Tuning & Agents',
      skills: ['PyTorch', 'Python', 'LLMs', 'Transformers'],
      mutualConnections: 12
    },
    toUserId: 'current-user',
    status: 'pending',
    sentAt: 'Yesterday',
    note: "Hey Alex! Loved your post on distributed cache invalidation. We're looking at similar patterns for our distributed training checkpoint synchronization. Would love to connect!"
  },
  {
    id: 'req-2',
    fromUser: {
      id: 'dev-4',
      name: 'David Kim',
      username: 'davidkim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
      headline: 'Lead Platform Engineer @ Datadog | Kubernetes & GitOps Specialist',
      skills: ['Kubernetes', 'Terraform', 'Go', 'AWS'],
      mutualConnections: 9
    },
    toUserId: 'current-user',
    status: 'pending',
    sentAt: '3 days ago',
    note: "Hi Alex, saw your HyperSync project on GitHub. Great work! Let's connect."
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'connection_request',
    actor: {
      id: 'dev-3',
      name: 'Elena Rostova',
      username: 'elenarostova',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80'
    },
    title: 'New Connection Request',
    message: 'Elena Rostova sent you a connection request with a personalized note.',
    timestamp: '2 hours ago',
    read: false,
    actionRequired: true,
    connectionRequestId: 'req-1',
    targetUrl: '/connections'
  },
  {
    id: 'notif-2',
    type: 'star',
    actor: {
      id: 'dev-1',
      name: 'Sophia Chen',
      username: 'sophiachen',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80'
    },
    title: 'Project Starred',
    message: 'Sophia Chen starred your project "HyperSync Engine".',
    timestamp: '5 hours ago',
    read: false,
    targetUrl: '/projects'
  },
  {
    id: 'notif-3',
    type: 'endorsement',
    actor: {
      id: 'dev-2',
      name: 'Marcus Vance',
      username: 'marcusvance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'
    },
    title: 'Skill Endorsed',
    message: 'Marcus Vance endorsed you for "Rust" and "Distributed Systems".',
    timestamp: '1 day ago',
    read: true,
    targetUrl: '/profile/current-user'
  },
  {
    id: 'notif-4',
    type: 'comment',
    actor: {
      id: 'dev-6',
      name: 'Lucas Silva',
      username: 'lucassilva',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80'
    },
    title: 'New Article Comment',
    message: 'Lucas Silva commented on your technical article "Designing Distributed Cache Invalidations at 10M QPS".',
    timestamp: '2 days ago',
    read: true,
    targetUrl: '/blogs/blog-2'
  }
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    senderId: 'dev-1',
    recipientId: 'current-user',
    text: 'Hey Alex! Checked out your HyperSync repo. The zero-copy WebAssembly binding you wrote is so elegant.',
    timestamp: '10:45 AM'
  },
  {
    id: 'msg-2',
    senderId: 'current-user',
    recipientId: 'dev-1',
    text: 'Thanks Sophia! Really appreciate it. Took some inspiration from Turbopack memory structures actually.',
    timestamp: '10:48 AM'
  },
  {
    id: 'msg-3',
    senderId: 'dev-1',
    recipientId: 'current-user',
    text: 'Are you planning to speak at React Summit or RustConf this autumn?',
    timestamp: '10:52 AM'
  }
];

export const INITIAL_SETTINGS: UserSettings = {
  profileVisibility: 'public',
  showEmail: true,
  emailAlerts: true,
  browserNotifications: true,
  newsletter: true,
  theme: 'dark',
  twoFactorEnabled: true
};
