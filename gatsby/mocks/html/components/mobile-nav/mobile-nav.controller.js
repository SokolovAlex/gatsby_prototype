(function() {
    'use strict';
    angular.module('kappGlobal.mobileNav')
        .controller('mobileNavController', mobileNavController);

    function mobileNavController($rootScope, $http, $window, directiveData, currencyManager, ENV, $scope, $timeout, $element, errorService) {
        let ctrl = this,
            hasRun,
            innerHasRun = {};

        ctrl.data = {};
        ctrl.currencies = getCurrencies();
        ctrl.openCurrencyMenu = false;
        ctrl.showCurrencyMenu = ctrl.showCurrencyMenu || true;
        ctrl.showCurrencySelector = ctrl.showCurrencySelector || false;
        ctrl.backBtnText = '';
        ctrl.setCurrency = setCurrency;
        ctrl.setupMobileNavigation = setupMobileNavigation;
        ctrl.$onInit = activate;
        ctrl.getInnerItems = getInnerItems;

        function activate() {
            setupMobileNavigation();
        }

        function getData() {
            getLocalizedText();
            return $http.get(`/content/${ENV.locale}/site-header/mobile-nav.json`, {'cache': true}).then((response) => {
                ctrl.data = response.data.fields;
                if (ctrl.data) ctrl.backBtnText = ctrl.data.nav_ui_back_btn;
            }, handleRejection);
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        function getInnerItems(item) {
            if (innerHasRun[item.nav_panel_class]) return;
            innerHasRun[item.nav_panel_class] = true;
            if (item.nav_panel_component && item.nav_panel_component.match(/\.json/)) {
                return $http.get(item.nav_panel_component, {'cache': true}).then((response) => {
                    item.nav_panel_component = response.data.fields;

                    ctrl.innerMenu = item.nav_panel_component.mainNavItem.filter((obj) => {
                        return angular.isDefined(obj.megaMenuItem) && obj.megaMenuItem.match(/\.json/);
                    });

                    ctrl.innerMenu.forEach((subItem) => {
                        return $http.get(subItem.megaMenuItem, {'cache': true}).then((response) => {
                            subItem.megaMenuItem = response.data.fields;
                            subItem.megaMenuItem.product.forEach((product, idx2) => {
                                return $http.get(product, {'cache': true}).then((response) => {
                                    return subItem.megaMenuItem.product[idx2] = response.data.fields;
                                }, handleRejection);
                            });
                            if (subItem.megaMenuItem.megaMenuGroups) {
                                subItem.megaMenuItem.megaMenuGroups.forEach((menuGroups, idx3) => {
                                    subItem.megaMenuItem.megaMenuGroups[idx3].groupProduct.forEach((grpProduct, idx4) => {
                                        if (grpProduct.match(/\.json/)) {
                                            return $http.get(grpProduct, {'cache': true}).then((response) => {
                                                return subItem.megaMenuItem.megaMenuGroups[idx3].groupProduct[idx4] = response.data.fields;
                                            }, handleRejection);
                                        }
                                    });
                                });
                            }
                        }, handleRejection);
                    });
                }, handleRejection);
            }
        }

        function getLocalizedText() {
            return directiveData.getLocal('buyblock/buyblock-texts', {'cache': true}).then((response) => {
                ctrl.localization = response.data.fields;
            }, handleRejection);
        }

        function getCurrencies() {
            ctrl.currencies = currencyManager.getCurrencies();
            ctrl.currentCurrency = currencyManager.getCurrentCurrencyFromCache() || ctrl.currencies[0];
            return ctrl.currencies;
        }

        function setCurrency(item) {
            ctrl.currentCurrency = item;
            return currencyManager.setCurrency(item);
        }

        let buyblockReady = $rootScope.$on('buyBlockReady', () => {
            ctrl.showCurrencySelector = ctrl.currencies.length > 1;
        });

        $scope.$on('$destroy', () => {
            buyblockReady();
            // When element is destroyed we need to clean up a class on html tag
            angular.element($window.document.querySelector('html')).removeClass('mobile-navigation-opened');
            $($element).parent().find('.menu-toggle.open').removeClass('open');
            $($window).off('scroll.home');
        });

        function setupMobileNavigation() {
            let mobileMenuWrapper = angular.element($window.document.querySelector('.mobile-menu-wrapper')),
                htmlTag = angular.element($window.document.querySelector('html'));


            $('a.menu-toggle').on('click.mobileNav', function(e) {
                e.preventDefault();
                if (!hasRun) {
                    getData();
                    hasRun = true;
                }
                $(this).toggleClass('open');
                htmlTag.toggleClass('mobile-navigation-opened');
                mobileMenuWrapper.toggleClass('show');

            });

            $element.on('click', 'ul.mobile-nav li.parent > a', function(e) {
                let $this = $(this),
                    parentTitle = $this.parent().attr('data-parent'),
                    parentIcon = $this.parent().attr('data-icon'),
                    parentURL = $this.parent().attr('data-url'),
                    $subMenu = $this.siblings('ul.submenu'),
                    hasIcon;

                e.preventDefault();
                e.stopImmediatePropagation();

                if (!($subMenu).hasClass('generated')) {
                    hasIcon = '';
                    if (parentIcon) hasIcon = ' has-icon';

                    if (parentURL) {
                        $this.siblings('ul.submenu').prepend('<li class="back"><a href="#">' + ctrl.backBtnText + '</a></li><li class="title has-link' + hasIcon + '"><a href="' + parentURL + '"><span><i class="' + parentIcon + '"></i>' + parentTitle + '</span></a></li>');
                    } else if (parentTitle) {
                        $this.siblings('ul.submenu').prepend('<li class="back"><a href="#">' + ctrl.backBtnText + '</a></li><li class="title' + hasIcon + '"><span><i class="' + parentIcon + '"></i>' + parentTitle + '</span></li>');
                    } else {
                        $this.siblings('ul.submenu').prepend('<li class="back"><a href="#">' + ctrl.backBtnText + '</a></li>');
                    }
                }

                $this.siblings('ul.submenu').addClass('show generated');
                $this.closest('ul.submenu').addClass('push-back');
            });

            $element.on('click', 'li.back > a', function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                $(this).closest('ul.submenu').removeClass('show');
                $(this).closest('ul.submenu.push-back').removeClass('push-back');
            });

            /*
            * Set a listener for all clicks on anchors within the element so that
            * we can close mobile navigation and control .menu-toggle icon.
            * Requires event propogation to be switched off on all submenus (which are anchors as well)
            * */
            $element.on('click', 'a', function() {
                angular.element($window.document.querySelector('html')).removeClass('mobile-navigation-opened');
                angular.element($window.document).find('.mobile-menu-wrapper').removeClass('show');
                $($element).parent().find('.menu-toggle.open').removeClass('open');
            });

            let windowResize = angular.element($window),
                windowResizeThrottle;

            windowResize.on('resize.mobileNav', function() {
                clearTimeout(windowResizeThrottle);
                windowResizeThrottle = $timeout(function() {
                    if ($window.innerWidth >= 769 && htmlTag.hasClass('mobile-navigation-opened')) {
                        $('a.menu-toggle').trigger('click');
                    }
                }, 200);
            });
        }
    }
})();
