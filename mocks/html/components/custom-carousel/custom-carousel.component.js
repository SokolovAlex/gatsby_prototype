(function() {
    angular.module('kappGlobal.customCarousel')
        .component('customCarousel', {
            'bindings': {
                'resource': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/custom-carousel/templates/custom-carousel.html',
            'controller': 'customCarouselController'
        });
})();
