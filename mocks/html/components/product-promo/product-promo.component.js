(function() {

    'use strict';
    angular.module('kappGlobal.productPromo')
        .component('productPromo', {
            'bindings': {
                'resource': '@',
                'template': '@',
                'headerTitle': '<'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/product-promo/templates/product-promo.html',
            'controller': 'productPromoController'
        });
})();
