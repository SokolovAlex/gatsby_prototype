(function() {
    'use strict';
    angular.module('kappGlobal.hmc')
        .component('hmcHomeSecurity', {
            'bindings': {
                'resource': '@',
                'component': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/hmc/templates/hmc-b2c-homepage.html',
            'controller': 'hmcController'
        });
})();
