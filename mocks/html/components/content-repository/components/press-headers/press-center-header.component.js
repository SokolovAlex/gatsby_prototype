(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .component('pressCenterHeader', {
            'bindings': {
                'breadCrumbLink': '@',
                'breadCrumbTitle': '@',
                'contentName': '@',
                'template': '@'
            },
            'templateUrl': ['$element', '$attrs', function($element, $attrs) {
                let template = 'header';

                if ($attrs.template) template = $attrs.template;

                return `/apps/kapp/modules/_shared/components/content-repository/components/press-headers/templates/press-center-${template}.html`;
            }],
            'controller': 'repoHeaderController'
        });
})();
