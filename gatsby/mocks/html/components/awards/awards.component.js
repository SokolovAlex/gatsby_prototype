(function() {
    angular.module('kappGlobal.awardsSection')
        .component('awardsSection', {
            'bindings': {
                'resource': '@',
                'template': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/awards/templates/awards.html',
            'controller': 'awardsSectionController'
        });
})();
