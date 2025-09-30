import { AsideType } from '@/types/common'

// Nhận vào hàm t (i18n translate) để trả về aside config đa ngôn ngữ
export const useConfigAside = (t: (key: string) => string): AsideType[] => {
    return [
        {
            id: 3,
            name: t('aside.workApproval'),
            aside_btn: true,
            path: '',
            sub: [
                {
                    name: t('aside.workApproval'),
                    path: '/admin',
                    new_tab: false,
                },
            ],
        },
        {
            id: 5,
            name: t('aside.userManagement'),
            aside_btn: true,
            path: '',
            sub: [
                {
                    name: t('aside.userRegister'),
                    path: '/admin/user',
                    new_tab: false,
                },
            ],
        },
    ]
}
