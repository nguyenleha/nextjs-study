import ThemeDemo from '@/components/ThemeDemo'
import ThemeSwitcher from '@/components/ThemeSwitcher'

export default function ThemeDemoPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with Theme Switcher */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-foreground">
            Theme Demo
          </h1>
          <ThemeSwitcher />
        </div>
      </header>

      {/* Main Content */}
      <main>
        <ThemeDemo />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>Theme system demo - Click the theme switcher to see different themes!</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

