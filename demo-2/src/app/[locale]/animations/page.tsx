'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Play, Pause, RotateCcw, Zap, Heart, Star, Sparkles, Target, Waves } from 'lucide-react'
import { useState } from 'react'

const animationVariants = {
    bounce: {
        y: [0, -20, 0],
        transition: {
            duration: 0.6,
            repeat: Infinity,
            repeatType: 'reverse' as const,
        },
    },
    rotate: {
        rotate: 360,
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'linear' as const,
        },
    },
    pulse: {
        scale: [1, 1.2, 1],
        transition: {
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut' as const,
        },
    },
    shake: {
        x: [0, -10, 10, -10, 10, 0],
        transition: {
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 2,
        },
    },
    float: {
        y: [0, -30, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut' as const,
        },
    },
}

export default function AnimationsPage() {
    const [isPlaying, setIsPlaying] = useState(true)
    const t = useTranslations('animations')

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted">
            <div className="container mx-auto px-4 py-20">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center space-y-4 mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        {t('title')}
                        <span className="text-primary"> {t('subtitle')}</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('description')}</p>
                    <div className="flex justify-center gap-4">
                        <Button onClick={() => setIsPlaying(!isPlaying)} variant={isPlaying ? 'destructive' : 'default'}>
                            {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                            {isPlaying ? t('pauseAll') : t('playAll')}
                        </Button>
                        <Button onClick={() => window.location.reload()} variant="outline">
                            <RotateCcw className="h-4 w-4 mr-2" />
                            {t('reset')}
                        </Button>
                    </div>
                </motion.div>

                {/* Animation Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Bounce Animation */}
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
                        <Card className="h-full">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
                                        <Zap className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <CardTitle>{t('bounce.title')}</CardTitle>
                                        <Badge variant="secondary">{t('badges.continuous')}</Badge>
                                    </div>
                                </div>
                                <CardDescription>{t('bounce.description')}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-center">
                                    <motion.div animate={isPlaying ? animationVariants.bounce : {}} className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                                        <Zap className="h-8 w-8 text-primary-foreground" />
                                    </motion.div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Rotate Animation */}
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                        <Card className="h-full">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center">
                                        <RotateCcw className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <CardTitle>Rotate</CardTitle>
                                        <Badge variant="secondary">Continuous</Badge>
                                    </div>
                                </div>
                                <CardDescription>360-degree rotation with linear easing</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-center">
                                    <motion.div animate={isPlaying ? animationVariants.rotate : {}} className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                                        <RotateCcw className="h-8 w-8 text-primary-foreground" />
                                    </motion.div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Pulse Animation */}
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
                        <Card className="h-full">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
                                        <Heart className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <CardTitle>Pulse</CardTitle>
                                        <Badge variant="secondary">Continuous</Badge>
                                    </div>
                                </div>
                                <CardDescription>Scale animation that creates a pulsing effect</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-center">
                                    <motion.div animate={isPlaying ? animationVariants.pulse : {}} className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                                        <Heart className="h-8 w-8 text-primary-foreground" />
                                    </motion.div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Shake Animation */}
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
                        <Card className="h-full">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center">
                                        <Target className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <CardTitle>Shake</CardTitle>
                                        <Badge variant="secondary">Continuous</Badge>
                                    </div>
                                </div>
                                <CardDescription>Horizontal shake with delay between cycles</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-center">
                                    <motion.div animate={isPlaying ? animationVariants.shake : {}} className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                                        <Target className="h-8 w-8 text-primary-foreground" />
                                    </motion.div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Float Animation */}
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
                        <Card className="h-full">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-pink-500 flex items-center justify-center">
                                        <Waves className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <CardTitle>Float</CardTitle>
                                        <Badge variant="secondary">Continuous</Badge>
                                    </div>
                                </div>
                                <CardDescription>Gentle floating motion with smooth easing</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-center">
                                    <motion.div animate={isPlaying ? animationVariants.float : {}} className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                                        <Waves className="h-8 w-8 text-primary-foreground" />
                                    </motion.div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Interactive Hover */}
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
                        <Card className="h-full">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-indigo-500 flex items-center justify-center">
                                        <Sparkles className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <CardTitle>Interactive</CardTitle>
                                        <Badge variant="secondary">Hover</Badge>
                                    </div>
                                </div>
                                <CardDescription>Hover to see the animation in action</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-center">
                                    <motion.div
                                        whileHover={{
                                            scale: 1.2,
                                            rotate: 180,
                                            transition: { duration: 0.3 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-16 h-16 bg-primary rounded-full flex items-center justify-center cursor-pointer"
                                    >
                                        <Sparkles className="h-8 w-8 text-primary-foreground" />
                                    </motion.div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Gesture Demo */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mt-20">
                    <Card className="max-w-2xl mx-auto">
                        <CardHeader>
                            <CardTitle className="text-center">{t('gestureDemo.title')}</CardTitle>
                            <CardDescription className="text-center">{t('gestureDemo.description')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-center">
                                <motion.div drag dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }} whileDrag={{ scale: 1.1, rotate: 5 }} className="w-32 h-32 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center cursor-grab active:cursor-grabbing">
                                    <Star className="h-16 w-16 text-primary-foreground" />
                                </motion.div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}
