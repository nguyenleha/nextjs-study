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
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'

const createSignUpSchema = (t: (key: string) => string) =>
    z
        .object({
            name: z.string().min(2, t('validation.nameMin')),
            email: z.string().email(t('validation.emailInvalid')),
            password: z.string().min(6, t('validation.passwordMin')),
            confirmPassword: z.string().min(6, t('validation.confirmPasswordRequired')),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: t('validation.passwordsMismatch'),
            path: ['confirmPassword'],
        })

export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const t = useTranslations('auth')

    const signUpSchema = createSignUpSchema(t)
    type SignUpForm = z.infer<typeof signUpSchema>

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpForm>({
        resolver: zodResolver(signUpSchema),
    })

    const onSubmit = async (data: SignUpForm) => {
        setIsLoading(true)
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000))
            console.log('Sign up data:', data)
            // Handle successful sign up
        } catch (error) {
            console.error('Sign up error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">{t('signUp.title')}</CardTitle>
                <CardDescription className="text-center">{t('signUp.description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">{t('signUp.name')}</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input id="name" type="text" placeholder={t('signUp.namePlaceholder')} className="pl-10" {...register('name')} />
                        </div>
                        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">{t('signUp.email')}</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input id="email" type="email" placeholder={t('signUp.emailPlaceholder')} className="pl-10" {...register('email')} />
                        </div>
                        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">{t('signUp.password')}</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input id="password" type={showPassword ? 'text' : 'password'} placeholder={t('signUp.passwordPlaceholder')} className="pl-10 pr-10" {...register('password')} />
                            <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>
                        {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">{t('signUp.confirmPassword')}</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} placeholder={t('signUp.confirmPasswordPlaceholder')} className="pl-10 pr-10" {...register('confirmPassword')} />
                            <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>
                        {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? t('signUp.submittingButton') : t('signUp.submitButton')}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
                <div className="text-sm text-center text-muted-foreground">
                    {t('signUp.haveAccount')}{' '}
                    <Link href="/sign-in" className="text-primary hover:underline">
                        {t('signUp.signInLink')}
                    </Link>
                </div>
                <div className="text-sm text-center text-muted-foreground">
                    {t('signUp.termsText')}{' '}
                    <Link href="/terms" className="text-primary hover:underline">
                        {t('signUp.termsLink')}
                    </Link>{' '}
                    {t('signUp.and')}{' '}
                    <Link href="/privacy" className="text-primary hover:underline">
                        {t('signUp.privacyLink')}
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}
