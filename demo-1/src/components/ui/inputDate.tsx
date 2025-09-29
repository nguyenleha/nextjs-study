import Image from 'next/image'
import closeIcon from '@/assets/images/common/close_icon.svg'
import { TextInput } from './TextInput'
export type InputDateProps = {
    fieldName: string
    btnFromClear: string | number | string[] | undefined
    btnToClear: string | number | string[] | undefined
    type: string
}

export function InputDate({ fieldName, btnFromClear, btnToClear, type }: InputDateProps) {
    return (
        <div className="form_date_block">
            <div className="form_date_custom">
                <TextInput id={`${fieldName}_from_${type}`} type="text" className="form_input input_date_custom" readOnly placeholder='' />
                <button id={`${fieldName}_from_clear_${type}`} type="button" className="clear-date" style={{ display: btnFromClear ? undefined : 'none' }}>
                    <Image src={closeIcon} alt="close" width={16} height={16} />
                </button>
            </div>
            <p className="common_text_s">~</p>
            <div className="form_date_custom">
                <TextInput id={`${fieldName}_to_${type}`} type="text" className="form_input input_date_custom" readOnly placeholder=''/>
                <button id={`${fieldName}_to_clear_${type}`} type="button" className="clear-date" style={{ display: btnToClear ? undefined : 'none' }}>
                    <Image src={closeIcon} alt="close" width={16} height={16} />
                </button>
            </div>
        </div>
    )
}
