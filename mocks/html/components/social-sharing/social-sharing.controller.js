(function() {
    'use strict';
    angular.module('kappGlobal.socialSharing')
        .controller('socialSharingController', socialSharingController);

    function socialSharingController($location, directiveData, errorService) {
        let ctrl = this;
        ctrl.socialData = {};
        ctrl.pageUrl = $location.absUrl();
        ctrl.template = ctrl.template || 'awards';
        ctrl.$onInit = activate;

        function activate() {
            getData();
        }

        function getData() {
            return directiveData.getLocal('general-translations').then((response) => {
                ctrl.socialData = response.data.fields;
            }, (rejection) => {
                errorService.warn(rejection);
            });
        }
    }
})();
