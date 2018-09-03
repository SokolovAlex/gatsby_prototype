(function() {
    angular.module('kappGlobal.footerGlobal')
        .component('footerGlobal', {
            'templateUrl': '/apps/kapp/modules/_shared/components/site-footer/templates/site-footer.html',
            'controller': 'footerGlobalController',
            'bindings': {
                'size': '@'
            }
        });
})();
