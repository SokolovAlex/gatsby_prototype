(function() {

    'use strict';
    angular.module('kappGlobal.doubleBanner')
        .component('doubleBanner', {
            'bindings': {
                'resource': '@',
                'template': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/double-banner/templates/double-banner.html',
            'controller': 'doubleBannerController'
        });
})();
