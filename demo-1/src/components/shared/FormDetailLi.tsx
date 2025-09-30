import Link from 'next/link'
import { ReactNode } from 'react'

export type FormDetailLiProps = {
    title: string
    required?: boolean
    errMes?: string[]
    value?: string | number | boolean | string[]
    href?: string
    hrefValue?: string
    arrayData?: string | number | boolean | string[]
    kintoneDeleteFlag?: boolean
    children?: ReactNode
}

export function FormDetailLi({ title, required, errMes, value, href, hrefValue, arrayData, kintoneDeleteFlag, children }: FormDetailLiProps) {
    const getArrayData = (arrayData?: string | number | boolean | string[]) => {
        if (arrayData && typeof arrayData === 'object') {
            return arrayData.map((item) => item).join('、')
        }
        return ''
    }
    return (
        <li className="detail-form_item">
            <div className="detail-form_block">
                <p className="detail-form_title">
                    {title}
                    {required && <span>必須</span>}
                </p>
                <div className="detail-form_main">
                    {children}
                    {hrefValue && href && (
                        <Link href={href} className="common_link_s" target="_blank" rel="nofollow">
                            {hrefValue}
                        </Link>
                    )}
                    {value && <p className="common_text_s">{value}</p>}
                    {arrayData && <>{getArrayData(arrayData)}</>}
                    {errMes && (
                        <p id="form_error" className="form_error">
                            {errMes[0]}
                        </p>
                    )}
                    {kintoneDeleteFlag && <p className="form_error">(このレコードはKintoneで削除されました。)</p>}
                </div>
            </div>
        </li>
    )
}
