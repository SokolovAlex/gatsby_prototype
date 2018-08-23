(function() {
    'use strict';
    angular.module('kappGlobal.hmc')
        .component('hmcHomepage', {
            'bindings': {
                'resource': '@',
                'component': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/hmc/templates/hmc-homepage.html',
            'controller': 'hmcController'
        });
})();
