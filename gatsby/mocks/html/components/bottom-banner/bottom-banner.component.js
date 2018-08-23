(function() {

    'use strict';
    angular.module('kappGlobal.bottomBanner')
        .component('bottomBanner', {
            'bindings': {
                'resource': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/bottom-banner/templates/bottom-banner.html',
            'controller': 'bottomBannerController'
        });
})();
