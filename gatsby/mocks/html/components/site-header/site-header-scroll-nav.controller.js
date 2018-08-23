(function() {
    'use strict';
    angular.module('kappGlobal.siteHeader')
        .controller('siteHeaderScrollNavController', siteHeaderScrollNavController);

    function siteHeaderScrollNavController(errorService) {
        let ctrl = this;
        ctrl.animatedScrollTo = animatedScrollTo;

        function animatedScrollTo(id, $event) {
            $event.preventDefault();
            $event.stopPropagation();

            let target = $('#' + id);
            let offset = $('.site-header').outerHeight(true);

            if (!target.length) return errorService.warn(`Couldn't find [${id}] on the page`);

            $('html, body').animate({
                'scrollTop': target.offset().top - offset
            }, 500);
        }
    }
})();
