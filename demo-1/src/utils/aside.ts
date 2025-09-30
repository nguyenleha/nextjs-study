import { AsideType } from '@/types/common'

export const useConfigAside = (): AsideType[] => {
    return [
        {
            id: 3,
            name: '作業承認',
            aside_btn: true,
            path: '',
            sub: [
                {
                    name: '作業承認',
                    path: '/admin',
                    new_tab: false,
                },
            ],
        },
        {
            id: 4,
            name: 'マスタ',
            aside_btn: true,
            path: '',
            sub: [
                {
                    name: '排出事業場',
                    path: '/admin',
                    new_tab: false,
                },
                {
                    name: '作業内容',
                    path: '/admin',
                    new_tab: false,
                },
                {
                    name: '配車',
                    path: '/admin',
                    new_tab: false,
                },
                {
                    name: '作業員',
                    path: '/admin',
                    new_tab: false,
                },
                {
                    name: '車両',
                    path: '/admin',
                    new_tab: false,
                },
                {
                    name: '配車表',
                    path: '/admin',
                    new_tab: false,
                },
            ],
        },
        {
            id: 5,
            name: 'ユーザ管理',
            aside_btn: true,
            path: '',
            sub: [
                {
                    name: 'ユーザ登録',
                    path: '/admin/user',
                    new_tab: false,
                },
            ],
        },
    ]
}
