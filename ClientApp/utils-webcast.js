import * as Typed from 'typed.js';
import AOS from 'aos';
import { isNode, showApplicationLoader, hideApplicationLoader} from "@Utils";

/**
* Template Name: MyResume - v4.8.0
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

/**
 * Easy selector helper function
 */
export const select = (el, all = false) => {
    el = el.trim()
    if (all) {
        return [...document.querySelectorAll(el)]
    } else {
        return document.querySelector(el)
    }
}

/**
 * Easy event listener function
 */
export const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
        if (all) {
            selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
            selectEl.addEventListener(type, listener)
        }
    }
}

/**
 * Easy on scroll event listener 
 */
const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
}

/**
 * Scrolls to an element with header offset
 */
const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
        top: elementPos,
        behavior: 'smooth'
    })
}

export function scrolltoTopClick() {
    window.scrollTo({
        top: 0, 
        behavior: 'smooth'
    });
}

/**
* Hide main application loader.
* */
export function hideStandOutLoader() {
    /**
    * Preloader
    */
    let preloader = select('#preloader');
        if (preloader) {
            window.addEventListener('load', () => {
            preloader.remove()
        });
    }
}

 /**
* Navbar links active state on scroll
*/
export function navbarlinksActive() {
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
            navbarlink.classList.add('active')
            } else {
            navbarlink.classList.remove('active')
            }
        })
    }

    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)
}

/**
 * Hero type effect
 */
export function hero(typed, el, values) {
    if (isNode()) {
        return null;
    }

    const typed_strings = values.split(',')
    
    const options = {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    };

    // elRef refers to the <span> rendered below
    typed.current = new Typed(el.current, options);
      
    return () => {
      // Make sure to destroy Typed instance during cleanup
      // to prevent memory leaks
      typed.current.destroy();
    }
}

/**
 * Animation on scroll
 */
export function aosInit() {
    window.addEventListener('load', () => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        })
    });
}

/**
 * Back to top button
 */
export function buttonBackToTop() {
    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }
}

 /**
 * Scroll with ofset on links with a class name .scrollto
 */
export function onScrollTo() {
    on('click', '.scrollto', function(e) {
        if (select(this.hash)) {
            e.preventDefault()

            let body = select('body')
            if (body.classList.contains('mobile-nav-active')) {
                body.classList.remove('mobile-nav-active')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }
            scrollto(this.hash)
        }
    }, true)
}

/**
 * Skills animation
 */
export function skillAnimation() {
    let skilsContent = select('.skills-content');
        if (skilsContent) {
        new Waypoint({
            element: skilsContent,
            offset: '80%',
            handler: function(direction) {
            let progress = select('.progress .progress-bar', true);
            progress.forEach((el) => {
                el.style.width = el.getAttribute('aria-valuenow') + '%'
            });
            }
        })
    }
}

/**
 * Mobile nav toggle
 */
export function mobileToggle() {
    on('click', '.mobile-nav-toggle', function(e) {
        let body = select('body');
        body.classList.toggle('.mobile-nav-active');
        //this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })
}

/**
 * Scroll with ofset on page load with hash links in the url
 */
export function onPageLoad() {
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }   
        }
    });
}

export function webCast()
{
    let current_fs, next_fs, previous_fs; //form
    let opacity;

    const steps = select('form', true).length - 1;
    
    const allProgress = select("#progressbar li", true);
    const progressActive = select("#progressbar li.active", true);
    const progressActiveLast = progressActive.slice(-1).pop();

    const allForm = select('form', true);

    const next = select('.next', true);
    const previous = select('.previous', true);
    const submit = select('.submit');

    const currentProgressActiveIndex = [].indexOf.call(allProgress, progressActiveLast);

    if(currentProgressActiveIndex >= 0)
    {
        //Add Class Active
        const liElement = select("#progressbar li", true)[currentProgressActiveIndex]
        liElement.nextSibling.classList.add("active");

        //Get current form index
        const currentFormElement = allForm[currentProgressActiveIndex];
        const nextFormElement = currentFormElement.nextSibling;

         //show the next fieldset
         nextFormElement.style.display = 'block';
         //hide the current fieldset with style
         currentFormElement.style.display = 'none';
    }

    let current = 1;
    current = currentProgressActiveIndex
    setProgressBar(++current);

    previous.forEach(el => el.addEventListener('click', event => {
        current_fs = el.parentElement;
        previous_fs = el.parentElement.previousElementSibling;
        
         //Get all form with index
         const allFs = select("form", true);

         //Get current form index
         const currentActiveIndex = [].indexOf.call(allFs, current_fs);

         //Add Class Active
         const liElement = select("#progressbar li", true)[currentActiveIndex]

         liElement.classList.remove("active");
        
        //show the previous fieldset
        // previous_fs.show();

         //show the next fieldset
         previous_fs.style.display = 'block';
         //hide the current fieldset with style
         current_fs.style.display = 'none';

        // //hide the current fieldset with style
        // current_fs.animate({opacity: 0}, {
        //     step: function(now) {
        //         // for making fielset appear animation
        //         opacity = 1 - now;

        //         current_fs.css({
        //             'display': 'none',
        //             'position': 'relative'
        //         });
        //         previous_fs.css({'opacity': opacity});
        //     }, 
        //     duration: 500
        // });
        setProgressBar(--current);
    }));

    function setProgressBar(curStep){
        var percent = parseFloat(100 / steps) * curStep;
        percent = percent.toFixed();
        const progressBar = select('.progress-bar')
        progressBar.style.cssText += 'width:' + percent + '%'
    }

    previous.forEach(el => el.addEventListener('click', event => {
        return false;
    }));
}