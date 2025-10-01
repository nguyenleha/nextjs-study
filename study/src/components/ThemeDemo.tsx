'use client'

import React from 'react'
import { useTheme } from '@/contexts/ThemeContext'

const ThemeDemo: React.FC = () => {
  const { theme } = useTheme()

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Theme Demo
        </h1>
        <p className="text-muted-foreground">
          Current theme: <span className="font-semibold text-primary">{theme}</span>
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Primary Card */}
        <div className="bg-primary text-primary-foreground p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Primary Card</h3>
          <p className="text-sm opacity-90">
            This card uses the primary theme colors. Perfect for important content.
          </p>
        </div>

        {/* Secondary Card */}
        <div className="bg-secondary text-secondary-foreground p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Secondary Card</h3>
          <p className="text-sm opacity-90">
            This card uses secondary colors. Great for supporting content.
          </p>
        </div>

        {/* Accent Card */}
        <div className="bg-accent text-accent-foreground p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Accent Card</h3>
          <p className="text-sm opacity-90">
            This card uses accent colors. Perfect for highlights.
          </p>
        </div>

        {/* Muted Card */}
        <div className="bg-muted text-muted-foreground p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Muted Card</h3>
          <p className="text-sm opacity-90">
            This card uses muted colors. Ideal for less important content.
          </p>
        </div>

        {/* Card with Border */}
        <div className="bg-card text-card-foreground border border-border p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Bordered Card</h3>
          <p className="text-sm text-muted-foreground">
            This card has a border and uses card colors. Great for content sections.
          </p>
        </div>

        {/* Destructive Card */}
        <div className="bg-destructive text-destructive-foreground p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Destructive Card</h3>
          <p className="text-sm opacity-90">
            This card uses destructive colors. Use for warnings or errors.
          </p>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
            Primary Button
          </button>
          <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
            Secondary Button
          </button>
          <button className="bg-accent text-accent-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
            Accent Button
          </button>
          <button className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
            Destructive Button
          </button>
          <button className="border border-border text-foreground px-4 py-2 rounded-md hover:bg-accent transition-colors">
            Outline Button
          </button>
        </div>
      </div>

      {/* Form Elements */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Form Elements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Input Field</label>
            <input
              type="text"
              placeholder="Enter some text..."
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Select</label>
            <select className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
        </div>
      </div>

      {/* Color Palette */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="w-full h-16 bg-primary rounded-md"></div>
            <p className="text-sm text-center text-foreground">Primary</p>
          </div>
          <div className="space-y-2">
            <div className="w-full h-16 bg-secondary rounded-md"></div>
            <p className="text-sm text-center text-foreground">Secondary</p>
          </div>
          <div className="space-y-2">
            <div className="w-full h-16 bg-accent rounded-md"></div>
            <p className="text-sm text-center text-foreground">Accent</p>
          </div>
          <div className="space-y-2">
            <div className="w-full h-16 bg-muted rounded-md"></div>
            <p className="text-sm text-center text-foreground">Muted</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThemeDemo
