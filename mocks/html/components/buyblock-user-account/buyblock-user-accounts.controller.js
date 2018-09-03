(function() {
    'use strict';
    angular.module('kappGlobal.buyblocks')
        .controller('buyblockUserAccountController', buyblockUserAccountController);

    function buyblockUserAccountController($scope, ngDialog, buyblockService, messageFormatService) {
        const ctrl = this;
        ctrl.$id = $scope.$id || Math.random().toString(36).substring(7);

        ctrl.$onChanges = () => {
            ctrl.setShowFlags();

            if (ctrl.showAccountLabel && ctrl.label) {
                ctrl.setPluralizedLabel();
            }
        };

        ctrl.openDescriptionPopup = () => {
            ngDialog.open(buyblockService.ngDialogSettings(ctrl, $scope, {
                'className': 'ngdialog-plain ngdialog-narrow',
                'template': '/apps/kapp/modules/b2c/components/kscloud-disclaimers/templates/account-description.html'
            }));
        };

        ctrl.setShowFlags = () => {
            ctrl.showAccountOverride = ctrl.hasAccountOverride();
            ctrl.showAccountLabel = !ctrl.hasAccountOverride() && ctrl.hasLabel() && ctrl.hasCount();
            ctrl.showPopupIcon = ctrl.hasDescriptionPopup() && (ctrl.showAccountOverride || ctrl.showAccountLabel);
        };

        ctrl.setPluralizedLabel = () => {
            if (!ctrl._mfFormatter || ctrl._mfFormatterLabel !== ctrl.label) {
                ctrl._mfFormatterLabel = ctrl.label;
                // userAccounts: name of the resulting formatter
                ctrl._mfFormatter = messageFormatService.compile({'userAccounts': ctrl.label});
            }

            ctrl._mfFormatter.then(formatter => {
                // USER_ACCOUNTS: name of the param passed
                ctrl.pluralizedLabel = formatter.userAccounts({'USER_ACCOUNTS': ctrl.count});
            });
        };

        ctrl.hasAccountOverride = () => isStringNonEmpty(ctrl.accountInfoOverride);

        ctrl.hasLabel = () => isStringNonEmpty(ctrl.label);

        ctrl.hasDescriptionPopup = () => isStringNonEmpty(ctrl.descriptionPopup);

        ctrl.hasCount = () =>
            angular.isDefined(ctrl.count) && ctrl.count > 0;

        function isStringNonEmpty(str) {
            return angular.isDefined(str) && str.trim() !== '';
        }

    }
})();
