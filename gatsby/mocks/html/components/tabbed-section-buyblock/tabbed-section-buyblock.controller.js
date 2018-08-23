(function() {
    'use strict';
    angular.module('kappGlobal.tabbedSectionBuyblock')
        .controller('tabbedSectionBuyblockController', tabbedSectionBuyblockController);

    function tabbedSectionBuyblockController(directiveData, errorService) {
        let ctrl = this;
        ctrl.data = {};
        ctrl.$onInit = activate;

        function activate() {
            getData();
        }

        function getData() {
            return directiveData.getByUrl('tabbed-section-buyblock').then(response => {
                ctrl.data = response.data.fields;
            }, (rejection) => {
                errorService.warn(rejection);
            });
        }
    }
})();
