(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .component('pressReleasesHp', {
            'bindings': {
                'subcategory': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/content-repository/components/press-releases/templates/press-releases-hp.html',
            'controller': 'sharedPressController'
        });
})();
