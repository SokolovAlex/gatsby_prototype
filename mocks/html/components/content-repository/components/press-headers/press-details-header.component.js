(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .component('pressDetailsHeader', {
            'bindings': {
                'summary': '@',
                'title': '@',
                'datePublicationStart': '@',
                'breadCrumbLink': '@',
                'breadCrumbTitle': '@',
                'contentName': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/content-repository/components/press-headers/templates/press-details-header.html',
            'controller': 'repoHeaderController'
        });
})();
