(function() {
    'use strict';
    angular.module('kappGlobal.bottomBanner')
        .controller('bottomBannerController', bottomBannerController);

    function bottomBannerController(windowHelperService, directiveData, ENV, errorService) {
        let ctrl = this;
        ctrl.env = ENV.locale;
        ctrl.$onInit = activate;
        ctrl.setBackgroundImage = setBackgroundImage;
        ctrl.navigateUserTo = windowHelperService.navigateUserTo;

        function activate() {
            getData();
        }

        function getData() {
            if (ctrl.resource) ctrl.resource = ctrl.resource.replace(/cur-locale/, ctrl.env);

            return directiveData.getByUrl(ctrl.resource || 'bottom-banner').then(response => {
                ctrl.data = response.data.fields;
            }, (rejection) => {
                errorService.warn(rejection);
            });
        }

        function setBackgroundImage() {
            return ctrl.data && ctrl.data.backgroundImage ? '' : 'lightgreen-background';
        }

    }
})();
