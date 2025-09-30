import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState, useMemo, useRef } from 'react'
import { getQuery, scrollErr, validate } from '@/utils/Common'
import { ErrorsUser, FormCreate } from '@/types/userManagement'
import { Roles } from '@/types/system/auth'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setRolesRedux } from '@/store/slice/auth'
import { fetchRoles } from '@/api/system/privilege'
import { fetchUserCreate, fetchUserDetail, fetchUserUpdate } from '@/api/userManagement'
import { setQuery } from '@/store/slice/common'
import { FormDetailLi } from '@/components/shared/FormDetailLi'
import { TextInput } from '@/components/ui/TextInput'
import Image from 'next/image'
import pwdOnIcon from '@/assets/images/form/pwd_on_icon.svg'
import pwdOffIcon from '@/assets/images/form/pwd_off_icon.svg'
import { Loading } from '@/components/shared/Loading'
import { FormDetailBtn } from '@/components/shared/FormDetailBtn'

export type Props = {
    isCreate?: boolean
    slug?: string
}

export function UserFormInput({ isCreate, slug }: Props) {
    const t = useTranslations('user')
    const router = useRouter()
    const searchParams = useSearchParams()
    const queryObj = useMemo(() => getQuery(searchParams), [searchParams])
    const commonStore = useAppSelector((state) => state.common)
    const authStore = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    /**
     * =====================
     * Data
     * =====================
     */
    const [form, setForm] = useState<FormCreate>({
        full_name: 'test1',
        username: 'test1',
        password: 'pa123456',
        roles: [],
    })
    const prevForm = useRef(form)
    const [date, setDate] = useState<string>('')
    const [errMes, setErrMes] = useState<ErrorsUser>({})
    const [pending, setPending] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    /**
     * =====================
     * Handlers
     * =====================
     */
    const cancelBtn = () => {
        const query = commonStore.query
        return { path: '/admin/user', query }
    }

    const fetchApi = useCallback(async () => {
        try {
            if (authStore.roles.data.role_list.length === 0) {
                const rolesApi = await fetchRoles({
                    all: true,
                    orderBy: [{ column: 'id', direction: 'desc' }],
                    where: [{ id: [1, 4], inverse: true }],
                    with: ['get_pages'],
                })
                dispatch(setRolesRedux(rolesApi))
            }

            if (!isCreate) {
                await fetchUserDetail(String(slug))
                    .then((res) => {
                        const formData = {
                            ...form,
                            full_name: res.data.full_name,
                            username: res.data.username,
                            roles: res.data.roles.role_list.map((role) => role.id),
                        }
                        setForm(formData)
                        setDate(res.data.updated_at)
                    })
                    .catch(() => router.push('/admin/user'))
            }
            setLoading(false)
        } catch (error) {
            console.error(error)
        }
    }, [authStore])

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (validate(pending, errMes)) {
            setPending(true)

            try {
                const formCreate = JSON.parse(JSON.stringify(form))
                const formUpdate =
                    form.password !== ''
                        ? form
                        : {
                              full_name: form.full_name,
                              username: form.username,
                              roles: form.roles,
                          }

                if (isCreate) await fetchUserCreate(formCreate)
                else await fetchUserUpdate(String(slug), formUpdate)

                dispatch(setQuery({}))
                await router.push('/admin/user')
            } catch (error) {
                const errors = typeof error === 'object' && error && 'errors' in error ? (error as ErrorsUser).errors : {}
                setErrMes((prev) => ({ ...prev, ...errors }))
                scrollErr()
            }

            setPending(false)
        } else {
            scrollErr()
        }
    }

    useEffect(() => {
        const newVal = form
        const oldVal = prevForm.current
        const newErrMes = errMes

        Object.entries(newVal).forEach(([key, value]) => {
            if (value !== oldVal[key as keyof FormCreate]) {
                delete newErrMes[key]
                setErrMes((prev) => ({ ...prev, [key]: undefined }))
            }
        })

        prevForm.current = newVal
    }, [form])

    useEffect(() => {
        fetchApi()
    }, [])

    return (
        <>
            <h1 className="common_page_title">{isCreate ? t('create_title') : t('edit_title')}</h1>
            {loading ? (
                <Loading />
            ) : (
                <div className="detail-form_wrap">
                    <form onSubmit={submit}>
                        <ul className="detail-form_list">
                            <FormDetailLi title={t('login_id')} required errMes={errMes?.username}>
                                <TextInput type="text" value={form.username} onChange={(value) => setForm((v) => ({ ...v, username: value }))} className="form_input w300" />
                            </FormDetailLi>
                            <FormDetailLi title={t('user_name')} required errMes={errMes?.full_name}>
                                <TextInput type="text" value={form.full_name} onChange={(value) => setForm((v) => ({ ...v, full_name: value }))} className="form_input w300" />
                            </FormDetailLi>
                            <FormDetailLi title={t('password')} required={isCreate} errMes={errMes?.password}>
                                <div className="form_pwd_block">
                                    <TextInput type="password" value={form.password} onChange={(value) => setForm((v) => ({ ...v, password: value }))} className="form_input" />
                                    <button type="button" className="form_pwd_btn PwdBtn">
                                        <Image src={pwdOnIcon} alt="password on" className="active" />
                                        <Image src={pwdOffIcon} alt="password off" />
                                    </button>
                                </div>
                            </FormDetailLi>

                            <FormDetailLi title={t('role')}>
                                <ul className="form_checkbox_list">
                                    {authStore.roles.data.role_list.map((item, index) => (
                                        <li key={index} className="form_checkbox_item">
                                            <label className="form_checkbox_label">
                                                <input
                                                    type="checkbox"
                                                    checked={form.roles.includes(item.id)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setForm((v) => ({ ...v, roles: [...v.roles, item.id] }))
                                                        } else {
                                                            setForm((v) => ({ ...v, roles: v.roles.filter((id) => id !== item.id) }))
                                                        }
                                                    }}
                                                />
                                                <p className="form_checkbox_text">{item.name_jp}</p>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </FormDetailLi>

                            {date && (
                                <FormDetailLi title={t('updatedAt')}>
                                    <p className="common_text_s">{date}</p>
                                </FormDetailLi>
                            )}
                        </ul>
                        <FormDetailBtn pending={pending} cancelBtn={cancelBtn()} />
                    </form>
                </div>
            )}
        </>
    )
}
