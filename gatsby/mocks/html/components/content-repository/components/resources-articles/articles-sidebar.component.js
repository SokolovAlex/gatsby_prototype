(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .component('resourcesArticleSidebar', {
            'templateUrl': '/apps/kapp/modules/_shared/components/content-repository/components/resources-articles/templates/articles-sidebar.html',
            'controller': 'articleSidebarController',
            'bindings': {
                'category': '<',
                'repoType': '<'
            }
        });
})();
