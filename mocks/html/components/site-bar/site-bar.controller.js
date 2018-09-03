(function() {
    'use strict';
    angular.module('kappGlobal.siteBar')
        .controller('siteBarController', siteBarController);

    function siteBarController(directiveData, errorService, windowHelperService) {
        let ctrl = this;
        ctrl.data = {};
        ctrl.closeBar = closeBar;
        ctrl.$onInit = activate;
        ctrl.showSitebar = true;

        function activate() {
            getData();
        }

        function hideSideBarForNonIndianIP() {
            ctrl.showSitebar = windowHelperService.getIPCountry() === 'IN';
        }

        function getData() {
            return directiveData.get('/site-header/site-bar.json').then(response => {
                ctrl.data = response.data.fields;
                if (ctrl.data.hideSiteBarForNonIndianIP && ctrl.data.hideSiteBarForNonIndianIP[0] === 'true') hideSideBarForNonIndianIP();
            }, (rejection) => {
                errorService.warn(rejection);
            });
        }

        function closeBar() {
            ctrl.data.active = 'No';
        }

    }
})();
