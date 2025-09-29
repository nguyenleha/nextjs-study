import Image from 'next/image'
import changeIconAsc from '@/assets/images/common/change_icon_asc.svg'
import changeIconDesc from '@/assets/images/common/change_icon_desc.svg'
import changeIcon from '@/assets/images/common/change_icon.svg'

export type Props = {
    title: string
    titleBr?: string
    value?: string
    type?: string
    disableButton?: boolean
    onSort?: (value?: string) => void
}

export function TableTh({ title = '', titleBr = '', value = '', type = '', disableButton = false, onSort }: Props) {
    return (
        <th className="common_table_title">
            <div className="common_table_title_block">
                {title}
                {titleBr && (
                    <>
                        <br />
                        {titleBr}
                    </>
                )}
                {!disableButton && (
                    <button className="common_table_change_btn" onClick={() => onSort && onSort(value)} type="button">
                        {type === 'asc' ? <Image src={changeIconAsc} alt="change" /> : type === 'desc' ? <Image src={changeIconDesc} alt="change" /> : <Image src={changeIcon} alt="change" />}
                    </button>
                )}
            </div>
        </th>
    )
}
