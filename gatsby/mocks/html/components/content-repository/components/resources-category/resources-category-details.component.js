(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .component('resourcesCategoryDetails', {
            'bindings': {
                'details': '<',
                'repoType': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/content-repository/components/resources-category/templates/resources-category-details.html',
            'controller': 'resourcesCategoryDetailsController'
        });
})();
