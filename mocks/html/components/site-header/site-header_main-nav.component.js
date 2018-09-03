(function() {
    'use strict';
    angular.module('kappGlobal.siteHeader')
        .component('mainNav', {
            'bindings': {
                'resource': '@'
            },
            'require': {
                'siteHeader': '^siteHeader'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/site-header/templates/site-header_main-nav.html',
            'controller': 'mainNavController'
        });
})();
