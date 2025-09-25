'use client'

import Script from 'next/script'
import Image from 'next/image'
import { useEffect } from 'react'

// Declare window extensions
declare global {
    interface Window {
        initCommonFeatures?: () => void
        initSlickSlider?: () => void
        jQuery?: unknown
    }
}

export default function ScriptDemo() {
    useEffect(() => {
        // Re-initialize scripts khi component mount
        if (typeof window !== 'undefined') {
            // Call common functions if they exist
            if (window.initCommonFeatures) {
                window.initCommonFeatures()
            }
        }
    }, [])

    return (
        <>
            {/* Load custom JS files */}
            <Script
                src="/js/common.js"
                strategy="afterInteractive"
                onLoad={() => {
                    console.log('Common JS loaded successfully')
                }}
            />

            <Script
                src="/js/slick-config.js"
                strategy="afterInteractive"
                onLoad={() => {
                    console.log('Slick config loaded successfully')
                }}
            />

            <div className="page-content">
                {/* Banner slider */}
                <div className="banner-slider">
                    <div>
                        <Image src="/next.svg" alt="Banner 1" width={400} height={200} />
                    </div>
                    <div>
                        <Image src="/vercel.svg" alt="Banner 2" width={400} height={200} />
                    </div>
                    <div>
                        <Image src="/next.svg" alt="Banner 3" width={400} height={200} />
                    </div>
                </div>

                {/* Product carousel */}
                <div className="product-carousel">
                    <div className="product-item">Product 1</div>
                    <div className="product-item">Product 2</div>
                    <div className="product-item">Product 3</div>
                    <div className="product-item">Product 4</div>
                </div>
            </div>
        </>
    )
}
