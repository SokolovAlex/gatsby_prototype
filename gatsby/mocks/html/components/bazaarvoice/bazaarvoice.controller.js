(function() {
    'use strict';
    angular.module('kappGlobal.bazaarVoice')
        .controller('bazaarVoiceController', bazaarVoiceController);

    function bazaarVoiceController(directiveData, bazaarVoiceDataService, errorService, $rootScope, $q, $scope, $window, ngDialog) {
        let ctrl = this;
        ctrl.bv = {};
        ctrl.bvData = {};
        ctrl.showReviewsActive = false;
        ctrl.currentPage = 1;
        ctrl.pageSize = 10;
        ctrl.reverse = false;
        ctrl.reviewRating = 'Rating';
        ctrl.reviewDate = 'SubmissionTime';
        ctrl.reviewOrderBy = 'Rating';
        ctrl.orderByCondition = orderByCondition;
        ctrl.isActive = isActive;
        ctrl.getStars = getStars;
        ctrl.showReviews = showReviews;
        ctrl.$onInit = activate;
        $rootScope.hasMatchingPopupCalled = false;

        function getProductId(value) {
            let splitOn = '#bazaarvoice_';
            return value.match(splitOn) ? value.split(splitOn)[1] : value;
        }

        let showReviewsPopupEventUnsub = $rootScope.$on('showReviewsPopup', function(event, value) {
            if (ctrl.productId === getProductId(value) && !$rootScope.hasMatchingPopupCalled) {
                $rootScope.hasMatchingPopupCalled = true;
                showReviews(true);
            }
        });

        function activate() {
            $q.all([
                getData(),
                getBazaarVoiceData(getProductId(ctrl.productId))
            ]).catch(errorService.warn);

            orderByCondition(ctrl.reviewOrderBy);
            $scope.$on('$destroy', handleScopeDestroyed);

            $scope.$on('open-popup', (evt, productId) => {
                if (productId === ctrl.productId) {
                    showReviews(true);
                }
            });
        }

        function getData() {
            return directiveData.getLocal('general-translations')
                .then((response) => {
                    ctrl.bvData = response.data.fields;
                });
        }

        function checkTemplate() {
            if (ctrl.template === 'reviews-carousel') return true;
        }

        function getBazaarVoiceData(productId, popupActive = checkTemplate()) {
            if (productId) {
                return bazaarVoiceDataService.getProductReviews(productId, popupActive)
                    .then((response) => {
                        if (!response) return false;
                        let pass = 0;
                        ctrl.bv = response.data;

                        if (ctrl.bv && 'hasErrors' in ctrl.bv) {
                            return errorService.warn('Bazaarvoice:', ctrl.bv.Errors);
                        }

                        let hasProducts = ctrl.bv && ctrl.bv.Includes && ctrl.bv.Includes.Products && ctrl.bv.Includes.Products[productId];
                        ctrl.starsRange = hasProducts && ctrl.bv.Includes.Products[productId].ReviewStatistics.OverallRatingRange || 5;

                        ctrl.productName = hasProducts && ctrl.bv.Includes.Products[productId].Name;

                        ctrl.litStars = function(range, value) {
                            if (!popupActive) {
                                value = ctrl.bv.Results[0] && ctrl.bv.Results[0].ProductStatistics.ReviewStatistics.AverageOverallRating;
                            }
                            ctrl.starsValue = Math.round(value * 2) / 2;

                            if (value > range) {
                                pass = value - range;

                                if (pass <= 0.99 && pass >= 0.01) {
                                    return 'font-icons icon-star half';
                                }
                                return 'font-icons icon-star';
                            }
                            else {
                                return 'font-icons icon-star empty';
                            }
                        };

                        ctrl.showReviewsActive = true;
                    })
                    .catch(err => {
                        errorService.warn('Bazaarvoice:', err);
                    });
            } else {
                errorService.warn('Bazaarvoice: productId empty');
            }
        }

        function orderByCondition(orderByPredicate) {
            let index = ctrl.reviewOrderBy.indexOf(`${orderByPredicate}`);
            ctrl.reviewOrderBy = orderByPredicate;
            if (index === 0) {
                ctrl.reverse = !ctrl.reverse;
            }
        }

        function isActive(name) {
            return ctrl.reviewOrderBy === name;
        }

        function getStars(num) {
            return new Array(num);
        }

        function showReviews(popupActive) {
            if (ctrl._popupOpened) {
                return;
            }

            ctrl._popupOpened = true;

            return getBazaarVoiceData(ctrl.productId, popupActive).then(() => {
                ngDialog.open({
                    'template': '/apps/kapp/modules/_shared/components/bazaarvoice/templates/bazaarvoice-reviews.html',
                    'className': 'ngdialog-flyout',
                    'data': ctrl,
                    'onOpenCallback': function() {
                        $window.trackPageView($rootScope.kaspersky.pageName + ' > Bazaarvoice Reviews Popup');
                    },
                    'preCloseCallback': function() {
                        ctrl._popupOpened = false;
                        $rootScope.hasMatchingPopupCalled = false;
                        $window.trackPageView($rootScope.kaspersky.pageName);
                    }
                });
            }, (rejection) => {
                errorService.warn('BazaarvoicePopup:', rejection);
            });
        }

        function handleScopeDestroyed() {
            showReviewsPopupEventUnsub();
        }
    }
})();
