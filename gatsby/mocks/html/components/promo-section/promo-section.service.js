(function() {
    'use strict';
    angular.module('kappGlobal.promoSection')
        .factory('promoSectionService', promoSectionService);

    function promoSectionService(directiveData, errorService) {

        return {
            'getPromoMap': getPromoMap
        };

        function getPromoMap(promoType) {
            return directiveData.getByUrl('promo-settings').then(function(response) {
                if (response.data.fields && response.data.fields.Promotions) {
                    return _.find(response.data.fields.Promotions, {'promoID': promoType});
                }
            }, (rejection) => {
                errorService.warn(rejection);
            });
        }
    }
})();
