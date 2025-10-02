'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Sparkles, Zap, Shield, Palette, Code, Database, Smartphone } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
    const t = useTranslations('home')

    const features = [
        {
            icon: Palette,
            title: t('features.shadcn.title'),
            description: t('features.shadcn.description'),
            color: 'bg-blue-500',
        },
        {
            icon: Zap,
            title: t('features.framerMotion.title'),
            description: t('features.framerMotion.description'),
            color: 'bg-purple-500',
        },
        {
            icon: Code,
            title: t('features.reactHookForm.title'),
            description: t('features.reactHookForm.description'),
            color: 'bg-green-500',
        },
        {
            icon: Shield,
            title: t('features.zod.title'),
            description: t('features.zod.description'),
            color: 'bg-orange-500',
        },
        {
            icon: Database,
            title: t('features.nextjs.title'),
            description: t('features.nextjs.description'),
            color: 'bg-black',
        },
        {
            icon: Smartphone,
            title: t('features.responsive.title'),
            description: t('features.responsive.description'),
            color: 'bg-pink-500',
        },
    ]
    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center space-y-6">
                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <Sparkles className="h-4 w-4" />
                        {t('badge')}
                    </motion.div>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        {t('title')}
                        <br />
                        <span className="text-primary">{t('subtitle')}</span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('description')}</p>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="text-lg px-8">
                            <Link href="/dashboard">
                                {t('exploreDashboard')}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="text-lg px-8">
                            <Link href="/forms">{t('tryForms')}</Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-4 py-20">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">{t('poweredBy')}</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('poweredByDescription')}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ y: -5 }}>
                                <Card className="h-full hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                                            <Icon className="h-6 w-6 text-white" />
                                        </div>
                                        <CardTitle className="flex items-center gap-2">
                                            {feature.title}
                                            <Badge variant="secondary">Popular</Badge>
                                        </CardTitle>
                                        <CardDescription className="text-base">{feature.description}</CardDescription>
                                    </CardHeader>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-20">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center space-y-6">
                    <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                        <CardContent className="p-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('readyToBuild')}</h2>
                            <p className="text-xl text-muted-foreground mb-8">{t('readyToBuildDescription')}</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button asChild size="lg" className="text-lg px-8">
                                    <Link href="/animations">
                                        {t('viewAnimations')}
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="text-lg px-8">
                                    <Link href="/charts">{t('seeCharts')}</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </section>
        </div>
    )
}
