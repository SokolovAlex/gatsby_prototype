(function() {
    'use strict';
    angular.module('kappGlobal.resourceDocuments')
        .controller('b2bResourceDocumentsController', b2bResourceDocumentsController);

    function b2bResourceDocumentsController($element, $timeout, $http, $scope, $q, directiveData, appHelperService, errorService, ngDialog) {
        let ctrl = this,
            $dialog = ngDialog;
        ctrl.scopeId = $scope.$id;
        ctrl.videoPopup = videoPopup;
        ctrl.$onInit = activate;

        function activate() {
            getData();
        }

        function getData() {
            return directiveData.getByUrl(ctrl.resource || 'resource-documents').then((response) => {
                ctrl.data = response.data.fields;

                // get resource element
                let promises = ctrl.data.resourceDeckItems.map((item, index) => {
                    if (item.match(/\.json/)) {
                        return $http.get(item, {'cache': true}).then((response) => {
                            return ctrl.data.resourceDeckItems[index] = response.data.fields;
                        }, handleRejection);
                    }
                });

                $q.all(promises).then(() => {
                    $timeout(() => {
                        runScripts();
                    });

                }, handleRejection);
            }, handleRejection);
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        function videoPopup(url) {
            let embedSrc = url, sources = {
                'youtube': {
                    'site': 'youtube.com',
                    'id': 'v=',
                    'src': '//www.youtube.com/embed/%id%?autoplay=1'
                },
                'gmaps': {
                    'site': '//maps.google.',
                    'src': '%id%&output=embed'
                }
            };

            _.forEach(sources, function(item) {
                if (embedSrc.indexOf(item.site) > -1) {
                    if (item.id) {
                        if (angular.isString(item.id)) {
                            embedSrc = embedSrc.substr(embedSrc.lastIndexOf(item.id) + item.id.length, embedSrc.length);
                        }
                    }
                    embedSrc = item.src.replace('%id%', embedSrc);

                    return false;
                }
            });

            return $dialog.open({
                'template': `<div class="ngdialog-iframe-wrapper"><iframe class="ngdialog-iframe" src="${embedSrc}" frameborder="0" allowfullscreen=""></iframe></div>`,
                'className': 'ngdialog-iframe ngdialog-flyout',
                'showClose': true,
                'plain': true,
                'name': 'video-popup'
            });
        }

        function runScripts() {
            let maxSlides = ctrl.data && ctrl.data.slides ? parseInt(ctrl.data.slides) : 3,
                arrows = !!(ctrl.data && ctrl.data.slideArrows && ctrl.data.slideArrows.length > 0);

            $($element).find('.carousel:not(.slider-disabled).carousel-' + ctrl.scopeId).not('.slick-initialized').slick({
                'mobileFirst': true,
                'infinite': arrows,
                'arrows': false,
                'slide': 'div',
                'accessibility': false,
                'slidesToShow': 1,
                'slidesToScroll': 1,
                'dots': true,
                'draggable': false,
                'nextArrow': '<a type="button" href="" class="next-slide"></a>',
                'prevArrow': '<a type="button" href="" class="prev-slide"></a>',
                'rtl': appHelperService.isPageDirectionRTL(),
                'responsive': [
                    {
                        'breakpoint': 769,
                        'settings': {
                            'slidesToShow': maxSlides,
                            'slidesToScroll': maxSlides,
                            'arrows': arrows
                        }
                    },
                    {
                        'breakpoint': 661,
                        'settings': {
                            'slidesToShow': maxSlides > 2 ? maxSlides - 1 : 1,
                            'slidesToScroll': maxSlides > 1 ? maxSlides - 1 : 1,
                            'arrows': arrows
                        }
                    }
                ]
            });
        }
    }
})();
