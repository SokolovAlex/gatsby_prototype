(function() {
    'use strict';
    angular.module('kappGlobal.productUpdatesPack')
        .controller('productUpdatesPackController', productUpdatesPackController);

    function productUpdatesPackController(directiveData, productData, errorService, $window) {
        let ctrl = this;
        ctrl.data = {};
        ctrl.section = '';
        ctrl.$onInit = activate;
        ctrl.isEndPointDownloadPage = isEndPointDownloadPage;

        function activate() {
            getData();
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        function getData() {
            return directiveData.getByUrl(ctrl.resource || 'product-updates-pack').then((response) => {
                ctrl.data = response.data.fields;
                ctrl.section = location.pathname.split('/');
                return productData.getcusjsonb2b(ctrl.section[1], ctrl.data.packName).then((response) => {
                    ctrl.productInfo = response.data.fields;
                }, handleRejection);
            }, handleRejection);
        }

        function isEndPointDownloadPage() {
            return [
                '/small-to-medium-business-security/downloads/endpoint-advanced',
                '/small-to-medium-business-security/downloads/endpoint-select',
                '/small-to-medium-business-security/downloads/endpoint-core'
            ].some((url) => {
                return $window.location.pathname === url;
            });
        }
    }
})();
