'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Cookies from 'js-cookie'

const LANGS = [
    { code: 'vi', label: 'Tiếng Việt' },
    { code: 'ja', label: '日本語' },
]

export default function Admin() {
    const { t, i18n } = useTranslation()
    const [lang, setLang] = useState(i18n.language || 'vi')

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLang = e.target.value
        setLang(newLang)
        i18n.changeLanguage(newLang)
        Cookies.set('locale', newLang, { expires: 365 })
    }
    return (
        <div style={{ padding: 32 }}>
            <h1>{t('hello')}</h1>
            <label>
                {t('language')}:
                <select value={lang} onChange={handleChange} style={{ marginLeft: 8 }}>
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
