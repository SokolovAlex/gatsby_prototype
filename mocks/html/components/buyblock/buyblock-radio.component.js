(function() {
    angular.module('kappGlobal.buyblocks')
        .component('buyblockRadio', {
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
                'value': '<', // does nothing? LT
                'compare': '<', // does nothing? LT
                'highlighted': '@', // used in featured-products and HMC
                'highlightButton': '@', // used in featured-products and HMC
                'setBuyblockValueByProduct': '&',
                'type' : '@',
                'overrideProductDesc': '@',
                'hideProductLinks': '@',
                'promoline': '@',
                'updateButtonText': '@',
                'valueToSet': '<',
                'countMonthly': '@',
                'description': '@',
                'free': '@',
                'resellerOverride': '@',
                'saveRateText': '@',
                'savingsPriceType': '@',
                'hideTrialButton': '@',
                'disableAutoRenew': '@',
                'hideArCheckbox': '@',
                'upgradeButton': '@',
                'isFailover': '@',
                'hideAr': '@',
                'hidePriceDisclaimer': '@',
                'component': '@'
            },
            'controller': 'buyblockRadioController',
            'templateUrl': ['$element', '$attrs', function($element, $attrs) {
                let template = 'product-page';
                if ($attrs.template) template = $attrs.template;
                return `/apps/kapp/modules/_shared/components/buyblock/templates/buyblock-${template}.html`;
            }]
        });
})();
