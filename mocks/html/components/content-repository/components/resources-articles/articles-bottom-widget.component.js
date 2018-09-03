(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .component('articlesBottomWidget', {
            'templateUrl': '/apps/kapp/modules/_shared/components/content-repository/components/resources-articles/templates/articles-bottom-widget.html',
            'controller': 'articlesBottomWidgetController',
            'bindings': {
                'repoType': '@'
            }
        });
})();
