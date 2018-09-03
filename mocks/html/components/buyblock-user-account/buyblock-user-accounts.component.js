(function() {
    'use strict';

    angular.module('kappGlobal.buyblocks')
        .component('buyblockUserAccount', {
            'bindings': {
                'label': '@',
                'count': '<',
                'accountInfoOverride': '@',
                'descriptionPopup': '@',
                'productName': '@'
            },
            'controller': 'buyblockUserAccountController',
            'templateUrl': '/apps/kapp/modules/_shared/components/buyblock-user-account/templates/buyblock-user-accounts.html'
        });
})();
