(function() {
    'use strict';
    angular.module('kappGlobal.siteBar')
        .component('siteBar', {
            'bindings': {
                'resource': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/site-bar/templates/site-bar.html',
            'controller': 'siteBarController'
        });
})();
