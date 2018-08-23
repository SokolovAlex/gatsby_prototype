(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .component('newsDetails', {
            'templateUrl': '/apps/kapp/modules/_shared/components/content-repository/components/news/templates/news-details.html',
            'controller': 'sharedPressDetailsController'
        });
})();
