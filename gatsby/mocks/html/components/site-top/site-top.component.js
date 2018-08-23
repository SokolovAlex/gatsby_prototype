(function() {

    'use strict';
    angular.module('kappGlobal.siteTop', [])
        .component('siteTop', {
            'bindings': {
                'resource': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/site-top/templates/site-top.html',
            'controller': 'siteTopController'
        });
})();
