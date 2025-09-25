// Slick slider configuration
function initSlickSlider() {
    if (typeof $ !== 'undefined' && $.fn.slick) {
        // Main banner slider
        $('.banner-slider').slick({
            dots: true,
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: 'linear',
            autoplay: true,
            autoplaySpeed: 3000,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        dots: true,
                    },
                },
            ],
        })

        // Product carousel
        $('.product-carousel').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                    },
                },
            ],
        })

        // Testimonial slider
        $('.testimonial-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.testimonial-nav',
        })

        $('.testimonial-nav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.testimonial-slider',
            dots: false,
            centerMode: true,
            focusOnSelect: true,
        })
    }
}

// Initialize slick when DOM and jQuery are ready
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            setTimeout(initSlickSlider, 100) // Small delay to ensure jQuery is loaded
        })
    } else {
        setTimeout(initSlickSlider, 100)
    }
}
