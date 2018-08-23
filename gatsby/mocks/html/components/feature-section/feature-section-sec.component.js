(function() {
    angular.module('kappGlobal.featureSection')
        .component('featureSectionSec', {
            'templateUrl':'/apps/kapp/modules/_shared/components/feature-section/templates/feature-section-sec.html',
            'controller': 'featureSectionSecController',
            'bindings': {
                'resource': '@'
            }
        });
})();
