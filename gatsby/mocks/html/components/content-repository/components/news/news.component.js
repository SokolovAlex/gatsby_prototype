(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .component('news', {
            'bindings': {
                'subcategory': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/content-repository/components/news/templates/news.html',
            'controller': 'sharedPressController'
        });
})();
