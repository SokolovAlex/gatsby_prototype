(function() {
    angular.module('kappGlobal.buyblocks', ['kappGlobal.productData', 'kappGlobal.tracking', 'kappGlobal.messageFormat'])
        .directive('buyblockProductShortDesc', () => {
            return {
                'replace': true, // prevent nesting in an element to avoid side effect on existing css
                'scope': {
                    'product': '='
                },
                'template': '<p ng-bind-html="product.overrideProdDescLrc || product.shortDesc | html" data-test="buyblock-desc--{{product.shortName}}"></p>'
            };
        });
})();
