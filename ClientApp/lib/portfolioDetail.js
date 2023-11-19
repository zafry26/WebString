//import GLightbox from 'glightbox';
import Swiper from 'swiper';
import { isNode } from "@Utils";
import { select, on } from "@WebCastUtils";
import AOS from 'aos';
import Isotope from 'isotope-layout';
import GLightbox from 'glightbox';

export function PortfolioIsotopeFilter() {
    if (isNode()) {
        return null;
    }
     /**
     * Porfolio isotope and filter
     */
    window.addEventListener('load', () => {
        let portfolioContainer = select('.portfolio-container');
        
        if (portfolioContainer) {
            let portfolioIsotope = new Isotope(portfolioContainer, {
                itemSelector: '.portfolio-item'
            });

            let portfolioFilters = select('#portfolio-flters li', true);

            //console.log(portfolioContainer)
            //console.log(portfolioIsotope)
            //console.log(portfolioFilters)

            on('click', '#portfolio-flters li', function(e) {
                e.preventDefault();
                portfolioFilters.forEach(function(el) {
                    el.classList.remove('filter-active');
                });
                this.classList.add('filter-active');

                portfolioIsotope.arrange({
                    filter: this.getAttribute('data-filter')
                });
                portfolioIsotope.on('arrangeComplete', function() {
                    AOS.refresh()
                });
            }, true);
        }

    });
}

export function GLightboxLoad() {
    if (isNode()) {
        return null;
    }

    /**
     * Initiate portfolio lightbox 
     */
    new GLightbox({
        selector: '.portfolio-lightbox'
    });

    /**
     * Initiate portfolio details lightbox 
     */
    new GLightbox({
        selector: '.portfolio-details-lightbox',
        width: '90%',
        height: '90vh'
    });
}

export function swiperLoad() {
    // /**
    //  * Portfolio details slider
    //  */
    // new Swiper('.portfolio-details-slider', {
    //     speed: 400,
    //     loop: true,
    //     autoplay: {
    //     delay: 5000,
    //     disableOnInteraction: false
    //     },
    //     pagination: {
    //     el: '.swiper-pagination',
    //     type: 'bullets',
    //     clickable: true
    //     }
    // });

    //     /**
    //  * Testimonials slider
    //  */
    // new Swiper('.testimonials-slider', {
    //     speed: 600,
    //     loop: true,
    //     autoplay: {
    //     delay: 5000,
    //     disableOnInteraction: false
    //     },
    //     slidesPerView: 'auto',
    //     pagination: {
    //     el: '.swiper-pagination',
    //     type: 'bullets',
    //     clickable: true
    //     }
    // });
}