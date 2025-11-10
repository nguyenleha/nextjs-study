'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'

const createSignInSchema = (t: (key: string) => string) =>
    z.object({
        email: z.string().email(t('validation.emailInvalid')),
        password: z.string().min(6, t('validation.passwordMin')),
    })

export default function SignInPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isCustomLoading, setIsCustomLoading] = useState(false)
    const t = useTranslations('auth')

    const signInSchema = createSignInSchema(t)
    type SignInForm = z.infer<typeof signInSchema>

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInForm>({
        resolver: zodResolver(signInSchema),
    })

    const onSubmit = async (data: SignInForm) => {
        setIsLoading(true)
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000))
            console.log('Sign in data:', data)
            // Handle successful sign in
        } catch (error) {
            console.error('Sign in error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleCustomButtonClick = async () => {
        setIsCustomLoading(true)
        try {
            // Simulate custom action
            await new Promise((resolve) => setTimeout(resolve, 1500))
            console.log('Custom button clicked - performing custom action')
            // Handle custom action
        } catch (error) {
            console.error('Custom action error:', error)
        } finally {
            setIsCustomLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">{t('signIn.title')}</CardTitle>
                <CardDescription className="text-center">{t('signIn.description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">{t('signIn.email')}</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input id="email" type="email" placeholder={t('signIn.emailPlaceholder')} className="pl-10" {...register('email')} />
                        </div>
                        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">{t('signIn.password')}</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input id="password" type={showPassword ? 'text' : 'password'} placeholder={t('signIn.passwordPlaceholder')} className="pl-10 pr-10" {...register('password')} />
                            <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>
                        {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? t('signIn.submittingButton') : t('signIn.submitButton')}
                    </Button>
                </form>

                <div className="mt-4">
                    <Button type="button" variant="outline" className="w-full" onClick={handleCustomButtonClick} disabled={isCustomLoading}>
                        {isCustomLoading ? 'Đang xử lý...' : 'Nút tùy chỉnh'}
                    </Button>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
                <div className="text-sm text-center text-muted-foreground">
                    {t('signIn.noAccount')}{' '}
                    <Link href="/sign-up" className="text-primary hover:underline">
                        {t('signIn.signUpLink')}
                    </Link>
                </div>
                <div className="text-sm text-center">
                    <Link href="/forgot-password" className="text-primary hover:underline">
                        {t('signIn.forgotPassword')}
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}
