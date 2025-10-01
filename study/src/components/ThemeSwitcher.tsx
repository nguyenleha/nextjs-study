'use client'

import React from 'react'
import { useTheme } from '@/contexts/ThemeContext'

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme, toggleTheme } = useTheme()

  const themes = [
    { id: 'light', name: 'Light', icon: '☀️', color: '#fbbf24' },
    { id: 'dark', name: 'Dark', icon: '🌙', color: '#1f2937' },
    { id: 'blue', name: 'Blue', icon: '💙', color: '#3b82f6' },
    { id: 'green', name: 'Green', icon: '💚', color: '#10b981' },
    { id: 'purple', name: 'Purple', icon: '💜', color: '#8b5cf6' },
  ] as const

  return (
    <div className="relative group">
      {/* Toggle Button */}
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary hover:bg-accent transition-colors duration-200 border border-border"
        title={`Current theme: ${theme}. Click to cycle through themes.`}
      >
        <span className="text-lg">
          {themes.find(t => t.id === theme)?.icon || '🎨'}
        </span>
      </button>

      {/* Dropdown Menu */}
      <div className="absolute right-0 top-12 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-2">
          <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
            Choose Theme
          </div>
          {themes.map((themeOption) => (
            <button
              key={themeOption.id}
              onClick={() => setTheme(themeOption.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                theme === themeOption.id
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent text-foreground'
              }`}
            >
              <span className="text-base">{themeOption.icon}</span>
              <span className="flex-1 text-left">{themeOption.name}</span>
              {theme === themeOption.id && (
                <span className="text-xs">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ThemeSwitcher
