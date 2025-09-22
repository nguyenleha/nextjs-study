# nextjs-study

Cấu trúc dưới đây phản ánh đúng các file hiện có trong thư mục `study/` (App Router, components, services, …).

📦 my-next-app (trong `study/`)
├─ 📂 src
│ ├─ 📂 app # App Router (routes, layouts, pages)
│ │ ├─ 📂 (public) # Route group: không xuất hiện trên URL
│ │ │ ├─ 📂 home
│ │ │ │ ├─ layout.tsx
│ │ │ │ └─ page.tsx
│ │ │ ├─ 📂 about
│ │ │ │ └─ page.tsx
│ │ │ ├─ layout.tsx # Layout riêng cho khu public (single header)
│ │ │ └─ page.tsx # Trang index thuộc nhóm public
│ │ ├─ 📂 (dashboard) # Route group: khu vực bảo vệ (double header)
│ │ │ ├─ 📂 projects
│ │ │ │ └─ page.tsx
│ │ │ ├─ 📂 settings
│ │ │ │ └─ page.tsx
│ │ │ └─ layout.tsx # Layout riêng cho dashboard (double header)
│ │ ├─ error.tsx # Error UI (root)
│ │ ├─ global-error.tsx # Global error UI (root)
│ │ ├─ loading.tsx # Loading UI (root)
│ │ ├─ not-found.tsx # 404 UI (root)
│ │ ├─ template.tsx # Template re-render (root)
│ │ ├─ layout.tsx # Root layout (fonts, globals)
│ │ ├─ globals.css
│ │ ├─ favicon.ico
│ │ └─ page.tsx # Trang index tại root (nếu đồng thời tồn tại với (public)/page.tsx có thể gây trùng /)
│ │
│ ├─ 📂 components # UI components (button, input, header, …)
│ │ ├─ 📂 ui
│ │ │ ├─ Button.tsx # Client component (nhận onClick, variant,…)
│ │ │ ├─ TextInput.tsx # Client component (input điều khiển)
│ │ │ └─ TextDisplay.tsx # Hiển thị text (ẩn nếu không có text)
│ │ ├─ 📂 layouts
│ │ │ └─ Container.tsx
│ │ └─ 📂 shared
│ │ └─ Header.tsx
│ │
│ ├─ 📂 features # Theo tính năng (sẵn sàng mở rộng)
│ │ ├─ auth/
│ │ ├─ project/
│ │ └─ user/
│ │
│ ├─ 📂 hooks # Custom React hooks
│ │ └─ useAuth.ts
│ │
│ ├─ 📂 lib # Helpers, utils, configs
│ │ ├─ 📂 api
│ │ │ └─ client.ts # apiFetch đơn giản
│ │ ├─ constants.ts
│ │ └─ utils.ts
│ │
│ ├─ 📂 services # Business logic (gọi API, xử lý data)
│ │ ├─ authService.ts
│ │ └─ projectService.ts
│ │
│ ├─ 📂 store # State management (demo store in-memory)
│ │ └─ index.ts
│ │
│ ├─ 📂 types # TypeScript types/interfaces
│ │ ├─ next.d.ts
│ │ └─ project.ts
│ │
│ ├─ 📂 styles # Global styles, SCSS, Tailwind, …
│ │ └─ demo.css
│ │
│ └─ 📂 tests # Unit, integration, e2e
│ └─ smoke.test.ts
│
└─ (các file cấu hình trong `study/`)
├─ package.json
├─ tsconfig.json
├─ next.config.ts
├─ eslint.config.mjs
├─ postcss.config.mjs
└─ next-env.d.ts

Ghi chú về Route Group (thư mục trong ngoặc tròn):

-   Các thư mục như `(public)`, `(dashboard)` chỉ để nhóm route và layout; KHÔNG xuất hiện trên URL.
-   Ví dụ: `app/(public)/home/page.tsx` có URL thực là `/home`.
-   Layout theo nhóm: `app/(public)/layout.tsx` áp dụng cho mọi route trong nhóm public; `app/(dashboard)/layout.tsx` áp dụng cho dashboard.
-   Các file đặc biệt (error.tsx, loading.tsx, not-found.tsx, template.tsx) sẽ ưu tiên dùng ở segment gần nhất; nếu không có sẽ “bubble” lên root.

Cảnh báo trùng route `/`:

-   Hiện tại có cả `app/page.tsx` và `app/(public)/page.tsx`. Hai file này đều map tới `/`. Nên giữ lại một trong hai để tránh xung đột khi build.

Alias import:

-   Đã cấu hình `paths: { "@/*": ["./src/*"] }` trong `study/tsconfig.json`, vì vậy có thể import như `@/components/ui/Button`.
