import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/app/globals.css'
import { ThemeProvider } from '@/components/shared/theme-provider'
import { Header } from '@/components/shared/header'
import { Sidebar } from '@/components/shared/sidebar'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { routing } from '@/libs/I18nRouting'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await props.params
    const t = await getTranslations({ locale, namespace: 'home' })

    return {
        title: t('title'),
        description: t('description'),
    }
}

export default async function RootLayout(props: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const messages = await getMessages()

    const { locale } = await props.params

    if (!hasLocale(routing.locales, locale)) {
        notFound()
    }
    setRequestLocale(locale)
    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <html lang={locale} suppressHydrationWarning>
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        <LayoutContent>{props.children}</LayoutContent>
                    </ThemeProvider>
                </body>
            </html>
        </NextIntlClientProvider>
    )
}

function LayoutContent({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex min-h-screen">
            {/* Desktop Sidebar - Luôn ẩn trên mobile */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 transition-all duration-300 ease-in-out" id="desktop-sidebar">
                <div className="flex-1 flex flex-col min-h-0 border-r bg-background">
                    <Sidebar />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col flex-1 md:pl-64 transition-all duration-300 ease-in-out" id="main-content">
                <Header />
                <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
        </div>
    )
}
