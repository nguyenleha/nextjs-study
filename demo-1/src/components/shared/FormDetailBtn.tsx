import { Loading } from '@/components/shared/Loading'
import Link from 'next/link'
import { Button } from '../ui/Button'
import { Query } from '@/types/common'

export type FormDetailBtnProps = {
    pending: boolean
    cancelBtn: {
        path: string
        query?: Query
    }
}

export function FormDetailBtn({ pending, cancelBtn }: FormDetailBtnProps) {
    const getQueryString = (query?: Query) => {
        if (!query) return ''

        const params = new URLSearchParams()
        Object.entries(query).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((val) => params.append(key, String(val)))
            } else {
                params.append(key, String(value))
            }
        })
        return `?${params.toString()}`
    }
    return (
        <div className="detail-form_btnarea">
            {pending ? (
                <button className="common_cancel_btn">
                    <Loading white />
                </button>
            ) : (
                <Link href={`${cancelBtn.path}${getQueryString(cancelBtn.query)}`} className="common_cancel_btn">
                    戻る
                </Link>
            )}

            <Button className="common_highlight_btn" pending={{ action: pending, white: true }} type="submit">
                登録する
            </Button>
        </div>
    )
}
