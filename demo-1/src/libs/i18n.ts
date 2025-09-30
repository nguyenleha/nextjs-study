import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Cookies from 'js-cookie'
import vi from '../lang/vi.json'
import ja from '../lang/ja.json'
import userVi from '../lang/user/vi.json'
import userJa from '../lang/user/ja.json'
import loginVi from '../lang/login/vi.json'
import loginJa from '../lang/login/ja.json'

const resources = {
    vi: {
        translation: vi,
        user: userVi,
        login: loginVi,
    },
    ja: {
        translation: ja,
        user: userJa,
        login: loginJa,
    },
}

const getInitialLanguage = () => {
    const cookieLang = Cookies.get('locale')
    return cookieLang
    // if (typeof window !== 'undefined') {
    //     if (cookieLang) return cookieLang
    //     if (navigator.language.startsWith('ja')) return 'ja'
    //     return 'vi'
    // }
    // return 'vi'
}

i18n.use(initReactI18next).init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'vi',
    interpolation: {
        escapeValue: false,
    },
})

// Đồng bộ cookie khi đổi ngôn ngữ
i18n.on('languageChanged', (lng) => {
    // if (typeof window !== 'undefined') {
    //     Cookies.set('locale', lng, { expires: 365 })
    // }
})

export default i18n
