(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .component('pressReleases', {
            'bindings': {
                'subcategory': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/content-repository/components/press-releases/templates/press-releases.html',
            'controller': 'sharedPressController'
        });
})();
