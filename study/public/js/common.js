// Common utility functions
function initCommonFeatures() {
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
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()
            const target = document.querySelector(this.getAttribute('href'))
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                })
            }
        })
    })

    // Back to top button
    const backToTop = document.querySelector('.back-to-top')
    if (backToTop) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                backToTop.style.display = 'block'
            } else {
                backToTop.style.display = 'none'
            }
        })
    }
}

// Auto initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCommonFeatures)
} else {
    initCommonFeatures()
}
