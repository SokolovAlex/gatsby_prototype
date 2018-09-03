(function() {
    'use strict';
    angular.module('kappGlobal.promoSection')
        .controller('promoSectionController', promoSectionController);

    function promoSectionController($element, $window, directiveData, promoSectionService, errorService) {
        let ctrl = this;
        ctrl.data = [];
        ctrl.$onInit = activate;
        ctrl.getBackGroundImage = getBackGroundImage;

        /**
         * Hack to keep current implementation along with a new one.
         * If we have a resource override (e.g. promo-settings), check if promo-settings tells us to load other promo content.
         * Otherwise, just load the content.
         */
        function activate() {
            if (ctrl.resource && ctrl.resource !== 'promo-section' && ctrl.template !== 'ent-3.0') {
                return promoSectionService.getPromoMap(ctrl.resource).then(function(response) {
                    if (response && response.promoValue === 'true') getData();
                }, handleRejection);
            } else {
                return getData();
            }
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        function getData() {
            return directiveData.getByUrl(ctrl.resource || 'promo-section').then(response => {
                if (response.data && response.data.fields.promotions) {
                    ctrl.data = response.data.fields.promotions;
                    ctrl.template = response.data.fields.template;
                } else {
                    ctrl.data.push(response.data.fields);
                    ctrl.id = response.data.id;
                    runScript();
                }
            }, handleRejection);
        }

        function runScript() {
            let comment = `<!-- Start Component Presentation: {"ComponentID" : "${ctrl.id}","ComponentTemplateID" : "tcm:246-294262-32"} -->`;
            $($element).prepend(comment);
        }

        function getBackGroundImage(promotion) {
            if (promotion.backgroundImageForTablet && $window.innerWidth <= 768 && $window.innerWidth > 481) {
                return {
                    'background-image' : 'url(' + promotion.backgroundImageForTablet + ')'
                };
            } else if (promotion.backgroundImageForMobile && $window.innerWidth <= 480) {
                return {
                    'background-image' : 'url(' + promotion.backgroundImageForMobile + ')'
                };
            } else if (promotion.backgroundImage) {
                return {
                    'background-image' : 'url(' + promotion.backgroundImage + ')'
                };
            }
        }
    }
})();
