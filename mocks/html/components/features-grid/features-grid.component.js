(function() {
    angular.module('kappGlobal.featuresGrid')
        .component('featuresGrid', {
            'bindings': {
                'resource': '@',
                'addClass': '@'
            },
            'controller': 'featuresGridController',
            'templateUrl': '/apps/kapp/modules/_shared/components/features-grid/templates/features-grid.html'
        });
})();
