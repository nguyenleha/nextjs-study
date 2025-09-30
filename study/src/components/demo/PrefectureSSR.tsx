'use server'

import { apiFetch } from '@/lib/oauth2'
import { PrefectureResponse } from '@/types/prefecture'
import { PageProps } from '@/types/next'
import { Pagination } from '../ui/Pagination'
import { cookies } from 'next/headers'

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
    const prefecture = await apiFetch('/system/user/search', {
        method: 'POST',
        body: JSON.stringify({
            doesntHave: {
                roles: {
                    where: [{ 'roles.id': [1, 4], strict: true }],
                    relationship: 'roles',
                },
            },
        }),
    })
    // const prefecture = await apiFetch<PrefectureResponse>('/system/health', {
    //     method: 'GET',
    // })
    console.log('prefecture :>> ', prefecture)
    return (
        <>
            <table border={1} cellSpacing={0} cellPadding={8} style={{ marginTop: 12 }}>
                <thead>
                    <tr>
                        <th style={{ paddingLeft: '20px' }}>STT</th>
                        <th style={{ paddingLeft: '20px' }}>full_name</th>
                        <th style={{ paddingLeft: '20px' }}>username</th>
                    </tr>
                </thead>
                <tbody>
                    {prefecture &&
                        prefecture.data.map((u) => (
                            <tr key={u.id}>
                                <td style={{ paddingLeft: '20px' }}>{u.id}</td>
                                <td style={{ paddingLeft: '20px' }}>{u.full_name}</td>
                                <td style={{ paddingLeft: '20px' }}>{u.username}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <div style={{ marginTop: 16 }}>{/* <Pagination currentPage={prefecture.meta.current_page} totalPages={prefecture.meta.last_page} pageSize={pageSize} basePath={basePath} /> */}</div>
        </>
    )
}
