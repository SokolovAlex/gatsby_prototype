(function() {
    'use strict';
    angular.module('kappGlobal.productScriptsInjector')
        .component('productScriptsInjector', {
            'bindings': {
                'productData': '@',
                'min': '@',
                'max': '@',
                'priceValue': '@',
                'cutPrice': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/product-scripts-injector/templates/product-scripts-injector.html',
            'controller': 'productScriptsInjectorController'
        });
})();
