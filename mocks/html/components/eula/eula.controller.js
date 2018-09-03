(function() {
    'use strict';
    angular.module('kappGlobal.eula')
        .controller('eulaController', eulaController);

    function eulaController(directiveData, errorService) {
        let ctrl = this;

        ctrl.$onInit = activate;

        function activate() {
            getData();
        }

        function getData() {
            return directiveData.getByUrl(ctrl.resource || 'eula').then(response => {
                ctrl.data = response.data.fields;
            }, handleRejection);
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }
    }
})();
