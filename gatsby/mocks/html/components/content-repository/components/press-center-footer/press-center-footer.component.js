(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .component('pressCenterFooter', {
            'bindings': {
                'resource': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/content-repository/components/press-center-footer/templates/press-center-footer.html',
            'controller': 'pressCenterFooterController'
        });
})();
