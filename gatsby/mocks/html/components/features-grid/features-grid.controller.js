(function() {
    'use strict';
    angular.module('kappGlobal.featuresGrid')
        .controller('featuresGridController', featuresGridController);

    function featuresGridController(directiveData, ENV, errorService) {
        let ctrl = this;
        ctrl.env = ENV.locale;
        ctrl.$onInit = activate;

        function activate() {
            getData();
        }

        function getData() {

            if (ctrl.resource && ctrl.resource.match(/\//)) {
                ctrl.resource = ctrl.resource.replace(/cur-locale/, ctrl.env);
                return directiveData.get(ctrl.resource).then(response => {
                    ctrl.data = response.data.fields;
                }, handleRejection);
            } else {
                return directiveData.getByUrl(ctrl.resource || 'features-grid').then((response) => {
                    ctrl.data = response.data.fields;
                }, handleRejection);
            }
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }
    }
})();
