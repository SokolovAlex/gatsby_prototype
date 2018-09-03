(function() {
    'use strict';
    angular.module('kappGlobal.newsLetterOptIn')
        .component('newsLetterOptIn', {
            'bindings': {
                'resource': '@',
                'onDataLoaded': '&'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/news-letter-opt-in/templates/news-letter-opt-in.html',
            'controller': 'newsLetterOptInController'
        });
})();
