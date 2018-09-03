(function() {
    'use strict';
    angular.module('kappGlobal.featuredProducts')
        .controller('featuredProductsController', featuredProductsController);

    function featuredProductsController(osDetectService, directiveData, appHelperService, errorService) {
        let ctrl = this;
        ctrl.products = '';
        ctrl.highlighted = '';
        ctrl.$onInit = activate;

        function activate() {
            getData();
        }

        function getData() {
            let hash = appHelperService.getLocationHash(),
                osDetected = osDetectService.getCurrentOs(hash),
                osList = getOsList(),
                featuredProducts = getFeaturedProducts(osList, osDetected);
            return directiveData.getByUrl(featuredProducts || 'featured-products').then(response => {
                ctrl.products = response.data.fields.productShortName;
                ctrl.highlighted = response.data.fields.highlighted;
            }, (rejection) => {
                errorService.warn(rejection);
            });
        }

        function getFeaturedProducts(dataList, osDetect) {
            let product = dataList[0].data;
            if (!osDetect.device) return product;
            if (appHelperService.assertStateByName('home-security')) {
                let osProducts = dataList.filter(function(obj) {
                    return JSON.stringify(obj.os) === JSON.stringify(osDetect.device.type);
                })[0];
                if (!osProducts) return product;
                product = osProducts.data;
            }
            return product;
        }

        function getOsList() {
            return [
                {
                    'os': 'pc',
                    'data': 'featured-products'
                }, {
                    'os': 'mac',
                    'data': 'featured-products-mac'
                }, {
                    'os': 'mobile',
                    'data': 'featured-products-mobile'
                }
            ];
        }

        if (appHelperService.stateIncludes('home-security-section')) {
            ctrl.state = 'b2c';
        }

        if (appHelperService.stateIncludes('vsb')) {
            ctrl.state = 'vsb';
        }

        if (appHelperService.stateIncludes('home-downloads')) {
            ctrl.state = 'hd';
        }
    }
})();
