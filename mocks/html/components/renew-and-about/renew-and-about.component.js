(function() {
    angular.module('kappGlobal.renewAndAbout')
        .component('renewAndAbout', {
            'bindings': {
                'resource': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/renew-and-about/templates/renew-and-about.html',
            'controller': 'renewAndAboutController'
        });
})();
