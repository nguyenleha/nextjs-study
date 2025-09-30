'use client'

import type { Metadata } from 'next'
import { UserFormInput } from '@/components/layout/user/FormInput'

export const metadata: Metadata = {
    title: 'User create',
    description: 'User create page',
}

export default function UserCreatePage() {
    return <UserFormInput isCreate />
}
