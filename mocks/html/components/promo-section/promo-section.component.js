(function() {
    'use strict';
    angular.module('kappGlobal.promoSection')
        .component('promoSection', {
            'bindings': {
                'resource': '@',
                'template': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/promo-section/templates/promo-section.html',
            'controller': 'promoSectionController'
        });
})();
