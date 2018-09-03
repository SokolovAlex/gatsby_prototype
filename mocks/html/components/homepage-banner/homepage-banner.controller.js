(function() {
    'use strict';
    angular.module('kappGlobal.homepageBanner')
        .controller('homepageBannerController', homepageBannerController);

    function homepageBannerController($timeout, $element, $state, $scope, directiveData, searchService, appHelperService, windowHelperService, errorService, angularLoad, $q, ENV, ngDialog, $rootScope, $window) {
        let ctrl = this,
            searchFormVisible = false,
            mobileSetup,
            desktopSetup,
            animations = {},
            pendingAnimations = {
                'searchForm': null,
                'ctas': null,
                'ctaElements': null
            };

        ctrl.data = {};
        ctrl.locale = ENV.locale;
        ctrl.businessNames = ['small', 'medium', 'enterprise'];
        ctrl.search = search;
        ctrl.goToSearchPage = goToSearchPage;
        ctrl.displaySearch = displaySearch;
        ctrl.$onInit = activate;
        ctrl.$onDestroy = destroyGlobalListeners;
        ctrl.isMobile = windowHelperService.isMobile();
        ctrl.handleBusinessHoverIn = handleBusinessHoverIn;
        ctrl.handleBusinessHoverOut = handleBusinessHoverOut;
        ctrl.handleHomeHoverIn = handleHomeHoverIn;
        ctrl.handleHomeHoverOut = handleHomeHoverOut;
        ctrl.openLRCDialog = openLRCDialog;
        ctrl.getTabsOrder = getTabsOrder;

        angular.element(window).bind('resize.homepageBanner', function() {
            ctrl.isMobile = windowHelperService.isMobile();
            $scope.$digest();
        });

        $scope.$watch('$ctrl.isMobile', function(newV, oldV) {
            if (newV !== oldV) {
                if (ctrl.isMobile && !mobileSetup) {
                    setupMobileHeader();
                } else if (ctrl.isMobile) {
                    desktopSetup = false;
                } else if (!ctrl.isMobile && !desktopSetup) {
                    runScript();
                }
            }
        });

        function activate() {
            loadScripts();
        }


        function getTabsOrder(order) {
            if (ctrl.locale === 'ja-jp') return Math.abs(order - 1);
            return order;
        }

        function loadScripts() {

            let promises = [
                angularLoad.loadScript('/resources/template/js/TweenLite.min.js'),
                angularLoad.loadScript('/resources/template/js/CSSPlugin.min.js'),
                directiveData.getByUrl('homepage-banner').then((response) => {
                    $element.css({'transform': 'translate3d(0,0,0)'});
                    return response;
                })
            ];

            $q.all(promises).then(handlePromisesSuccess).catch(rejection => {
                errorService.warn(rejection);
            });
        }

        function handlePromisesSuccess(responses) {
            let response = (_.find(responses, 'data'));
            ctrl.data = response.data.fields;
            ctrl.data.bsnsCategory = _.first(ctrl.data.productCategories);
            ctrl.data.homeCategory = _.last(ctrl.data.productCategories);
            runScript();
        }

        let autoOff = $rootScope.$on('autocompleteCall', (ev, val) => {
            let reg = new RegExp(val.d[0].Value[0], 'ig'),
                searchString = val.d[0].Value[0];

            ctrl.autocompleteQ = val.d[0].Value;
            ctrl.autocompleteQhtml = ctrl.autocompleteQ.map((item) => {
                return item.replace(reg, `<span>${searchString}</span>`);
            });
        });

        function destroyGlobalListeners() {
            angular.element(window).off('resize.homepageBanner');
            autoOff();
            let autocompleteTag =  $window.document.querySelector('#autocompleteElement');
            if (autocompleteTag) $window.document.querySelector('head').removeChild(autocompleteTag);
        }

        function search() {
            searchService.autocomplete(ctrl.searchBar, $element);
        }

        function displaySearch() {
            let animationName = searchFormVisible ? 'hideSearchForm' : 'showSearchForm';
            searchFormVisible = !searchFormVisible;
            executeAnimation('searchForm', animationName);
        }

        function handleBusinessHoverIn() {
            if (!ctrl.onHoverBusiness) executeAnimation('ctas', 'showBusinessCta');
            ctrl.onHoverBusiness = true;
        }

        function handleBusinessHoverOut() {
            if (ctrl.onHoverBusiness) executeAnimation('ctas', 'hideBusinessCta');
            ctrl.onHoverBusiness = false;
        }

        function handleHomeHoverIn() {
            if (!ctrl.onHoverHome) executeAnimation('ctas', 'showHomeCta');
            ctrl.onHoverHome = true;
        }

        function handleHomeHoverOut() {
            if (ctrl.onHoverHome) executeAnimation('ctas', 'hideHomeCta');
            ctrl.onHoverHome = false;
        }

        function executeAnimation(animationKey, animationName) {
            if (animations[animationName]) animations[animationName]();
            else pendingAnimations[animationKey] = animationName;
        }

        function registerAnimations(animationsMap) {
            _.extend(animations, animationsMap);
        }

        function flushAnimations(animationKey) {
            if (pendingAnimations[animationKey]) {
                animations[pendingAnimations[animationKey]]();
                pendingAnimations[animationKey] = null;
            }
        }

        function goToSearchPage(e) {
            let keyCode;
            if (e && e.type === 'keypress') {
                keyCode = e.which || e.keyCode;

                if (keyCode === 13) {
                    $state.go('search', {
                        'query': ctrl.searchBar
                    });
                }
            } else {
                $state.go('search', {
                    'query': ctrl.searchBar
                });
            }
        }

        function openLRCDialog($event) {
            $event.preventDefault();
            ngDialog.open({
                'template':
                    `<div class="modal-header">
                    		<a class="modal-button modal-close" aria-label="Dismiss" ng-click="closeThisDialog(0)">
                    			<span class="font-icons icon-cancel"></span>
                    		</a>
                    </div>
                    <lrc-serial template="lrc-serial-dialog"></lrc-serial>`,
                'plain': true,
                'className': 'ngdialog-flyout ngdialog--lrc-dialog',
                'data': ctrl,
                'showClose': false,
                'scope': $scope
            });
        }

        function runScript() {
            $timeout(ctrl.isMobile && !mobileSetup
                ? setupMobileHeader
                : setupDesktopHeader);
        }

        // desktop header
        function setupDesktopHeader() {
            let $header = $('.homepage-hero-header-desktop'),
                $body = $('body'),
                $headerInner = $header.find('.hero-header-inner'),
                $searchForm = $header.find('.top-nav-search-form'),
                $searchInputWrap = $searchForm.find('.search-input-wrap'),
                $searchInput = $header.find('#homepage-header-search-input'),
                $hideOnSearch = $header.find('.top-nav-hideonsearch'),
                $midCol = $header.find('.hero-mid-col'),
                $bsnsCol = $header.find('.hero-side-col.business'),
                $homeCol = $header.find('.hero-side-col.home'),
                $bsnsOverlay = $bsnsCol.find('.green-overlay'),
                $homeOverlay = $homeCol.find('.green-overlay'),
                $bsnsGrayOverlay = $bsnsCol.find('.gray-overlay'),
                $homeGrayOverlay = $homeCol.find('.gray-overlay'),
                $bsnsSideCtaBox = $bsnsCol.find('.side-cta-box'),
                $homeSideCtaBox = $homeCol.find('.side-cta-box'),
                $bsnsSideScreen = $bsnsCol.find('.side-screen'),
                $homeSideScreen = $homeCol.find('.side-screen'),
                $bsnsStateCtaBtns = $bsnsSideScreen.find('.cta-list > li > a'),
                $homeStateCtaBtns = $homeSideScreen.find('.cta-list > li > a'),
                $stateCtasWrap = $header.find('.cta-list'),
                $stateCtaWraps = $header.find('.cta-list > li'),
                $stateCtaBtns = $header.find('.cta-list > li > a'),
                $midScreenIntro = $header.find('.mid-screen-intro'),
                $midSmallLogo = $header.find('.mid-small-logo'),
                $midSmallLogoLine = $midSmallLogo.find('> span'),
                $selectProductType = $header.find('.select-product-type');

            desktopSetup = true;

            if (!$header.length) return;

            $bsnsSideCtaBox.find('a').click(e => { e.preventDefault(); });
            $homeSideCtaBox.find('a').click(e => { e.preventDefault(); });

            $(window).on('resize', function() {
                let bodyWidth = $body.width(),
                    midColWidth = $midCol.width();

                if (bodyWidth < 768) return;

                if (bodyWidth >= 768 && bodyWidth < 992) {
                    // since we're sliding the header in this pixel range we
                    // need to make it extra wide so the edges don't become
                    // visible when it finishes sliding
                    bodyWidth += 400;
                }

                $headerInner.css({
                    'width': bodyWidth + 'px',
                    'margin-left': '-' + (bodyWidth / 2) + 'px'
                });
                $bsnsCol.width(((bodyWidth - midColWidth) / 2));
                $homeCol.width(((bodyWidth - midColWidth) / 2));
            });

            $(window).trigger('resize');

            // Search form

            registerAnimations({showSearchForm, hideSearchForm});
            flushAnimations('searchForm');

            function showSearchForm() {
                $searchForm.find('.search-bar').show();
                TweenLite.fromTo($hideOnSearch, 0.4, {'x': 0, 'autoAlpha': 1}, {'x': '+=10', 'autoAlpha': 0});
                TweenLite.fromTo($searchInputWrap, 0.4, {'x': '-=10', 'opacity': 0}, {'x': 0, 'opacity': 1});
                $searchInputWrap.css('z-index', '1');
                $searchForm.addClass('active');
                $searchInput[0].focus();
            }

            function hideSearchForm() {
                $searchForm.find('.search-bar').hide();
                TweenLite.fromTo($hideOnSearch, 0.4, {'x': '+=10', 'autoAlpha': 0}, {'x': 0, 'autoAlpha': 1});
                TweenLite.fromTo($searchInputWrap, 0.4, {'x': 0, 'opacity': 1}, {'x': '-=10', 'opacity': 0});
                $searchInputWrap.css('z-index', '-1');
                $searchForm.removeClass('active');
            }

            // CTAs

            $timeout(function() {
                TweenLite.fromTo($bsnsSideCtaBox, 1, {'y': '+=20', 'autoAlpha': 0}, {'y': 0, 'autoAlpha': 1});
                TweenLite.fromTo($homeSideCtaBox, 1, {'y': '+=20', 'autoAlpha': 0}, {'y': 0, 'autoAlpha': 1});

                registerAnimations({
                    showBusinessCta,
                    hideBusinessCta,
                    showHomeCta,
                    hideHomeCta
                });
                flushAnimations('ctas');

                $stateCtaBtns.hover(handleCtaBtnHoverIn, handleCtaBtnHoverOut);
                $stateCtaWraps.hover(handleCtaWrapHoverIn);
                $stateCtasWrap.mouseleave(handleCtaWrapHoverOut);
            }, 1000);

            function showBusinessCta() {
                if ($body.width() < 992) applyOffset('right');
                TweenLite.to($bsnsSideCtaBox, 0.4, {'autoAlpha': 0});
                TweenLite.to($bsnsOverlay, 0.4, {'autoAlpha': 1});
                TweenLite.to($homeGrayOverlay, 0.4, {'autoAlpha': 0.77});
                TweenLite.to($bsnsSideScreen, 0.4, {'autoAlpha': 1});
                // let tl = new TimelineLite();
                // tl.staggerFromTo($bsnsStateCtaBtns, 0.4, {'x': '-=10'}, {'x': 0}, 0.01);
                TweenLite.fromTo($bsnsStateCtaBtns, 0.4, {'x': '+=10'}, {'x': 0});
                TweenLite.to($selectProductType, 0.2, {'autoAlpha': 0});
            }

            function showHomeCta() {
                if ($body.width() < 992) applyOffset('left');
                TweenLite.to($homeSideCtaBox, 0.4, {'autoAlpha': 0});
                TweenLite.to($homeOverlay, 0.4, {'autoAlpha': 1});
                TweenLite.to($bsnsGrayOverlay, 0.4, {'autoAlpha': 0.77});
                TweenLite.to($homeSideScreen, 0.4, {'autoAlpha': 1});
                // let tl = new TimelineLite();
                // tl.staggerFromTo($homeStateCtaBtns, 0.4, {'x': '+=10'}, {'x': 0}, 0.01);
                TweenLite.fromTo($homeStateCtaBtns, 0.4, {'x': '+=10'}, {'x': 0});
                TweenLite.to($selectProductType, 0.2, {'autoAlpha': 0});
            }

            function hideBusinessCta() {
                if ($body.width() < 992) restoreOffset();
                TweenLite.to($bsnsSideCtaBox, 0.4, {'autoAlpha': 1});
                TweenLite.to($bsnsOverlay, 0.4, {'autoAlpha': 0});
                TweenLite.to($homeGrayOverlay, 0.4, {'autoAlpha': 0});
                TweenLite.to($bsnsSideScreen, 0.4, {'autoAlpha': 0});
                TweenLite.to($selectProductType, 0.2, {'autoAlpha': 1});
            }

            function hideHomeCta() {
                if ($body.width() < 992) restoreOffset();
                TweenLite.to($homeSideCtaBox, 0.4, {'autoAlpha': 1});
                TweenLite.to($homeOverlay, 0.4, {'autoAlpha': 0});
                TweenLite.to($bsnsGrayOverlay, 0.4, {'autoAlpha': 0});
                TweenLite.to($homeSideScreen, 0.4, {'autoAlpha': 0});
                TweenLite.to($selectProductType, 0.2, {'autoAlpha': 1});
            }

            function applyOffset(direction) {
                let offset = calcOffset($body.width()),
                    animateDir;
                if (appHelperService.isPageDirectionRTL()) {
                    animateDir = direction === 'right' ? '-=' : '+=';
                } else {
                    animateDir = direction === 'right' ? '+=' : '-=';
                }
                TweenLite.to($headerInner, 1.2, {'ease': Power1.easeOut, 'x': animateDir + offset.x});
                TweenLite.to($midCol, 1.2, {'ease': Power1.easeOut, 'width': offset.w});
            }

            function restoreOffset() {
                TweenLite.to($headerInner, 1.2, {'ease': Power1.easeOut, 'x': 0});
                TweenLite.to($midCol, 1.2, {'ease': Power1.easeOut, 'width': 280});
            }

            function calcOffset(windowWidth) {
                // 425px ~> minimum width of side col that's needed
                // at 768 resolution    ~> x:200/w:300
                // at 1200 resolution   ~> x:0/w:350
                let minSideWidth = 440, maxMidWidth = 280, offset, x, w;
                offset = minSideWidth - ((windowWidth - maxMidWidth) / 2);
                if (offset < 0) return {'x': 0, 'w': maxMidWidth};
                x = offset * 0.85;
                w = maxMidWidth - (offset * 0.15);
                return {'x': x, 'w': w};
            }

            function handleCtaBtnHoverIn() {
                TweenLite.to(this, 0.3, {'opacity': 1});
            }

            function handleCtaBtnHoverOut() {
                TweenLite.to(this, 0.3, {'opacity': 0.7});
            }

            function handleCtaWrapHoverIn() {
                let $activeScreen = $header.find('.mid-screen.active'),
                    $targetScreen = $header.find('.mid-screen.' + $(this).data('screen'));

                $activeScreen.removeClass('active');
                $targetScreen.addClass('active');

                TweenLite.to($activeScreen, 0.5, {'autoAlpha': 0});
                TweenLite.to($midScreenIntro, 0.2, {'autoAlpha': 0});

                if ($activeScreen.hasClass('mid-screen-intro')) {
                    TweenLite.set($midSmallLogo, {'top': $targetScreen.height() + 22});
                    TweenLite.to($midSmallLogo, 0.5, {'autoAlpha': 1});
                } else {
                    TweenLite.to($midSmallLogo, 0.5, {'autoAlpha': 1, 'top': $targetScreen.height() + 22});
                }

                TweenLite.fromTo($midSmallLogoLine, 0.8, {'width': 2}, {'ease': Power1.easeInOut, 'width': 170});
                TweenLite.to($targetScreen, 0.5, {'autoAlpha': 1});
            }

            function handleCtaWrapHoverOut() {
                let $activeScreen = $header.find('.mid-screen.active');
                TweenLite.to($activeScreen, 0.5, {'autoAlpha': 0});
                TweenLite.to($midSmallLogo, 0.2, {'autoAlpha': 0});
                TweenLite.to($midScreenIntro, 0.5, {'autoAlpha': 1});
                $activeScreen.removeClass('active');
                $midScreenIntro.addClass('active');
            }
        }

        // mobile header
        function setupMobileHeader() {
            let $header = $('.homepage-hero-header-mobile'),
                $allScreens = $header.find('.screen'),
                $introScreen = $header.find('.screen-intro'),
                $bsnsScreen = $header.find('.screen-business'),
                $homeScreen = $header.find('.screen-home'),
                $bsnsCta = $introScreen.find('.cta-list .cta.business'),
                $homeCta = $introScreen.find('.cta-list .cta.home'),
                $backBtn = $header.find('.back-btn');

            mobileSetup = true;
            desktopSetup = false;

            if (!$header.length) return;

            $bsnsCta.click(function(event) {
                event.preventDefault();
                TweenLite.fromTo($bsnsScreen, 0.5, {'x': '+=20', 'autoAlpha': 0}, {'x': 0, 'autoAlpha': 1});
                $allScreens.removeClass('active');
                $bsnsScreen.addClass('active');
            });

            $homeCta.click(function(event) {
                event.preventDefault();
                TweenLite.fromTo($homeScreen, 0.5, {'x': '+=20', 'autoAlpha': 0}, {'x': 0, 'autoAlpha': 1});
                $allScreens.removeClass('active');
                $homeScreen.addClass('active');
            });

            $backBtn.click(function() {
                let $activeScreen = $header.find('.screen.active');
                TweenLite.fromTo($activeScreen, 0.5, {'x': 0, 'autoAlpha': 1}, {'x': '-=10', 'autoAlpha': 0});
                $allScreens.removeClass('active');
                $introScreen.addClass('active');
            });
        }
    }
})();
