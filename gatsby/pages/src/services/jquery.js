import * as $ from 'jquery';

const slideCountrySelector = (selector) => {
    const el = $('.footer-selector');

    if (el.length === 0) {
        return;
    }

    el.slideToggle(500);

    $('html, body').animate({
        'scrollTop': el.offset().top - 20
    }, 700);
};

export { slideCountrySelector };