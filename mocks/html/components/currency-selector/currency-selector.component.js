(function() {
    'use strict';
    angular.module('kappGlobal.currencySelector')
        .component('currencySelector', {
            'bindings': {
                'resource': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/currency-selector/templates/currency-selector.html',
            'controller': 'currencySelectorController'
        });
})();
