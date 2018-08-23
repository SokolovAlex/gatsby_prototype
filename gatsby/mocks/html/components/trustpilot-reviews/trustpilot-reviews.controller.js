(function() {
    'use strict';
    angular.module('kappGlobal.trustpilotReviews')
        .controller('trustpilotReviewsController', trustpilotReviewsController);

    function trustpilotReviewsController(directiveData, errorService, trustpilotReviewsService, $timeout, $element) {
        let ctrl = this;
        ctrl.reviews = [];
        ctrl.starsArr = _.range(0, 5, 1);
        ctrl.$onInit = activate;

        function activate() {
            getData();
        }

        function getData() {
            return directiveData.getByUrl(ctrl.resource || 'trustpilot-reviews').then((response) => {
                ctrl.data = response.data.fields;
                if (!ctrl.data) return false;
                ctrl.starsFilter = ctrl.data.starsFilter || '5';
                ctrl.reviewsNum = ctrl.data.reviewsNum || '14';
                ctrl.tagFilter = ctrl.data.tagFilter || '';
                getReviews();
            }, (rejection) => {
                errorService.warn(rejection);
            });
        }

        function getReviews() {
            return trustpilotReviewsService.getCustomerReviews(ctrl.starsFilter, ctrl.reviewsNum, ctrl.tagFilter).then((response) => {
                ctrl.protoReviews = response.data.reviews;
                while (ctrl.protoReviews.length) ctrl.reviews.push(ctrl.protoReviews.splice(0, 2));
                runScripts();
            }, (rejection) => {
                errorService.warn(rejection);
            });
        }

        function runScripts() {
            $timeout(() => {
                let slickConfig = {
                    'slidesToShow': 1,
                    'dots': true,
                    'accessibility': false,
                    'draggable': false,
                    'arrows': true,
                    'nextArrow': '<a type="button" href="" class="next-slide"></a>',
                    'prevArrow': '<a type="button" href="" class="prev-slide"></a>',
                    'responsive': [
                        {
                            'breakpoint': 769,
                            'settings': {
                                'arrows': false,
                                'dots': true
                            }
                        }
                    ]
                };
                $($element).find('.reviews-list').slick(slickConfig);

                // $($element).find('.reviews-personal blockquote content').dotdotdot({
                //     'ellipsis': '... ',
                //     'height': 70
                // });
            });
        }
    }
})();
