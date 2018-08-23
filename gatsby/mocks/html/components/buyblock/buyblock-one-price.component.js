// This component has been dismissed; please use <buyblock-dropdown> passing one-price as a template parameter
// e.g. <buyblock-dropdown template="one-price"></buyblock-dropdown>
(function() {
    angular.module('kappGlobal.buyblocks')
        .component('buyblockOnePrice', {
            'bindings': {
                'productShortName': '@productName',
                'purchaseType': '@',
                'valueToSet': '<',
                'selectedPack': '@',
                'selectedTerm': '@',
                'selectedAutorenew': '@',
                'countMonthly': '@',
                'estore': '@',
                'template': '@',
                'description': '@',
                'free': '@',
                'hideTrialButton': '@'
            },
            'controller': 'buyblockDropdownController',
            'templateUrl': ['$element', '$attrs', function($element, $attrs) {
                let template = 'one-price';

                if ($attrs.template) template = $attrs.template;

                return `/apps/kapp/modules/_shared/components/buyblock/templates/buyblock-${template}.html`;
            }]
        });
})();
