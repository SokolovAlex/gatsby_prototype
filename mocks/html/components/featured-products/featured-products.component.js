(function() {
    angular.module('kappGlobal.featuredProducts')
        .component('featuredProducts', {
            'bindings': {
                'resource': '@',
                'component': '@'
            },
            'controller': 'featuredProductsController',
            'templateUrl': '/apps/kapp/modules/_shared/components/featured-products/templates/featured-products.html'
        });
})();
