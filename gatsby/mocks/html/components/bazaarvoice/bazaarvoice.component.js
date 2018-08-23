(function() {
    'use strict';
    angular.module('kappGlobal.bazaarVoice')
        .component('bazaarvoice', {
            'bindings': {
                'productId': '@',
                'template': '@',
                'buttonText': '@'
            },
            'controller': 'bazaarVoiceController',
            'templateUrl': ['$element', '$attrs', function($element, $attrs) {
                let template = 'stars';

                if ($attrs.template) template = $attrs.template;

                return `/apps/kapp/modules/_shared/components/bazaarvoice/templates/bazaarvoice-${template}.html`;
            }]
        });
})();
