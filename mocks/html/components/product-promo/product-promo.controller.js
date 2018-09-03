(function() {
    'use strict';
    angular.module('kappGlobal.productPromo')
        .controller('productPromoController', productPromoController);

    function productPromoController(directiveData, $http, errorService) {
        let ctrl = this;
        ctrl.$onInit = activate;

        function activate() {
            getData();
            setAnalyticsData();
        }

        function setAnalyticsData() {
            if (ctrl.template === 'ksc' && ctrl.resource) {
                switch (ctrl.resource) {
                case 'ksc-promo-top':
                    ctrl.analyticsPrefix = 'KSC Banner Top';
                    break;
                case 'ksc-promo-middle':
                    ctrl.analyticsPrefix = 'KSC Banner Middle';
                    break;
                case 'ksc-promo-bottom':
                    ctrl.analyticsPrefix = 'KSC Banner Bottom';
                    break;
                default:
                }
            }
        }

        function getData() {
            return directiveData.getByUrl(ctrl.resource || 'product-promo').then(response => {
                ctrl.data = response.data.fields;
                if (!ctrl.data.product) return false;

                return $http.get(ctrl.data.product, {'cache': true}).then((response) => {
                    ctrl.product = response.data.fields;
                }, handleRejection);
            }, handleRejection);
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }
    }
})();
