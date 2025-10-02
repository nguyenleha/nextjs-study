'use client'

import * as React from 'react'
import { Moon, Sun, Palette } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'

export function ThemeSwitcher() {
    const { setTheme, theme } = useTheme()
    const t = useTranslations('component')

    const getThemeIcon = () => {
        if (theme === 'dark') return <Moon className="h-[1.2rem] w-[1.2rem]" />
        if (theme === 'light') return <Sun className="h-[1.2rem] w-[1.2rem]" />
        return <Palette className="h-[1.2rem] w-[1.2rem]" />
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    {getThemeIcon()}
                    <span className="sr-only">{t('themeSwitcher.toggleTheme')}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                    <Sun className="mr-2 h-4 w-4" />
                    {t('themeSwitcher.light')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                    <Moon className="mr-2 h-4 w-4" />
                    {t('themeSwitcher.dark')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTheme('blue')}>
                    <div className="mr-2 h-4 w-4 rounded-full bg-blue-500" />
                    {t('themeSwitcher.blue')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('green')}>
                    <div className="mr-2 h-4 w-4 rounded-full bg-green-500" />
                    {t('themeSwitcher.green')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('purple')}>
                    <div className="mr-2 h-4 w-4 rounded-full bg-purple-500" />
                    {t('themeSwitcher.purple')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('orange')}>
                    <div className="mr-2 h-4 w-4 rounded-full bg-orange-500" />
                    {t('themeSwitcher.orange')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTheme('system')}>
                    <Palette className="mr-2 h-4 w-4" />
                    {t('themeSwitcher.system')}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
