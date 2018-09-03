(function() {
    'use strict';
    angular.module('kappGlobal.productScriptsInjector')
        .controller('productScriptsInjectorController', productScriptsInjectorController);

    function productScriptsInjectorController($rootScope, $document, sessionStorageService, productScriptsInjectorService) {
        let ctrl = this;
        ctrl.$onInit = activate;

        function activate() {
            performInjection();
        }

        function performInjection() {
            let ngRender = $rootScope.$on('ngRender', () => {
                ctrl.productData = JSON.parse(ctrl.productData);
                ctrl.priceValue = JSON.parse(ctrl.priceValue);
                ctrl.cutPrice = ctrl.cutPrice ? JSON.parse(ctrl.cutPrice) : [{'price': 'no data'}];
                ctrl.bv = sessionStorageService.get('bazaarvoiceProduct' + ctrl.productData.bvId);
                ctrl.description = $document[0].querySelector('meta[name="description"]') && $document[0].querySelector('meta[name="description"]').content;
                productScriptsInjectorService.performInjection(ctrl);
                ngRender();
            });
        }
    }
})();
