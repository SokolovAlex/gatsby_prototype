(function() {
    'use strict';
    angular.module('kappGlobal.hmcUniversal')
        .component('hmcUniversalView', {
            'bindings': {
                'resource': '@',
                'hmcType': '@'
            },
            'controller': 'hmcUniversalViewController',
            'templateUrl': ['$element', '$attrs', function($element, $attrs) {
                let hmcType = $attrs.hmcType || 'smb';

                return `/apps/kapp/modules/_shared/components/hmc-universal/templates/${hmcType}/init.html`;
            }]
        });
})();
