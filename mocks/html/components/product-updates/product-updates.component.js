(function() {
    angular.module('kappGlobal.productUpdates')
        .component('productUpdates', {
            'bindings': {
                'componentData': '<',
                'productName': '<',
                'version': '@',
                'resource': '@',
                'product': '<',
                'showDownloadLocale': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/product-updates/templates/product-updates.html',
            'controller': 'productUpdatesController'

        });
})();
