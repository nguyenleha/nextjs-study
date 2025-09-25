// Wrapper cho các vendor JS functions
import { useEffect } from 'react'

export const useCommonJS = () => {
    useEffect(() => {
        // Inline common.js functionality
        const initCommonFeatures = () => {
            console.log('Common JS loaded')

            // Mobile menu toggle
            const mobileToggle = document.querySelector('.mobile-toggle')
            const mobileMenu = document.querySelector('.mobile-menu')

            if (mobileToggle && mobileMenu) {
                mobileToggle.addEventListener('click', function () {
                    mobileMenu.classList.toggle('active')
                })
            }

            // Smooth scroll
            document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault()
                    const href = anchor.getAttribute('href')
                    if (href) {
                        const target = document.querySelector(href)
                        if (target) {
                            target.scrollIntoView({
                                behavior: 'smooth',
                            })
                        }
                    }
                })
            })
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initCommonFeatures)
        } else {
            initCommonFeatures()
        }

        // Cleanup
        return () => {
            // Remove event listeners if needed
        }
    }, [])
}

export const loadExternalScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve()
            return
        }

        const script = document.createElement('script')
        script.src = src
        script.onload = () => resolve()
        script.onerror = reject
        document.head.appendChild(script)
    })
}
