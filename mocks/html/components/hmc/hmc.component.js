(function() {
    'use strict';
    angular.module('kappGlobal.hmc')
        .component('helpMeChoose', {
            'bindings': {
                'resource': '@'
            },
            'controller': 'hmcController'
        });
})();
