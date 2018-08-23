(function() {
    'use strict';
    angular.module('kappGlobal.siteHeader')
        .component('siteHeader', {
            'bindings': {
                'resource': '@',
                'hideDesktopMenu': '@',
                'showCurrencySelector': '@',
                'hideMainNav': '<'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/site-header/templates/site-header.html',
            'controller': 'siteHeaderController'
        });
})();
