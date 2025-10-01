# Demo-2: Next.js with Popular Libraries

A comprehensive showcase of the most popular and powerful libraries in the React ecosystem, all working together seamlessly in a Next.js 15 application.

## 🚀 Features

-   **Next.js 15** with App Router and Server Components
-   **shadcn/ui** - Beautiful, accessible components
-   **Framer Motion** - Smooth animations and gestures
-   **React Hook Form** - Performant form handling
-   **Zod** - Type-safe schema validation
-   **Lucide React** - Beautiful icons
-   **Tailwind CSS** - Utility-first styling
-   **TypeScript** - Type safety throughout

## 🎨 Pages & Components

### 🏠 Home Page

-   Hero section with animated elements
-   Feature showcase with hover effects
-   Call-to-action sections
-   Responsive design

### 📊 Dashboard

-   Interactive statistics cards
-   Team member management
-   Recent orders table
-   Quick action buttons
-   Responsive grid layout

### 🎭 Animations

-   Bounce, rotate, pulse, shake, and float animations
-   Interactive hover effects
-   Gesture-based interactions (drag, scale, rotate)
-   Play/pause controls for all animations

### 📝 Forms

-   Comprehensive registration form
-   Real-time validation with Zod
-   Multi-step form sections
-   Interactive interest selection
-   Loading states and success feedback

### 📈 Charts

-   Revenue trend visualization
-   User device distribution
-   Performance metrics dashboard
-   Chart library recommendations

### ⚙️ Settings

-   Profile management
-   Notification preferences
-   Appearance customization
-   Security settings
-   API configuration

## 🛠️ Tech Stack

### Core Framework

-   **Next.js 15** - React framework with App Router
-   **React 19** - Latest React features
-   **TypeScript** - Type safety and better DX

### UI & Styling

-   **shadcn/ui** - Component library built on Radix UI
-   **Tailwind CSS** - Utility-first CSS framework
-   **Lucide React** - Icon library
-   **next-themes** - Theme switching

### Animations

-   **Framer Motion** - Animation and gesture library
-   **CSS Transitions** - Smooth theme transitions

### Forms & Validation

-   **React Hook Form** - Performant form library
-   **Zod** - Schema validation
-   **@hookform/resolvers** - Form validation integration

### Development Tools

-   **ESLint** - Code linting
-   **Prettier** - Code formatting
-   **TypeScript** - Static type checking

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+
-   npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd demo-2
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
demo-2/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── animations/         # Animation demos
│   │   ├── charts/            # Chart visualizations
│   │   ├── dashboard/         # Dashboard page
│   │   ├── forms/             # Form demos
│   │   ├── settings/          # Settings page
│   │   ├── globals.css        # Global styles
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── header.tsx        # Navigation header
│   │   ├── theme-provider.tsx # Theme context
│   │   └── theme-switcher.tsx # Theme toggle
│   └── lib/                  # Utility functions
│       └── utils.ts          # Common utilities
├── public/                   # Static assets
├── components.json          # shadcn/ui config
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json           # TypeScript config
└── package.json            # Dependencies
```

## 🎯 Key Features Demonstrated

### 1. Modern React Patterns

-   Server Components vs Client Components
-   Custom hooks and context
-   State management with React Hook Form
-   Type-safe props and state

### 2. Beautiful UI Components

-   Accessible components with shadcn/ui
-   Consistent design system
-   Dark/light theme support
-   Responsive design patterns

### 3. Smooth Animations

-   Page transitions with Framer Motion
-   Interactive hover effects
-   Gesture-based interactions
-   Performance-optimized animations

### 4. Form Handling

-   Complex form validation with Zod
-   Real-time error feedback
-   Loading states and success handling
-   Type-safe form data

### 5. Data Visualization

-   Chart component placeholders
-   Performance metrics display
-   Interactive data tables
-   Responsive grid layouts

## 🔧 Customization

### Adding New Components

1. Use shadcn/ui CLI: `npx shadcn@latest add [component]`
2. Create custom components in `src/components/`
3. Follow the established patterns and naming conventions

### Theming

-   Modify CSS variables in `src/app/globals.css`
-   Add new themes in the theme provider
-   Customize component variants in `components.json`

### Animations

-   Add new animations using Framer Motion
-   Create reusable animation variants
-   Use the `motion` component for interactive elements

## 📚 Learning Resources

### Next.js

-   [Next.js Documentation](https://nextjs.org/docs)
-   [App Router Guide](https://nextjs.org/docs/app)

### shadcn/ui

-   [shadcn/ui Documentation](https://ui.shadcn.com)
-   [Component Examples](https://ui.shadcn.com/docs/components)

### Framer Motion

-   [Framer Motion Docs](https://www.framer.com/motion/)
-   [Animation Examples](https://www.framer.com/motion/examples/)

### React Hook Form

-   [React Hook Form Docs](https://react-hook-form.com)
-   [Form Examples](https://react-hook-form.com/get-started)

### Zod

-   [Zod Documentation](https://zod.dev)
-   [Schema Examples](https://zod.dev/?id=basic-usage)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

-   [Next.js Team](https://nextjs.org) for the amazing framework
-   [shadcn](https://twitter.com/shadcn) for the beautiful component library
-   [Framer](https://framer.com) for the animation library
-   [React Hook Form](https://react-hook-form.com) for form handling
-   [Zod](https://zod.dev) for schema validation
-   [Lucide](https://lucide.dev) for the beautiful icons

---

**Happy coding! 🚀**
