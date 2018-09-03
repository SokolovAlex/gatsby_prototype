(function() {
    'use strict';
    angular.module('kappGlobal.premiumServices')
        .component('premiumServices', {
            'bindings': {
                'resource': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/premium-services/premium-services.template.html',
            'controller': 'premiumServicesController'
        });
})();
