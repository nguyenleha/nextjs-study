'use client'

import { UserFormInput } from '@/components/layout/user/FormInput'
import React from 'react'

export default function UserEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params)

    return <UserFormInput isCreate={false} slug={id} />
}
