# DevConnect – Developer Networking & Portfolio Platform

A premium, modern, full-featured developer networking platform built with React 19, Vite, TypeScript, and Tailwind CSS. Combine the professional networking of LinkedIn, the developer-focus of GitHub, and the visual quality of modern SaaS products.

---

## 🚀 Features

- **Professional Developer Profiles** – Showcase skills, projects, experience, education, and GitHub activity.
- **Project Showcase Gallery** – Share projects with tech stack badges, GitHub links, and live demo links.
- **Technical Blogging** – Write, publish, and discover developer articles with a Markdown editor.
- **Developer Networking** – Send/accept connection requests, discover developers, mutual connections.
- **Notification Center** – Real-time-ready notification system for connections, endorsements, and activity.
- **Skill Endorsements** – Endorse peers' skills with counts displayed on profiles.
- **Explore Developers** – Search and filter developers by skills, location, experience level, and availability.
- **In-App Messaging** – Chat interface for connecting with other developers.
- **Dark / Light Mode** – Full theme switching persisted across sessions.
- **Fully Responsive** – Works beautifully on mobile, tablet, and desktop.
- **Settings Dashboard** – Account, profile, privacy, notifications, security, and appearance settings.

---

## 🛠️ Tech Stack

| Category        | Technology |
|-----------------|------------|
| Framework       | React 19 + Vite |
| Language        | TypeScript |
| Styling         | Tailwind CSS |
| State Management| Zustand (with LocalStorage persistence) |
| Routing         | React Router DOM v7 |
| Data Fetching   | TanStack React Query |
| Icons           | Lucide React |
| Build Tool      | Vite |

---

## 📁 Project Structure

```
devconnect/
├── public/                   # Static assets
├── src/
│   ├── assets/               # Images and SVGs
│   ├── components/
│   │   ├── cards/            # DeveloperCard, ProjectCard, BlogCard, NotificationItem
│   │   ├── common/           # Navbar, Sidebar, Footer, Modal, Toast, SearchBar, etc.
│   │   └── modals/           # EditProfileModal, AddProjectModal, MessagesModal, etc.
│   ├── data/
│   │   └── mockData.ts       # Sample data (replace with API calls for production)
│   ├── pages/                # All route-level page components
│   ├── store/
│   │   └── useAppStore.ts    # Zustand global store with persistence
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces and types
│   ├── utils/
│   │   └── formatters.ts     # Date and number formatting utilities
│   ├── App.tsx               # Route configuration
│   ├── main.tsx              # App entry point
│   └── index.css             # Global styles
├── .env.example              # Environment variable template
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** v18+ ([nodejs.org](https://nodejs.org/))
- **npm** v9+ (included with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/devconnect.git
cd devconnect

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your own values

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

### Build for Production

```bash
npm run build
npm run preview    # preview the production build locally
```

---

## 🔧 Configuration

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

See [`.env.example`](.env.example) for all available configuration options.

---

## 🔌 Connecting to a Real Backend

The app currently uses mock data from `src/data/mockData.ts`. To connect to a real API:

1. Create API service files in `src/services/` (e.g., `src/services/api.ts`).
2. Replace mock data calls in components/pages with TanStack React Query hooks (`useQuery`, `useMutation`).
3. Update `VITE_API_BASE_URL` in your `.env` to point to your backend.
4. The Zustand store (`src/store/useAppStore.ts`) already supports replacing localStorage state with API-driven state.

No redesign needed — the frontend is decoupled from the data layer by design.

---

## 📄 Pages & Routes

| Route | Page |
|-------|------|
| `/` | Landing Page |
| `/login` | Login |
| `/register` | Register |
| `/dashboard` | Developer Dashboard |
| `/profile/:username` | Developer Profile |
| `/projects` | Project Showcase |
| `/blogs` | Blog Listing |
| `/blogs/:id` | Blog Detail |
| `/blogs/editor` | Blog Editor |
| `/explore` | Explore Developers |
| `/connections` | Connections Manager |
| `/notifications` | Notification Center |
| `/settings` | Settings |

---

## 🎨 Color Palette

| Token | Dark | Light |
|-------|------|-------|
| Background | `#090D16` | `#F8FAFC` |
| Card | `#151E2E` | `#FFFFFF` |
| Primary Accent | `#6366F1` | `#4F46E5` |
| Secondary Accent | `#22D3EE` | — |
| Text | `#F8FAFC` | `#0F172A` |
| Muted | `#94A3B8` | `#64748B` |

---

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push the branch: `git push origin feature/my-feature`
5. Open a Pull Request.

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙋 Support

If you encounter any issues or have questions, please open an issue on GitHub.
