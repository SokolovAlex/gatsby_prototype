(function() {
    'use strict';
    angular.module('kappGlobal.newsLetterOptIn')
        .controller('newsLetterOptInController', newsLetterOptInController);

    function newsLetterOptInController(newsLetterOptInService, errorService) {
        let ctrl = this;
        ctrl.optedInComplete = false;
        ctrl.fieldIsValid = true;
        ctrl.enableComponent = true;
        ctrl.submitForm = submitForm;
        ctrl.$onInit = activate;

        function activate() {
            getData();
        }

        function getData() {
            return newsLetterOptInService.getData().then(response => {
                ctrl.data = response.data.fields;
                ctrl.enableComponent = isEnabled(ctrl);
                ctrl.onDataLoaded({
                    'data': ctrl.data,
                    'componentEnabled': ctrl.enableComponent
                });
            }, handleRejection);
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);        }

        function submitForm(form) {
            if (form.$submitted && form.$invalid || !ctrl.email.validateEmail()) {
                ctrl.fieldIsValid = false;
                ctrl.email = '';
                ctrl.data.inputPlaceHolderText = ctrl.data.errorMessageText;
                return;
            }
            return newsLetterOptInService.submitForm(ctrl.email)
                .then(() => {
                    ctrl.optedInComplete = true;
                }, handleRejection);
        }

        function isEnabled(ctrl) {
            if (angular.isUndefined(ctrl.data)) return false;
            let enableComponent = ctrl.data['enableComponent'];
            return enableComponent && enableComponent.length > 0;
        }
    }
})();
