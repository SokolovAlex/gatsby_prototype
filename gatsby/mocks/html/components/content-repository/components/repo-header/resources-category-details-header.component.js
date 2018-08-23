(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .component('resourcesCategoryDetailsHeader', {
            'bindings': {
                'pageDescription': '@',
                'contentName': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/content-repository/components/repo-header/templates/resources-category-details-header.html',
            'controller': 'repoHeaderController'
        });
})();
