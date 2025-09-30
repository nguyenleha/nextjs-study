'use client'

import { FormSearch, JoinOrderBy, OrderBy, Query, WhereCondition } from '@/types/common'
// import { Roles } from '@/types/system/auth'
import { User } from '@/types/userManagement'
import { useCallback, useEffect, useState, useMemo, useRef } from 'react'
// import $ from 'jquery'
import { useRouter, useSearchParams } from 'next/navigation'
import { getQuery, routeQuery } from '@/utils/Common'
import { AppConfig } from '@/utils/AppConfig'
import { fetchUser } from '@/api/userManagement'
import { Loading } from '@/components/shared/Loading'
import Link from 'next/link'
import { Pagination } from '@/components/shared/Pagination'
import { TableTh } from '@/components/ui/TableTh'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setQuery } from '@/store/slice/common'
import { UserSearch } from '@/components/layout/user/Search'
import { fetchRoles } from '@/api/system/privilege'
import { setRolesRedux } from '@/store/slice/auth'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'
import closeIcon from '@/assets/images/common/close_icon.svg'

export default function UserListPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const queryObj = useMemo(() => getQuery(searchParams), [searchParams])
    const authStore = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    /**
     * =====================
     * Data
     * =====================
     */
    const [currentPage, setCurrentPage] = useState<number>(Number(new URLSearchParams(window.location.search).get('currentPage')) || 1)
    const [totalArticle, setTotalArticle] = useState<number>(1)
    const [user, setUser] = useState<User>({ data: [] })
    // const [roles, setRoles] = useState<Roles>({ data: { count: 0, role_list: [] } })
    const [pending, setPending] = useState<boolean>(false)
    const [pendingSort, setPendingSort] = useState<boolean>(true)
    const [pendingAll, setPendingAll] = useState<boolean>(true)
    const [formSearch, setFormSearch] = useState<FormSearch>({})
    const [keySort, setKeySort] = useState<Record<string, string>>({})

    /**
     * =====================
     * Handlers
     * =====================
     */
    const SearchBtnSP = () => $('#SearchWrap').fadeIn()
    const SearchCloseBtnSP = () => $('#SearchWrap').fadeOut()

    // Search
    const orderByRouteHandle = useCallback(
        (setNullOrderBy: boolean = false) => {
            let orderBy: OrderBy[] = []
            const joinOrderBy: JoinOrderBy = {}

            if (!setNullOrderBy) {
                Object.entries(queryObj).forEach(([keyForm, valueForm]) => {
                    if (!valueForm || !keyForm.includes('_sort')) return

                    // Use a local copy to avoid mutating state directly
                    const newKeySort = { ...keySort }
                    if (!newKeySort[keyForm]) {
                        newKeySort[keyForm] = ''
                    }
                    Object.keys(newKeySort).forEach((key) => {
                        if (key !== keyForm) {
                            newKeySort[key] = ''
                            return
                        }

                        newKeySort[key] = String(valueForm)
                        const keyColumn = key.slice(0, key.length - 5)

                        orderBy =
                            key !== 'roles_sort'
                                ? [
                                      { column: keyColumn, direction: newKeySort[key] },
                                      { column: 'id', direction: 'desc' },
                                  ]
                                : [{ column: 'id', direction: 'desc' }]

                        if (key === 'roles_sort') {
                            joinOrderBy[key] = {
                                orderBy: [{ column: 'name_jp', direction: newKeySort[key] }],
                                relationship: 'roles',
                            }
                        }
                    })
                    // Update state only if changed
                    if (JSON.stringify(newKeySort) !== JSON.stringify(keySort)) {
                        setKeySort(newKeySort)
                    }
                })
            }
            return { orderBy, joinOrderBy }
        },
        [queryObj, keySort],
    )

    const where = useCallback((value: Query) => {
        const excludedKeys = ['from', 'to', '_sort', 'currentPage', 'role']

        const where: WhereCondition[] = Object.entries(value).reduce((acc: WhereCondition[], [key, val]) => {
            if (val !== undefined && !excludedKeys.some((excludedKey) => key.includes(excludedKey))) {
                acc.push({ [key]: typeof val === 'number' ? String(val) : val })
            }
            return acc
        }, [])

        const from = String(value.updated_at_from || '')
        const to = String(value.updated_at_to || '')
        if (from || to) {
            where.push({
                updated_at: from && to ? { from, to } : from ? { greaterThanOrEqualTo: from } : { lessThanOrEqualTo: to },
            })
        }
        return where
    }, [])

    const join = useCallback((value: Query) => {
        let join = {}
        if (value.role && value.role !== -1) {
            join = Object({
                ...join,
                roles: {
                    where: [
                        {
                            'roles.id': value.role,
                            strict: AppConfig.STRICT.AND,
                        },
                    ],
                    relationship: 'roles',
                },
            })
        }

        return join
    }, [])

    const fetchApi = useCallback(
        async (page: number = 1, join: object = {}, where: Array<object> = [], orderByJoin: object = {}, orderBy: OrderBy[] = [{ column: 'id', direction: 'desc' }], setNullOrderBy: boolean = false) => {
            try {
                const orderByRouteValue = orderByRouteHandle(setNullOrderBy)

                const userApi = await fetchUser({
                    join,
                    where,
                    with: ['roles'],
                    page,
                    perPage: AppConfig.USER_MANAGEMENT_PER_PAGE,
                    orderByJoin: !setNullOrderBy ? orderByRouteValue.joinOrderBy : orderByJoin,
                    orderBy: !setNullOrderBy ? orderByRouteValue.orderBy : orderBy,
                })

                if (authStore.roles.data.role_list.length === 0) {
                    const rolesApi = await fetchRoles({
                        all: true,
                        orderBy: [{ column: 'id', direction: 'desc' }],
                        where: [{ id: [1, 4], inverse: true }],
                        with: ['get_pages'],
                    })
                    dispatch(setRolesRedux(rolesApi))
                }
                return userApi
            } catch (error) {
                console.error(error)
                return { data: [] }
            }
        },
        [orderByRouteHandle],
    )

    const changePage = async (page: number) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
        // setPending(true)
        setPendingSort(true)

        setCurrentPage(page)
        fetchApi(page, join(queryObj), where(queryObj))
            .then((res) => {
                setUser(res)
                setTotalArticle(res.meta?.last_page || 1)
            })
            .finally(() => {
                setPending(false)
                setPendingSort(false)
            })
    }

    const search = (form: FormSearch) => {
        if (!pending) {
            setPending(true)
            setFormSearch(form)
            setCurrentPage(1)
            setKeySort({})
            const setNullOrderBy = true

            fetchApi(1, join(form), where(form), {}, [{ column: 'id', direction: 'desc' }], setNullOrderBy)
                .then((res) => {
                    setUser(res)
                    setTotalArticle(res.meta?.last_page || 1)
                })
                .finally(() => {
                    setPending(false)
                    setPendingSort(false)
                    SearchCloseBtnSP()
                })
        }
    }

    const sort = (value?: string) => {
        if (!pendingSort && value) {
            const newKeySort = { ...keySort }
            if (!newKeySort[`${value}_sort`]) {
                newKeySort[`${value}_sort`] = ''
            }

            Object.entries(newKeySort).forEach(([key, item]) => {
                setCurrentPage(1)
                setPendingSort(true)
                const setNullOrderBy = true
                if (key !== `${value}_sort`) {
                    newKeySort[key] = ''
                    return
                }

                if (key === `${value}_sort`) {
                    newKeySort[key] = item === 'desc' ? 'asc' : 'desc'
                    const setOrderBy: JoinOrderBy = {}
                    const keyColumn = key.slice(0, key.length - 5)

                    const orderBy =
                        key !== 'roles_sort'
                            ? keyColumn !== 'id'
                                ? [
                                      { column: keyColumn, direction: newKeySort[key] },
                                      { column: 'id', direction: 'desc' },
                                  ]
                                : [{ column: keyColumn, direction: newKeySort[key] }]
                            : [{ column: 'id', direction: 'desc' }]

                    if (key === 'roles_sort') {
                        setOrderBy[key] = {
                            orderBy: [{ column: 'name_jp', direction: newKeySort[key] }],
                            relationship: 'roles',
                        }
                    }

                    setKeySort(newKeySort)
                    fetchApi(currentPage, join(queryObj), where(queryObj), setOrderBy, orderBy, setNullOrderBy)
                        .then((res) => {
                            setUser(res)
                            setTotalArticle(res.meta?.last_page || 1)
                        })
                        .finally(() => {
                            setPending(false)
                            setPendingSort(false)
                        })
                }
            })
        }
    }

    useEffect(() => {
        fetchApi(currentPage, join(queryObj), where(queryObj))
            .then((res) => {
                if (res?.data) {
                    setUser(res as User)
                    setTotalArticle(res.meta?.last_page || 1)
                }
            })
            .finally(() => {
                setPending(false)
                setPendingSort(false)
                setPendingAll(false)
            })
    }, [])

    const isFirstRenderPageAndSort = useRef(true)
    useEffect(() => {
        if (isFirstRenderPageAndSort.current) {
            isFirstRenderPageAndSort.current = false
            return
        }
        const { newQueryObj, querySearchParams } = routeQuery(queryObj, currentPage, formSearch, keySort)
        dispatch(setQuery(newQueryObj))
        router.push('/user' + (querySearchParams ? `?${querySearchParams}` : ''))
    }, [currentPage, keySort])

    const isFirstRenderFormSearch = useRef(true)
    useEffect(() => {
        if (isFirstRenderFormSearch.current) {
            isFirstRenderFormSearch.current = false
            return
        }
        const { newQueryObj, querySearchParams } = routeQuery({}, 1, formSearch, {})
        dispatch(setQuery(newQueryObj))
        router.push('/user' + (querySearchParams ? `?${querySearchParams}` : ''))
    }, [formSearch])

    return (
        <>
            <div className="common_page_title_block">
                <h1 className="common_page_title">ユーザ一覧</h1>
                <button className="common_search_btn" onClick={SearchBtnSP}>
                    <span>絞り込み検索</span>
                </button>
            </div>
            {pendingAll ? (
                <Loading style={{ height: '30px' }} />
            ) : (
                <>
                    <div className="common_pc">
                        <div className="common_search_wrap">
                            <UserSearch type="pc" roles={authStore.roles} pending={pending} search={search}></UserSearch>
                        </div>
                    </div>
                    <div className="page_btnarea">
                        <div className="page_btnarea_main">
                            <Link href="/user/create" className="common_highlight_btn w150">
                                ＋ 新規作成
                            </Link>
                        </div>
                        <div className="page_btnarea_sub"></div>
                    </div>
                    <p className="common_table_result">
                        全{!pending ? user.meta?.total || 0 : 0}件中
                        {!pending ? user.meta?.from || 0 : 0}-{!pending ? user.meta?.to || 0 : 0}件目
                    </p>
                    <div className="common_table_wrap relative">
                        {pendingSort && (
                            <div v-if="pendingSort" id="table_pending_custom" className="common_table_block table_pending_custom mt-40-custom">
                                <Loading className="animation_loading" />
                            </div>
                        )}

                        <div className="common_table_block">
                            <table className="common_table w800">
                                <thead>
                                    <tr>
                                        <TableTh title="ログインID" value="username" type={keySort.username_sort} onSort={sort} />
                                        <TableTh title="ユーザー名" value="full_name" type={keySort.full_name_sort} onSort={sort} />
                                        <TableTh title="権限" value="roles" type={keySort.roles_sort} onSort={sort} />
                                        <TableTh title="更新日時" value="updated_at" type={keySort.updated_at_sort} onSort={sort} />
                                        <TableTh title="操作" disableButton />
                                    </tr>
                                </thead>
                                <tbody>
                                    {pending ? (
                                        <tr>
                                            <td colSpan={5}>
                                                <Loading style={{ height: '30px' }} />
                                            </td>
                                        </tr>
                                    ) : user.data && user.data.length > 0 ? (
                                        user.data.map((item, index) => (
                                            <tr key={index}>
                                                <td className="common_table_info">{item.username}</td>
                                                <td className="common_table_info">{item.full_name}</td>
                                                <td className="common_table_info">{item.roles && item.roles.role_list && item.roles.role_list.length > 0 ? item.roles.role_list.map((role) => role.name_jp).join('、') : ''}</td>
                                                <td className="common_table_info">
                                                    <p className="nowrap">{item.updated_at}</p>
                                                </td>
                                                <td className="common_table_info">
                                                    <Link href={`/user/edit/${item.id}`} className="common_table-bland_btn w70">
                                                        編集
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} style={{ textAlign: 'center' }}>
                                                データがありません
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {totalArticle > 1 && <Pagination pending={pending} totalArticle={totalArticle} currentPage={currentPage} modelValue={changePage} />}
                </>
            )}

            <div className="common_sp">
                {!pendingAll && (
                    <div id="SearchWrap" className="common_search_wrap">
                        <Button className="common_search_close_btn" onClick={SearchCloseBtnSP}>
                            <Image src={closeIcon} alt="close" />
                        </Button>
                        <UserSearch type="sp" roles={authStore.roles} pending={pending} search={search}></UserSearch>
                    </div>
                )}
            </div>
        </>
    )
}
