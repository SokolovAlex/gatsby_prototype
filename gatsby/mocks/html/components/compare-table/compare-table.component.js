(function() {
    'use strict';
    angular.module('kappGlobal.compareTable')
        .component('compareTable', {
            'bindings': {
                'resource': '@',
                'hideProductLinks': '@',
                'component': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/compare-table/templates/compare-table.html',
            'controller': 'compareTableController'
        });
})();
