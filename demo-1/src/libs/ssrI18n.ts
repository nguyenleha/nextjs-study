import i18next from 'i18next'
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

export async function getI18nSSR(locale: string) {
    const i18nInstance = i18next.createInstance()
    await i18nInstance.init({
        resources,
        lng: locale,
        fallbackLng: 'vi',
        interpolation: { escapeValue: false },
    })
    return i18nInstance
}
