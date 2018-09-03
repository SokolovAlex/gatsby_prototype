(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .component('resourcesCategory', {
            'controller': 'resourcesCategoryController',
            'bindings': {
                'repoType': '@',
                'category': '@',
                'template': '@'
            },
            'templateUrl': ['$element', '$attrs', function($element, $attrs) {
                let template = 'resources-category/templates/resources-category';
                if ($attrs.template) template = $attrs.template;
                return `/apps/kapp/modules/_shared/components/content-repository/components/${template}.html`;
            }]
        });
})();
