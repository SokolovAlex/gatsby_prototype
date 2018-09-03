(function() {
    'use strict';
    angular.module('kappGlobal.lrcSteps')
        .controller('lrcStepsController', lrcStepsController);

    function lrcStepsController($scope, $timeout, directiveData, appHelperService, errorService) {
        let ctrl = this;
        ctrl.tab = 0;
        ctrl.setTab = setTab;
        ctrl.isSet = isSet;
        ctrl.$onInit = activate;

        function activate() {
            getData();
        }

        function getData() {
            return directiveData.getByUrl('lrc-steps').then(response => {
                ctrl.data = response.data.fields;
                runScript();
            }, (rejection) => {
                errorService.warn(rejection);
            });
        }

        function setTab(event, newTab) {
            event.preventDefault();
            ctrl.tab = newTab;
        }

        function isSet(tabNum) {
            return $scope.tab === tabNum;
        }

        function runScript() {
            $timeout(() => {
                let SelectedName;

                //////////////////////////////////////////////////////
                // Tabs
                //////////////////////////////////////////////////////

                $('.tab-title:not(.sec) a').on('click', function(e) {
                    let $this = $(this),
                        $parent = $this.parent(),
                        current,
                        tab;

                    e.preventDefault();
                    // Get the name of tab content that should be controled
                    current = $parent.closest('.tabs-title-wrapper').attr('data-tab');

                    // Remove selected class from all tab titles and add it to the one just clicked
                    $('.tabs-title-wrapper[data-tab=\'' + current + '\'] .tab-title').removeClass('selected');
                    $parent.addClass('selected');

                    // Check clicked link href and show matching tab content
                    tab = $this.attr('href');
                    $('.tab-content-wrapper[data-tab=\'' + current + '\'] .tab-content-single').not(tab).removeClass('tab-show');
                    $(tab).addClass('tab-show');
                });

                //////////////////////////////////////////
                // Tabs desktop -> Dropdown mobile
                //////////////////////////////////////////

                // Get the name of currently active tab for mobile list
                SelectedName = $('.tab-nav:not(.sec)').parent().find('ul.tabs li.selected a').text();

                if ($scope.$ctrl.data.steps.length > 1) {
                    $('.tab-nav:not(.sec)').append('<div class="tab-label">' + SelectedName + '</div>');
                }

                $('.tab-nav:not(.sec)').click(function(e) {
                    e.stopPropagation();
                    $(this).toggleClass('active');
                });

                // Close it if user clicks outside
                $('body').click(function() {
                    $('.tab-nav:not(.sec)').removeClass('active');
                });

                $('.tab-nav:not(.sec) .tabs').click(function(e) {
                    e.stopPropagation();
                });

                // Check when item is clicked and update active tab label
                $('.tab-nav:not(.sec) .tabs li').click(function(e) {
                    let $this = $(this);
                    e.preventDefault();
                    $this.parent().siblings().remove();
                    $this.closest('.tab-nav').append('<div class=tab-label></div>');
                    $this.closest('.tab-nav').find('.tab-label').text($(this).text());
                    $this.parent().parent().toggleClass('active');
                });

                function initGallerySlider() {
                    return {
                        'infinite': true,
                        'slidesToShow': 2,
                        'dots': false,
                        'draggable': false,
                        'centerMode': true,
                        'nextArrow': '<a type="button" href="" class="next-slide"></a>',
                        'prevArrow': '<a type="button" href="" class="prev-slide"></a>',
                        'rtl': appHelperService.isPageDirectionRTL(),
                        'responsive': [
                            {
                                'breakpoint': 480,
                                'settings': {
                                    'slidesToShow': 1
                                }
                            }
                        ]
                    };
                }

                $('.gallery-slider-2:not(.sec)').slick(initGallerySlider());

                $('.reinit-slick:not(.sec) .tab-title a').on('click', function(e) {
                    e.preventDefault();
                    $('.gallery-slider-2:not(.sec)').slick('unslick').slick(initGallerySlider());
                });

                $('.popup-gallery:not(.sec) div').magnificPopup({
                    'delegate': 'a',
                    'type': 'image',
                    'closeOnContentClick': false,
                    'closeBtnInside': false,
                    'mainClass': 'mfp-with-zoom mfp-img-mobile',
                    'image': {
                        'verticalFit': true
                    },
                    'gallery': {
                        'enabled': true
                    },
                    'zoom': {
                        'enabled': true,
                        'duration': 300,
                        'opener': function(element) {
                            return element.find('img');
                        }
                    }
                });
            });
        }
    }
})();
