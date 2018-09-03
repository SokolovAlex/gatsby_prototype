'use strict';
(function() {
    angular.module('kappGlobal.lrcDisclaimers')
        .component('lrcDisclaimers', {
            'bindings': {
                'disclaimer': '='
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/lrc-disclaimers/templates/lrc-disclaimers.html',
            'controller': 'lrcDisclaimersController'
        });
})();
