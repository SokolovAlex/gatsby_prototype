(function() {
    'use strict';
    angular.module('kappGlobal.search')
        .component('search', {
            'bindings': {
                'resource': '@',
                'queryStringSearch': '<',
                'queryStringSection': '<'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/search/components/templates/search.component.html',
            'controller': 'searchController'
        });
})();
