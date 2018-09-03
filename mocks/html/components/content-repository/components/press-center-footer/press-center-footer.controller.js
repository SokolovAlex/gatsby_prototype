(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .controller('pressCenterFooterController', pressCenterFooterController);
    function pressCenterFooterController(directiveData, errorService) {
        let ctrl = this;
        ctrl.data = {};
        ctrl.$onInit = activate;

        function activate() {
            getData();
        }

        function getData() {
            return directiveData.getByUrl(ctrl.resource || 'press-center-footer').then(response => {
                ctrl.data = response.data.fields;
            }, (rejection) => {
                errorService.warn(rejection);
            });
        }
    }
})();
