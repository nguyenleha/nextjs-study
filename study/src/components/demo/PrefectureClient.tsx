'use client'
import { Button } from '@/components/ui/Button'
import { useCallback, useEffect, useState } from 'react'
import { apiFetch } from '@/lib/oauth2'
import { Prefecture, PrefectureResponse } from '@/types/prefecture'
import { ClientPagination } from '@/components/ui/ClientPagination'

export default function PrefectureClient() {
    const [items, setItems] = useState<Prefecture[]>([])
    const [page, setPage] = useState(1)
    const [perPage] = useState(8)
    const [totalPages, setTotalPages] = useState(1)
    // const [loading, setLoading] = useState(false)

    const fetchData = useCallback(
        async (p: number) => {
            // setLoading(true)
            try {
                // const res = await apiFetch<PrefectureResponse>('/prefecture/search', {
                //     method: 'POST',
                //     body: JSON.stringify({
                //         page: p,
                //         perPage,
                //     }),
                // })
                // setItems(res.data.list)
                // setTotalPages(res.meta.last_page)

                const prefecture = await apiFetch<PrefectureResponse>('/system/dashboard/getStats', {
                    method: 'GET',
                })
                console.log('prefecture :>> ', prefecture)
            } 
            catch (error) {
                console.error('Failed to fetch data:', error)
            }
            finally {
                // setLoading(false)
            }
        },
        [perPage],
    )

    const handleLoad = () => fetchData(page)
    const handleClear = () => {
        setItems([])
        setPage(1)
        setTotalPages(1)
    }

    useEffect(() => {
        // Optionally load on mount
        // fetchData(page)
    }, [fetchData, page])

    return (
        <div style={{ marginBottom: 16 }}>
            <Button variant="secondary" onClick={handleLoad}>
                Tải danh sách
            </Button>
            <Button variant="primary" onClick={handleClear} style={{ marginLeft: 8 }}>
                Xóa danh sách
            </Button>

            <div style={{ marginTop: 12 }}>
                {
                    <table border={1} cellSpacing={0} cellPadding={8}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên</th>
                                <th>Alphabet</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.name}</td>
                                    <td>{u.alphabet}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>

            <div style={{ marginTop: 12 }}>
                <ClientPagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={(p) => {
                        setPage(p)
                        fetchData(p)
                    }}
                />
            </div>
        </div>
    )
}
