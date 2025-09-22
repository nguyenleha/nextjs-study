import { apiFetch } from '@/lib/api/client'
import { PrefectureResponse } from '@/types/prefecture'
import { PageProps } from '@/types/next'
import { Pagination } from '../ui/Pagination'

type Props = PageProps & { basePath: string }

export default async function PrefectureSSR({ searchParams, basePath }: Props) {
    // Read page and perPage from the URL (e.g., ?page=2&perPage=8)
    const params = ((await searchParams) ?? {}) as { [key: string]: string | string[] | undefined }
    const pageRaw = Array.isArray(params.page) ? params.page[0] : params.page
    const perPageRaw = Array.isArray(params.perPage) ? params.perPage[0] : params.perPage
    const page = Number(pageRaw)
    const perPage = Number(perPageRaw)

    const currentPage = Number.isFinite(page) && page > 0 ? page : 1
    const pageSize = Number.isFinite(perPage) && perPage > 0 ? perPage : 8

    // SSR: fetch prefecture on the server and render immediately
    const prefecture = await apiFetch<PrefectureResponse>('/prefecture/search', {
        cache: 'no-store',
        method: 'POST',
        body: JSON.stringify({
            page: currentPage,
            perPage: pageSize,
        }),
    })

    return (
        <>
            <table border={1} cellSpacing={0} cellPadding={8} style={{ marginTop: 12 }}>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>name</th>
                        <th>alphabet</th>
                    </tr>
                </thead>
                <tbody>
                    {prefecture.data.list.map((u) => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.name}</td>
                            <td>{u.alphabet}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ marginTop: 16 }}>
                <Pagination currentPage={prefecture.meta.current_page} totalPages={prefecture.meta.last_page} pageSize={pageSize} basePath={basePath} />
            </div>
        </>
    )
}
