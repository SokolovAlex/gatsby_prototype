(function() {
    'use strict';
    angular.module('kappGlobal.customHtml')
        .component('customHtml', {
            'bindings':{
                'resource': '@'
            },
            'templateUrl':'/apps/kapp/modules/_shared/components/custom-html/templates/custom-html.html',
            'controller': 'customHtmlController'
        });
})();
