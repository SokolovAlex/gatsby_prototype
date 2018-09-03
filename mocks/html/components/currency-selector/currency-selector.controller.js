(function() {
    'use strict';
    angular.module('kappGlobal.currencySelector')
        .controller('currencySelectorController', currencySelectorController);

    function currencySelectorController($rootScope, $scope, currencyManager, appHelperService) {
        let ctrl = this,
            currenciesCount;
        ctrl.openCurrencyMenu = false;
        ctrl.showCurrencyMenu = ctrl.showCurrencyMenu || true;
        ctrl.showCurrencySelector = ctrl.showCurrencySelector || false;
        ctrl.currencies = getCurrencies();
        ctrl.setCurrency = setCurrency;
        ctrl.onMenuBlur = onMenuBlur;
        ctrl.$onInit = activate;

        function activate() {
            currenciesCount = 1;
            if (appHelperService.assertLocaleByName('en-in')) {
                currenciesCount = 6;
            } else if (appHelperService.assertLocaleByName('ru-ru')) {
                currenciesCount = 11;
            }
            ctrl.showCurrencySelector = appHelperService.assertStateByName(['premium-service', 'premium-services']) && ctrl.currencies.length > currenciesCount;
        }

        function getCurrencies() {
            ctrl.currencies = currencyManager.getCurrencies();
            ctrl.currentCurrency = currencyManager.getCurrentCurrencyFromCache() || ctrl.currencies[0];
            return ctrl.currencies;
        }

        function setCurrency(item) {
            ctrl.currentCurrency = item;
            return currencyManager.setCurrency(item);
        }

        function onMenuBlur() {
            ctrl.openCurrencyMenu = false;
        }

        let buyBlockReady = $rootScope.$on('buyBlockReady', () => {
            ctrl.showCurrencySelector = ctrl.currencies.length > currenciesCount;
        });

        $scope.$on('$destroy', buyBlockReady);

    }
})();
