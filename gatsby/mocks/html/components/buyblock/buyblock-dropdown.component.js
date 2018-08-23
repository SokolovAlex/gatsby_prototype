(function() {
    angular.module('kappGlobal.buyblocks')
        .component('buyblockDropdown', {
            'bindings': {
                'productShortName': '@productName', //for cases when we only know the name of the product
                'productInfo': '<', //for cases when we have all product data available
                'purchaseType': '@',
                'selectedPack': '@',
                'selectedTerm': '@',
                'selectedAutorenew': '@',
                'estore': '@',
                'symbol': '@',
                'locale': '@',
                'buyButtonText': '@',
                'productBox': '@',
                'template': '@',
                'noBoxshot': '@', // does nothing? LT
                'setBuyblockValueByProduct': '&', // does nothing? LT
                'valueToSet': '<',
                'upgradeButton': '@',
                'highlighted': '@',
                'type': '@',
                'kscDisclaimer': '@',
                'hideProductLinks': '@',
                'promoline': '@',
                'countMonthly': '@',
                'description': '@',
                'free': '@',
                'onFormUpdated': '&',
                'hideTrialButton': '@',
                'showBbTrialButton': '@',
                'saveRateText': '@',
                'savingsPriceType': '@',
                'disableAutoRenew': '@',
                'hideArCheckbox': '@'
            },
            'controller': 'buyblockDropdownController',
            'templateUrl': ['$element', '$attrs', function($element, $attrs) {
                let template = 'dropdown';

                if ($attrs.template) template = $attrs.template;

                return `/apps/kapp/modules/_shared/components/buyblock/templates/buyblock-${template}.html`;
            }]
        });
})();
