(function() {
    angular.module('kappGlobal.accordion')
        .component('accordion', {
            'bindings': {
                'resource': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/accordion/templates/accordion.template.html',
            'controller': 'accordionController'
        });
})();
