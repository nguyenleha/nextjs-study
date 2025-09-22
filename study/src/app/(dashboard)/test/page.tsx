import PrefectureClient from '@/components/demo/PrefectureClient'
import { PageProps } from '@/types/next'
import PrefectureSSR from '@/components/demo/PrefectureSSR'

export const dynamic = 'force-dynamic'

export default async function ProjectsPage({ searchParams }: PageProps) {
    const basePath = '/test' as string

    return (
        <>
            <PrefectureSSR searchParams={searchParams} basePath={basePath} />
            <PrefectureClient />
        </>
    )
}
