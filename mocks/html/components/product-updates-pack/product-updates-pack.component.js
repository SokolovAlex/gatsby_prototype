(function() {
    angular.module('kappGlobal.productUpdatesPack')
        .component('productUpdatesPack', {
            'bindings': {
                'componentData': '<',
                'productName': '<',
                'version': '@',
                'resource': '@',
                'product': '<'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/product-updates-pack/templates/product-updates-pack.html',
            'controller': 'productUpdatesPackController'

        });
})();
