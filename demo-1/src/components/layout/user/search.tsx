import { FormSearch } from '@/types/common'
import { Roles } from '@/types/system/auth'
import { getQuery } from '@/utils/Common'
import { datetimepicker } from '@/utils/datetimepicker'
import { useSearchParams } from 'next/dist/client/components/navigation'
import { useEffect, useMemo, useState } from 'react'
// import $ from 'jquery'
import { Button } from '@/components/ui/Button'
import { FormSearchLi } from '@/components/shared/FormSearchLi'
import { TextInput } from '@/components/ui/TextInput'
import { Select } from '@/components/ui/Select'
import { InputDate } from '@/components/ui/inputDate'

export type Props = {
    roles: Roles
    pending: boolean
    type: string
    search: (value: FormSearch) => void
}

export function UserSearch({ roles, pending, type, search }: Props) {
    const searchParams = useSearchParams()
    const queryObj = useMemo(() => getQuery(searchParams), [searchParams])

    const [form, setForm] = useState<FormSearch>({})
    const [formClear, setFormClear] = useState<FormSearch>({})
    const dateFields = ['updated_at_from', 'updated_at_to']
    useEffect(() => {
        if (Object.keys(queryObj).length > 0) {
            const formField: FormSearch = {}
            Object.entries(queryObj).forEach(([key, value]) => {
                if (key !== 'currentPage' && !key.includes('_sort')) formField[key] = value
            })
            setForm({ ...form, ...formField })
        }
    }, [queryObj])

    useEffect(() => {
        if (typeof window !== 'undefined' && $ && $.datetimepicker) {
            datetimepicker(dateFields, form, type)

            const newFormClear: FormSearch = { ...formClear }
            const newForm: FormSearch = { ...form }
            dateFields.forEach((item) => {
                const inputElement = $(`#${item}_${type}`)
                newFormClear[`${item}_${type}`] = inputElement.val() || ''
                setFormClear(newFormClear)

                $(`#${item}_${type}`).on('change', () => {
                    newFormClear[`${item}_${type}`] = inputElement.val() || ''
                    setFormClear(newFormClear)
                })

                $(`#${item}_clear_${type}`).click(() => {
                    inputElement.val('').trigger('change')
                    newForm[item] = ''
                    newFormClear[`${item}_${type}`] = ''
                    setForm(newForm)
                    setFormClear(newFormClear)
                    datetimepicker(dateFields, newForm, type)
                })
            })

            $(`#role_${type}`).select2({
                multiple: true,
                placeholder: '',
                allowClear: true,
                closeOnSelect: false,
            })
            $(`#role_${type}`).val(form.role).trigger('change')
        }
    }, [])

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newForm: FormSearch = { ...form }

        dateFields.forEach((item) => {
            const datetimeValue = $(`#${item}_${type}`).val()
            newForm[item] = datetimeValue || ''
            setForm(newForm)
        })
        const roleValue = $(`#role_${type}`).val() as string[]
        newForm.role = roleValue || []
        setForm(newForm)

        const formatForm: FormSearch = {}
        Object.entries(newForm).forEach(([keyForm, valueForm]) => {
            if (valueForm && valueForm !== 'all' && String(valueForm)) {
                formatForm[keyForm] = valueForm
            }
        })
        search(formatForm)
    }

    return (
        <form onSubmit={handleSearch}>
            <div className="common_search_block">
                <ul className="common_search_list">
                    <FormSearchLi title="ログインID">
                        <TextInput type="text" value={form.username} onChange={(value) => setForm((v) => ({ ...v, username: value }))} className="form_input" />
                    </FormSearchLi>
                    <FormSearchLi title="ユーザー名">
                        <TextInput type="text" value={form.full_name} onChange={(value) => setForm((v) => ({ ...v, full_name: value }))} className="form_input" />
                    </FormSearchLi>
                    <FormSearchLi title="権限">
                        <Select id={`role_${type}`} options={roles.data.role_list.map((item) => ({ label: item.name_jp, value: item.id }))} value={form.role} onChange={(e) => setForm((v) => ({ ...v, role: e.target.value }))} className="form_select transition_none" />
                    </FormSearchLi>
                    <FormSearchLi title="更新日時">
                        <InputDate fieldName="updated_at" btnFromClear={formClear[`updated_at_from_${type}`]} btnToClear={formClear[`updated_at_to_${type}`]} type={type} />
                    </FormSearchLi>
                </ul>
            </div>

            <Button type="submit" className="common_search_btn" style={{ padding: '0px' }} pending={{ action: pending, white: true }}>
                ログイン
            </Button>
        </form>
    )
}
