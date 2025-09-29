import { ReactNode } from 'react'

export type FormSearchLiProps = {
    title: string
    children?: ReactNode
}

export function FormSearchLi({ title, children }: FormSearchLiProps) {
    return (
        <li className="common_search_item">
            <p className="common_search_title">{title}</p>
            <div className="common_search_main">{children}</div>
        </li>
    )
}
