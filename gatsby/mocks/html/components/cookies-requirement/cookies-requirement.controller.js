(function() {
    'use strict';
    angular.module('kappGlobal.cookiesRequirement')
        .controller('cookiesRequirementController', cookiesRequirementController);

    function cookiesRequirementController($window, cookieService, cookiesRequirementService) {
        let ctrl = this;
        ctrl.show = false;
        ctrl.$onInit = activate;
        ctrl.accept = acceptRequirements;

        function activate() {
            getData();
        }

        function getData() {
            ctrl.show = !cookieService.get('kl.c.p');
            if (!ctrl.show) return false;

            return cookiesRequirementService.getContent().then((response) => {
                ctrl.data = response;
                if (!ctrl.data.cookieDesc && !ctrl.data.cookieBtn) ctrl.show = false;
            });
        }

        function acceptRequirements() {
            let domain = $window.location.host.replace(/^(https?:\/\/)?(www)?/, '');
            ctrl.show = false;
            cookieService.set('kl.c.p', false, 30, domain);
        }
    }
})();
