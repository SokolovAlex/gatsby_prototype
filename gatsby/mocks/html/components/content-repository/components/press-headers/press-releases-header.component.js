(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .component('pressReleasesHeader', {
            'bindings': {
                'breadCrumbLink': '@',
                'breadCrumbTitle': '@',
                'contentName': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/content-repository/components/press-headers/templates/press-center-header.html',
            'controller': 'repoHeaderController'
        });
})();
