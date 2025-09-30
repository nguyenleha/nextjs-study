'use client'

import Link from 'next/link'
// import $ from 'jquery'
import { AsideType } from '@/types/common'
import { useConfigAside } from '@/utils/Aside'
import { usePathname } from 'next/navigation'

export function AsideMenu() {
    const asideBtn = (asideItem: AsideType) => {
        if (asideItem.aside_btn) {
            const id = `#asideBtn_${asideItem.id}`
            $(id).toggleClass('active').next().stop().slideToggle()
        }
    }

    const pathname = usePathname()
    const active = (path: string) => {
        return path === String(pathname) || String(pathname).includes(`${path}/`)
    }

    return (
        <aside id="AsideMenu" className="layout_aside">
            <ul className="aside_list">
                <li className="aside_item">
                    <Link href={'/'} className="aside_link">
                        ダッシュボード
                    </Link>
                </li>
                {useConfigAside().map((asideItem) => (
                    <li key={asideItem.id} className="aside_item">
                        {asideItem.aside_btn ? (
                            <>
                                <p id={`asideBtn_${asideItem.id}`} className="aside_list_btn" onClick={() => asideBtn(asideItem)}>
                                    {asideItem.name}
                                </p>
                                {asideItem.sub && asideItem.sub.length > 0 && (
                                    <ul className="aside_sublist">
                                        {asideItem.sub.map((subItem, subIndex) => (
                                            <li key={subIndex} className="aside_subitem relative">
                                                <Link href={subItem.path} className={`aside_sublink${active(subItem.path) ? ' active' : ''}`} {...(subItem.new_tab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                                                    {subItem.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        ) : (
                            <Link href={asideItem.path} className="aside_link">
                                {asideItem.name}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </aside>
    )
}
