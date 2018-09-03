(function() {
    'use strict';
    angular.module('kappGlobal.downloadBlock')
        .controller('downloadBlockController', downloadBlockController);

    function downloadBlockController(productData, errorService, directiveData) {
        let ctrl = this;
        ctrl.objProductData = {};
        ctrl.$onInit = activate;

        function activate() {
            getData();
            getBuyblockTranslations();
        }

        function getData() {
            ctrl.objProductData = ctrl.productData;
            if (ctrl.productName) {
                productData.getb2c(ctrl.productName).then((response) => {
                    ctrl.productInfo = response.data.fields;
                    getBadges(ctrl.objProductData.badges);
                }, (rejection) => {
                    errorService.warn(rejection);
                });
            }
            if (!ctrl.productName && ctrl.productInfo) {
                getBadges(ctrl.objProductData.badges);
            }
        }

        function getBuyblockTranslations() {
            return directiveData.getLocal('buyblock/buyblock-texts')
                .then((response) => {
                    ctrl.buyblockTranslations = response.data.fields;
                });
        }

        function getBadges(badges) {
            _.forEach(badges, function(obj) {
                switch (obj.type) {
                case 'Google Play':
                    obj.link = ctrl.productInfo.bbSettings.downloadFromGplayLink;
                    break;
                case 'App Store':
                    obj.link = ctrl.productInfo.bbSettings.downloadFromIstoreLink;
                    break;
                case 'Microsoft':
                    obj.link = ctrl.productInfo.bbSettings.downloadFromMicrosoftLink;
                    break;
                }
            });
        }


    }
})();
