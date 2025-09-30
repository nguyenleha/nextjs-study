'use client'

import Link from 'next/link'
import { clearToken } from '@/utils/ApiUtils'

export function Header() {
    return (
        <header>
            <div className="header_wrap">
                <div className="header_inner">
                    <div className="header_main">
                        <button id="HeaderBtn" type="button" className="header_menu_btn">
                            <span className="top"></span>
                            <span className="middle"></span>
                            <span className="bottom"></span>
                        </button>
                    </div>
                    <div className="header_center hidden-menu"></div>
                    <nav className="header_nav">
                        <ul className="header_list">
                            <li className="header_item">
                                <Link
                                    href={'/sign-in'}
                                    className="header_link"
                                    onClick={() => {
                                        clearToken()
                                    }}
                                >
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}
