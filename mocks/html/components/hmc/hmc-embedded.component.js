(function() {
    'use strict';
    angular.module('kappGlobal.hmc')
        .component('hmcEmbedded', {
            'bindings': {
                'resource': '@',
                'component': '@'
            },
            'controller': 'hmcController'
        });
})();
