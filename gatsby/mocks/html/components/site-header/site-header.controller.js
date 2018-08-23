(function() {
    'use strict';
    angular.module('kappGlobal.siteHeader')
        .controller('siteHeaderController', siteHeaderController);

    function siteHeaderController($http, directiveData, appHelperService, windowHelperService, $scope, $q, errorService, rootScopeHelper, $timeout, $element, ENV) {
        let ctrl = this,
            hasRun,
            promises = [],
            timeoutPromise = [];

        ctrl.showMenuUtility = !appHelperService.assertStateByName('search');
        ctrl.getMainNav = getMainNav;
        ctrl.$onInit = activate;
        ctrl.$onDestroy = destroyGlobalListeners;
        ctrl.getInnerItems = getInnerItems;
        ctrl.isMobile = windowHelperService.isMobile();
        ctrl.hideGetInTouchCta = hideGetInTouchCta;
        ctrl.hasCrimeStopperLogo = hasCrimeStopperLogo;
        ctrl.navigateUserTo = windowHelperService.navigateUserTo;

        angular.element(window).on('resize.siteHeader', function() {
            ctrl.isMobile = windowHelperService.isMobile();
            $scope.$digest();
        });

        function activate() {
            getMainNav();
        }

        rootScopeHelper.on($scope, 'ngRender', updateUtm);

        function updateUtm() {
            directiveData.getByUrl('meta').then(response => {
                ctrl.utm = response.data.fields.utm;
            }).catch(handleRejection);
        }

        function hasCrimeStopperLogo() {
            const states = ['home-security', 'product-kss'];
            return appHelperService.assertStateByName(states) && ENV.locale === 'en-au';
        }

        function hideGetInTouchCta() {
            const states = ['enterprise-wiki-section', 'enterprise-wiki-section-home'];

            return !appHelperService.assertStateByName(states) && ctrl.rightMenuItem && ctrl.rightMenuItem.ctaText && ctrl.rightMenuItem.ctaLink;
        }

        function destroyGlobalListeners() {
            angular.element(window).off('resize.siteHeader');
        }

        function getMainNav() {
            return directiveData.getBySection(ctrl.resource || 'main-nav').then((response) => {
                ctrl.data = response.data.fields;
                ctrl.mainNavItems = response.data.fields['mainNavItem'];
                ctrl.rightMenuItem = response.data.fields.rightMenuItem;
                $timeout(() => {
                    let totalHeight = $($element).find('.site-top').outerHeight(true) + $($element).find('.site-header .site-title').outerHeight(true);
                    $element.attr('site-top-height', totalHeight);
                });
            }, handleRejection);
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        function getInnerItems(event) {
            // Megamenu disappearance with delay
            if (event.type === 'mouseleave' && $($element).find('li.hover').length) {
                // When we leave the menu item, add a $timeout promise to "queue" - array of promises "timeoutPromise"
                // as soon as timeout promise is resolved, remove class hover and remove an item from the array
                // if at the moment of timeout Promise resolution we hover over other nav item with
                // megamenu enabled, then add .hover to that one

                timeoutPromise.push([$timeout((target) => {
                    $element.find(target).removeClass('hover');
                    timeoutPromise.pop();

                    if (!timeoutPromise.length && $('.main-menu > .dropdown:hover').length) {
                        $('.main-menu > .dropdown:hover').addClass('hover');
                    }
                }, 300, true, event.currentTarget), event.currentTarget]);
            } else if (event.type === 'mouseenter') {
                // If the user moved cursor away from megamenu and returned within the timeout delay value
                // cancel the promise and leave the current megamenu hovering
                timeoutPromise = timeoutPromise.filter(timer => {
                    if (event.currentTarget === timer[1]) {
                        $timeout.cancel(timer[0]);
                        return false;
                    }
                    else return timer;
                });
                // If there are no megamenus with .hover and pending $timeout promise for disappearance and the cursor
                // is on top of megamenu item add class hover to it
                if (!timeoutPromise.length && $('.main-menu > .dropdown:hover').length) $(event.currentTarget).addClass('hover');
            }

            if (hasRun) return false;
            hasRun = true;

            ctrl.mainNavItems.forEach((item, index) => {
                if (item.megaMenuItem && item.megaMenuItem.match(/\.json/)) {
                    return $http.get(item.megaMenuItem, {'cache': true}).then((response) => {
                        const megaMenuItem = ctrl.mainNavItems[index].megaMenuItem = response.data.fields;

                        if (megaMenuItem.megaSideBlock2) {
                            // megaSideBlock2 could be HTML commented out
                            // strip out comments and white spaces to avoid creating an additional list item
                            megaMenuItem.megaSideBlock2 =
                                megaMenuItem.megaSideBlock2.replaceAll('<!--[\\s\\S]*?-->', '').trim();
                        }

                        if (megaMenuItem.product) {
                            megaMenuItem.product.forEach((product, idx2) => {
                                if (product.match(/\.json/)) {
                                    promises.push(getProductItems(product, index, idx2));
                                }
                            });
                        }
                        if (megaMenuItem.megaMenuGroups) {
                            megaMenuItem.megaMenuGroups.forEach((menuGroups, idx3) => {
                                ctrl.mainNavItems[index].megaMenuItem.megaMenuGroups[idx3].groupProduct.forEach((grpProduct, idx4) => {
                                    if (grpProduct.match(/\.json/)) {
                                        promises.push(getProductGroups(grpProduct, index, idx3, idx4));
                                    }
                                });
                            });
                        }
                        $q.all(promises).then(() => {
                            $timeout(() => {
                                $element.find('.main-menu > li > ul a').on('click', () =>
                                    $($element).find('li.hover').removeClass('hover')
                                );
                            });

                        });
                    }, handleRejection);
                }
            });
        }

        function getProductItems(product, index, idx2) {
            return $http.get(product, {'cache': true}).then((response) => {
                return ctrl.mainNavItems[index].megaMenuItem.product[idx2] = response.data.fields;
            }, handleRejection);
        }

        function getProductGroups(grpProduct, index, idx3, idx4) {
            return $http.get(grpProduct, {'cache': true}).then((response) => {
                return ctrl.mainNavItems[index].megaMenuItem.megaMenuGroups[idx3].groupProduct[idx4] = response.data.fields;
            }, handleRejection);
        }

        rootScopeHelper.on($scope, 'scrollNav', getScrollNavItems);

        function getScrollNavItems(event, items) {
            ctrl.scrollNavItems = items;
        }
    }
})();
