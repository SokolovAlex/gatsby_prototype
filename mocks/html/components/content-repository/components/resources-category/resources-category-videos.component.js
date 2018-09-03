(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .component('resourcesCategoryVideos', {
            'templateUrl': '/apps/kapp/modules/_shared/components/content-repository/components/resources-category/templates/resources-category-videos.html',
            'controller': 'resourcesCategoryVideoController',
            'bindings': {
                'category': '@'
            }
        });
})();
