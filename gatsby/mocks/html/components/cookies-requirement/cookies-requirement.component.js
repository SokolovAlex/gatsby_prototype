(function() {
    'use strict';
    angular.module('kappGlobal.cookiesRequirement')
        .component('cookiesRequirement', {
            'bindings': {
                'show': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/cookies-requirement/templates/cookies-requirement.html',
            'controller': 'cookiesRequirementController'
        });
})();
