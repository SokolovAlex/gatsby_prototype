'use strict';
(function() {
    angular.module('kappGlobal.lrcSerial')
        .component('lrcSerial', {
            'bindings': {
                'lostDaysDisclaimerFullText': '=',
                'kfaDisclaimer': '=',
                'template': '@'
            },
            'controller': 'lrcSerialController',
            'templateUrl': ['$element', '$attrs', function($element, $attrs) {
                let template = 'lrc-serial';

                if ($attrs.template) template = $attrs.template;
                return `/apps/kapp/modules/_shared/components/lrc-serial/templates/${template}.html`;
            }]
        });
})();
