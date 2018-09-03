(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .component('pressArticlesBottombar', {
            'templateUrl': '/apps/kapp/modules/_shared/components/content-repository/components/press-articles/templates/press-articles-bottombar.html',
            'bindings': {
                'usePressDetailTemplate': '<',
                'relatedArticleCategory': '@'
            },
            'controller': 'pressArticlesBottombarController'
        });
})();
