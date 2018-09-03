(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .component('pressCenter', {
            'templateUrl': '/apps/kapp/modules/_shared/components/content-repository/components/press-center/templates/press-center.html',
            'controller': 'sharedPressController',
            'bindings': {
                'filterSelectorDefault': '@',
                'pageSize': '@',
                'subcategory': '@'
            }
        });
})();
