(function() {
    'use strict';
    angular.module('kappGlobal.customCarousel')
        .controller('customCarouselController', customCarouselController);

    function customCarouselController(directiveData, errorService, $scope, $element, $rootScope) {
        let ctrl = this;
        ctrl.data = {};
        ctrl.$onInit = activate;
        let slickConfig = {
            'infinite': true,
            'slidesToShow': 1,
            'slidesToScroll': 1,
            'dots': true,
            'accessibility': false,
            'draggable': false,
            'nextArrow': `<a type="button" href="" class="next-slide"></a>`,
            'prevArrow': `<a type="button" href="" class="prev-slide"></a>`,
            'responsive': [
                {
                    'breakpoint': 1023,
                    'settings': {
                        'slidesToShow': 3,
                        'slidesToScroll': 3,
                        'infinite': true,
                        'dots': true,
                        'arrows': false
                    }
                },
                {
                    'breakpoint': 769,
                    'settings': {
                        'slidesToShow': 2,
                        'slidesToScroll': 2,
                        'dots': true,
                        'arrows': false
                    }
                },
                {
                    'breakpoint': 480,
                    'settings': {
                        'slidesToShow': 1,
                        'slidesToScroll': 1,
                        'dots': true,
                        'arrows': false
                    }
                }
            ]
        };

        function activate() {
            getData();
        }

        function getData() {
            return directiveData.getByUrl(ctrl.resource || 'custom-carousel').then(response => {
                ctrl.data = response.data.fields;
            }, (rejection) => {
                errorService.warn(rejection);
            });
        }

        let ngRender = $rootScope.$on('ngRender', () => {
            startSlick();
            ngRender();
        });

        $scope.$on('$destroy', () => {
            stopSlick();
        });

        function startSlick() {
            $element.find('.carousel-body').slick(slickConfig);
        }

        function stopSlick() {
            $element.find('.slick-initialized').slick('unslick');
        }
    }
})();
