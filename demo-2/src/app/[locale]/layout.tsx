import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/app/globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'
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
        <html lang={locale} suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <div className="relative flex min-h-screen flex-col">
                        <Header />
                        <main className="flex-1">
                            <NextIntlClientProvider locale={locale} messages={messages}>
                                {props.children}
                            </NextIntlClientProvider>
                        </main>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}
