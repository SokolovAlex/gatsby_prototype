(function() {
    angular.module('kappGlobal.articlesSection')
        .component('articlesSection', {
            'bindings': {
                'resource': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/articles-section/templates/articles-section.html',
            'controller': 'articlesSectionController'
        });
})();
