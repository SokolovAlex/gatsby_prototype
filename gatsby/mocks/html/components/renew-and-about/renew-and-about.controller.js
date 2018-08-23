(function() {
    'use strict';
    angular.module('kappGlobal.renewAndAbout')
        .controller('renewAndAboutController', renewAndAboutController);

    function renewAndAboutController(directiveData, errorService) {
        let ctrl = this;
        ctrl.$onInit = activate;

        function activate() {
            getData();
        }

        function getData() {
            return directiveData.getByUrl(ctrl.resource || 'renew-and-about').then(response => {
                ctrl.data = response.data.fields;
            }, (rejection) => {
                errorService.warn(rejection);
            });
        }
    }
})();
