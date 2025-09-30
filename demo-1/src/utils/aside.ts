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
