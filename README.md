# nextjs-study
📦 my-next-app
├─ 📂 src
│  ├─ 📂 app                # App Router (routes, layouts, pages, API routes)
│  │   ├─ 📂 (public)       # Public-facing routes (group routes)
│  │   │   ├─ 📂 home
│  │   │   │   ├─ page.tsx
│  │   │   │   └─ layout.tsx
│  │   │   └─ 📂 about
│  │   │       └─ page.tsx
│  │   ├─ 📂 (dashboard)    # Protected routes (example group)
│  │   │   ├─ 📂 projects
│  │   │   │   └─ page.tsx
│  │   │   └─ 📂 settings
│  │   │       └─ page.tsx
│  │   ├─ layout.tsx
│  │   └─ globals.css
│  │
│  ├─ 📂 components         # UI components (button, modal, form, etc.)
│  │   ├─ ui/               # Atomic UI components
│  │   ├─ layouts/          # Layout components
│  │   └─ shared/           # Shared components (headers, footers, etc.)
│  │
│  ├─ 📂 features           # Theo tính năng (feature-based)
│  │   ├─ auth/             # Auth module (login, register, etc.)
│  │   ├─ project/          # Project module
│  │   └─ user/             # User module
│  │
│  ├─ 📂 hooks              # Custom React hooks
│  │   └─ useAuth.ts
│  │
│  ├─ 📂 lib                # Helpers, utils, configs
│  │   ├─ api/              # API client (fetcher, axios instance, etc.)
│  │   ├─ constants.ts
│  │   └─ utils.ts
│  │
│  ├─ 📂 services           # Business logic (gọi API, xử lý data)
│  │   ├─ authService.ts
│  │   └─ projectService.ts
│  │
│  ├─ 📂 store              # State management (Redux, Zustand, Jotai, etc.)
│  │   └─ index.ts
│  │
│  ├─ 📂 types              # TypeScript types/interfaces
│  │   ├─ next.d.ts
│  │   └─ project.ts
│  │
│  ├─ 📂 styles             # Global styles, Tailwind config, SCSS, etc.
│  │
│  └─ 📂 tests              # Unit, integration, e2e tests
│
├─ public/                  # Static assets (images, fonts, etc.)
├─ .env                     # Environment variables
├─ next.config.js
├─ tailwind.config.js
└─ tsconfig.json
