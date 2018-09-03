(function() {
    angular.module('kappGlobal.buyblocks')
        .component('buyblockVsbDropdown', {
            'bindings': {
                'productShortName': '@productName', //for cases when we only know the name of the product
                'productInfo': '<', //for cases when we have all product data available
                'purchaseType': '@',
                'selectedPack': '@',
                'selectedTerm': '@',
                'selectedAutorenew': '@',
                'estore': '@',
                'template': '@',
                'overrideTrialButtonText': '@',
                'overrideTrialButtonLink': '@',
                'hideProductLinks': '@',
                'promoline': '@',
                'hideTrialButton': '@',
                'saveRateText': '@',
                'savingsPriceType': '@',
                'disableAutoRenew': '@',
                'setCustomLocale': '@'
            },
            'controller': 'buyblockVsbDropdownController',
            'templateUrl': ['$element', '$attrs', function($element, $attrs) {
                let template = 'vsb-dropdown';

                if ($attrs.template) template = $attrs.template;

                return `/apps/kapp/modules/_shared/components/buyblock/templates/buyblock-${template}.html`;
            }]
        });
})();
