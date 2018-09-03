(function() {

    'use strict';
    angular.module('kappGlobal.eula')
        .component('eula', {
            'bindings': {
                'resource': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/eula/templates/eula.html',
            'controller': 'eulaController'
        });
})();
