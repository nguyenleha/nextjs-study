import { cookies } from 'next/headers'
import { getI18nSSR } from '@/libs/ssrI18n'

export default async function LoginPage() {
    const cookieStore = await cookies()
    const locale = cookieStore.get('locale')?.value || 'vi'
    const i18n = await getI18nSSR(locale)

    // Chỉ demo dịch SSR, phần form và logic đăng nhập bạn có thể chuyển lại vào client component nếu muốn
    const LANGS = [
        { code: 'vi', label: 'Tiếng Việt' },
        { code: 'ja', label: '日本語' },
    ]

    return (
        <div style={{ padding: 32 }}>
            <h1>{i18n.t('hello')}</h1>
            <label>
                {i18n.t('language')}:
                <select defaultValue={locale} disabled style={{ marginLeft: 8 }}>
                    {LANGS.map((l) => (
                        <option key={l.code} value={l.code}>
                            {l.label}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    )
}
