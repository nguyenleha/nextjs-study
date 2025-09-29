import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState, useMemo } from 'react'
import { getQuery } from '@/utils/Common'

export type Props = {
    isCreate?: boolean
}

export function Loading({ isCreate }: Props) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const queryObj = useMemo(() => getQuery(searchParams), [searchParams])

    return (
        <>
            <h1 className="common_page_title">{isCreate ? 'ユーザ新規登録' : 'ユーザ編集'}</h1>
            {/* {loading && <Loading />} */}
        </>
    )
}
