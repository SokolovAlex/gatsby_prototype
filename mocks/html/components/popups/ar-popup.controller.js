(function() {
    'use strict';
    angular.module('kappGlobal.arPopup')
        .controller('arPopupController', arPopupController);
    function arPopupController(directiveData, $rootScope, $scope, errorService) {
        let ctrl = this;
        ctrl.popupActive = false;
        ctrl.onceChecked = false;
        ctrl.ARcheck = onArCheck;
        ctrl.$onInit = activate;

        function activate() {
            getData();
            $scope.$on('$destroy', handleScopeDestroyed);
        }

        function getData() {
            return directiveData.getLocal('buyblock/ar-texts').then((response) => {
                ctrl.buyblockData = response.data.fields;
            }, (rejection) => {
                errorService.warn(rejection);
            });
        }

        let toggleARPopup = $rootScope.$on('toggleARPopup', (ev, arPopupButtons) => {
            ctrl.arPopupButtons = arPopupButtons;
            ctrl.onceChecked = false;
            ctrl.popupActive = !ctrl.popupActive;
        });
        let onceUnchecked = $rootScope.$on('onceUnchecked', () => {
            ctrl.popupActive = true;
        });
        let checkboxClicked = $rootScope.$on('checkboxClicked', (ev, isChecked) => {
            ctrl.onceChecked = isChecked;
            ctrl.arPopupButtons = 'true';
        });

        function onArCheck(flag) {
            $rootScope.$emit('arPopupCheck', flag);
            ctrl.popupActive = false;
        }

        function handleScopeDestroyed() {
            toggleARPopup();
            onceUnchecked();
            checkboxClicked();
        }
    }
})();
