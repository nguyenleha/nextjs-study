'use client'

import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
    User,
    Mail,
    // Phone,
    MapPin,
    Calendar,
    CheckCircle,
    AlertCircle,
    Send,
} from 'lucide-react'
import { useState } from 'react'

// Form data type - will be defined after schema creation
type FormData = {
    firstName: string
    lastName: string
    email: string
    phone: string
    country: string
    city: string
    birthDate: string
    bio: string
    interests: string[]
    newsletter: boolean
    terms: boolean
}

// Countries and interests will be loaded from translations

export default function FormsPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [selectedInterests, setSelectedInterests] = useState<string[]>([])
    const t = useTranslations('forms')

    // Get countries and interests from translations
    const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Spain', 'Italy', 'Japan', 'South Korea', 'Australia', 'Brazil', 'India']
    const interests = ['Technology', 'Design', 'Business', 'Education', 'Health', 'Sports', 'Music', 'Art', 'Travel', 'Food', 'Gaming', 'Reading']

    // Create form schema with translations
    const formSchema = z.object({
        firstName: z.string().min(2, t('validation.firstNameMin')),
        lastName: z.string().min(2, t('validation.lastNameMin')),
        email: z.string().email(t('validation.emailValid')),
        phone: z.string().min(10, t('validation.phoneMin')),
        country: z.string().min(1, t('validation.countryRequired')),
        city: z.string().min(2, t('validation.cityMin')),
        birthDate: z.string().min(1, t('validation.birthDateRequired')),
        bio: z.string().min(10, t('validation.bioMin')).max(500, t('validation.bioMax')),
        interests: z.array(z.string()).min(1, t('validation.interestsMin')),
        newsletter: z.boolean(),
        terms: z.boolean().refine((val) => val === true, t('validation.termsRequired')),
    })

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            country: '',
            city: '',
            birthDate: '',
            bio: '',
            interests: [],
            newsletter: false,
            terms: false,
        },
    })

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))

        console.log('Form data:', data)
        setIsSubmitted(true)
        setIsSubmitting(false)
    }

    const toggleInterest = (interest: string) => {
        const newInterests = selectedInterests.includes(interest) ? selectedInterests.filter((i) => i !== interest) : [...selectedInterests, interest]

        setSelectedInterests(newInterests)
        form.setValue('interests', newInterests)
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="text-center space-y-6">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="h-10 w-10 text-white" />
                    </motion.div>
                    <h1 className="text-3xl font-bold text-green-600">{t('submit.success')}</h1>
                    <p className="text-muted-foreground">{t('submit.successDescription')}</p>
                    <Button onClick={() => window.location.reload()}>{t('submit.submitAnother')}</Button>
                </motion.div>
            </div>
        )
    }

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
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-6 w-6" />
                                {t('userRegistration.title')}
                            </CardTitle>
                            <CardDescription>{t('userRegistration.description')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {/* Personal Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold flex items-center gap-2">
                                        <User className="h-5 w-5" />
                                        {t('personalInformation.title')}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">{t('personalInformation.firstName')} *</Label>
                                            <Input id="firstName" {...form.register('firstName')} placeholder={t('personalInformation.firstNamePlaceholder')} />
                                            {form.formState.errors.firstName && (
                                                <p className="text-sm text-destructive flex items-center gap-1">
                                                    <AlertCircle className="h-4 w-4" />
                                                    {form.formState.errors.firstName.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">{t('personalInformation.lastName')} *</Label>
                                            <Input id="lastName" {...form.register('lastName')} placeholder={t('personalInformation.lastNamePlaceholder')} />
                                            {form.formState.errors.lastName && (
                                                <p className="text-sm text-destructive flex items-center gap-1">
                                                    <AlertCircle className="h-4 w-4" />
                                                    {form.formState.errors.lastName.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold flex items-center gap-2">
                                        <Mail className="h-5 w-5" />
                                        Contact Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address *</Label>
                                            <Input id="email" type="email" {...form.register('email')} placeholder="Enter your email" />
                                            {form.formState.errors.email && (
                                                <p className="text-sm text-destructive flex items-center gap-1">
                                                    <AlertCircle className="h-4 w-4" />
                                                    {form.formState.errors.email.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number *</Label>
                                            <Input id="phone" type="tel" {...form.register('phone')} placeholder="Enter your phone number" />
                                            {form.formState.errors.phone && (
                                                <p className="text-sm text-destructive flex items-center gap-1">
                                                    <AlertCircle className="h-4 w-4" />
                                                    {form.formState.errors.phone.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Location Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold flex items-center gap-2">
                                        <MapPin className="h-5 w-5" />
                                        Location
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="country">Country *</Label>
                                            <Select onValueChange={(value) => form.setValue('country', value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select your country" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {countries.map((country) => (
                                                        <SelectItem key={country} value={country}>
                                                            {country}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {form.formState.errors.country && (
                                                <p className="text-sm text-destructive flex items-center gap-1">
                                                    <AlertCircle className="h-4 w-4" />
                                                    {form.formState.errors.country.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="city">City *</Label>
                                            <Input id="city" {...form.register('city')} placeholder="Enter your city" />
                                            {form.formState.errors.city && (
                                                <p className="text-sm text-destructive flex items-center gap-1">
                                                    <AlertCircle className="h-4 w-4" />
                                                    {form.formState.errors.city.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold flex items-center gap-2">
                                        <Calendar className="h-5 w-5" />
                                        Additional Information
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="birthDate">Birth Date *</Label>
                                            <Input id="birthDate" type="date" {...form.register('birthDate')} />
                                            {form.formState.errors.birthDate && (
                                                <p className="text-sm text-destructive flex items-center gap-1">
                                                    <AlertCircle className="h-4 w-4" />
                                                    {form.formState.errors.birthDate.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="bio">Bio *</Label>
                                            <Textarea id="bio" {...form.register('bio')} placeholder="Tell us about yourself..." rows={4} />
                                            {form.formState.errors.bio && (
                                                <p className="text-sm text-destructive flex items-center gap-1">
                                                    <AlertCircle className="h-4 w-4" />
                                                    {form.formState.errors.bio.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Interests *</Label>
                                            <div className="flex flex-wrap gap-2">
                                                {interests.map((interest) => (
                                                    <Badge key={interest} variant={selectedInterests.includes(interest) ? 'default' : 'outline'} className="cursor-pointer hover:bg-primary/10" onClick={() => toggleInterest(interest)}>
                                                        {interest}
                                                    </Badge>
                                                ))}
                                            </div>
                                            {form.formState.errors.interests && (
                                                <p className="text-sm text-destructive flex items-center gap-1">
                                                    <AlertCircle className="h-4 w-4" />
                                                    {form.formState.errors.interests.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Preferences */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Preferences</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <input type="checkbox" id="newsletter" {...form.register('newsletter')} className="rounded border-gray-300" />
                                            <Label htmlFor="newsletter" className="text-sm">
                                                Subscribe to our newsletter
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <input type="checkbox" id="terms" {...form.register('terms')} className="rounded border-gray-300" />
                                            <Label htmlFor="terms" className="text-sm">
                                                I agree to the terms and conditions *
                                            </Label>
                                        </div>
                                        {form.formState.errors.terms && (
                                            <p className="text-sm text-destructive flex items-center gap-1">
                                                <AlertCircle className="h-4 w-4" />
                                                {form.formState.errors.terms.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-6">
                                    <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                                        {isSubmitting ? (
                                            <>
                                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="mr-2">
                                                    <Send className="h-4 w-4" />
                                                </motion.div>
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="h-4 w-4 mr-2" />
                                                Submit Form
                                            </>
                                        )}
                                    </Button>
                                </motion.div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
