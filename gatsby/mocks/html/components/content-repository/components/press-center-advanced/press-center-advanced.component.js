(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .component('pressCenterAdvanced', {
            'bindings': {
                'template': '@',
                'resource': '@'
            },
            'templateUrl': ['$element', '$attrs', function($element, $attrs) {
                let template = 'horizontal-list';

                if ($attrs.template) template = $attrs.template;

                return `/apps/kapp/modules/_shared/components/content-repository/components/press-center-advanced/templates/press-center-${template}.html`;
            }],
            'controller': 'pressCenterAdvancedController'
        });
})();
