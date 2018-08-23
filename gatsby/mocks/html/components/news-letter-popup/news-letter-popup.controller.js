(function() {
    'use strict';

    angular.module('kappGlobal.newsLetterPopup')
        .controller('newsLetterPopupController', newsLetterPopupController);

    function newsLetterPopupController($scope, $rootScope, $q, $element, $timeout, $window, $document, marketoHelperService, newsLetterConfigService, sessionStorageService) {
        const ctrl = this,
            storageKey = 'newsletter-popup-status';

        ctrl.formData = {};
        ctrl.show = false;

        ctrl.$onInit = () => {
            function loadPopupConfigForRoute() {
                newsLetterConfigService.getConfigForCurrentPage()
                    .then(ctrl.applyConfig);
            }

            $scope.$on('$locationChangeSuccess', () => {
                $element.find('.news-letter-popup form').empty();
                loadPopupConfigForRoute();
            });

            loadPopupConfigForRoute();
        };

        ctrl.$onDestroy = () => {
            ctrl.clearShowHideHandler();
        };

        ctrl.clearShowHideHandler = () => {
            if (ctrl.onWindowScroll) {
                angular.element($window).off('scroll', ctrl.onWindowScroll);
                delete ctrl.onWindowScroll;
            }
            if (ctrl.showHideTimeout) {
                $timeout.cancel(ctrl.showHideTimeout);
                delete ctrl.showHideTimeout;
            }
        };

        ctrl.applyConfig = config => {
            const hasValidConfig = config && config.formId && config.formNr;

            if (!hasValidConfig) {
                ctrl.show = false;
                return;
            }

            ctrl.show = true; // Marketo requires the element to be in the DOM
            ctrl.loaded = false;

            ctrl.header = config.header;
            ctrl.footer = config.footer;
            ctrl.formNr = config.formNr;
            ctrl.popupWidth = config.popupWidth;

            // because the formId is set in the current function
            // we need to wait for the digest to kick in before calling Marketo
            // as it requires the element with the ID to be in the DOM
            $timeout(() => {
                marketoHelperService.loadMarketo(config.formId, config.formNr, $scope, $element)
                    .then(() => {
                        ctrl.loaded = true;
                    })
                    .then(() => ctrl.evaluatePopupHeight())
                    .then(() => {
                        ctrl.setOpenStatus(config.status);
                    });
            });
        };

        ctrl.evaluatePopupHeight = () => {
            const deferred = $q.defer();

            // force the popup to open in a hidden part of the screen
            ctrl.opened = true;
            $element.css({'visibility': 'hidden', 'bottom': -100000});

            // give time for rendering
            requestAnimationFrame(() =>
                requestAnimationFrame(() => {
                    // evaluate the height the popup should take at the end of the animation
                    ctrl.popupMaxHeight = Math.min($window.innerHeight - 25, $element.find('.news-letter-popup').outerHeight());

                    // reset the styles and opening status
                    $element.css({'visibility': '', 'bottom': ''});
                    delete ctrl.opened;
                    $scope.$apply();

                    deferred.resolve();
                }));

            return deferred.promise;
        };

        /**
         * "opened"/"closed" opened/closed on page load
         * "opened-25%"/"closed-25%" opened/closed after scrolling 25% of the page
         * "opened-15s"/"closed-15s" opened/closed after 15s
         *
         * @param status
         */
        ctrl.setOpenStatus = status => {
            if (!status) return;

            if (sessionStorageService.get(storageKey) === 'closed' || status === 'closed') {
                ctrl.opened = false;
                return;
            }

            if (status === 'opened' || status === 'closed') {
                setPopupOpenStatus(true, true);
                return;
            }

            const split = status.split('-'),
                unit = parseInt(split[1]),
                type = split[1].indexOf('%') !== -1
                    ? 'scroll'
                    : split[1].indexOf('s') !== -1 ? 'time' : undefined;

            if (split[0] === 'closed') {
                // is opened first, will close after scroll
                setPopupOpenStatus(true, true);
            }
            else {
                ctrl.opened = false;
            }

            if (type === 'scroll') {
                if (ctrl.onWindowScroll) return;

                ctrl.onWindowScroll = _.throttle(() => {
                    const scrolledPastPoint = unit <= ctrl.getWindowScrollPct();

                    setPopupOpenStatus(split[0] === 'opened' ? scrolledPastPoint : !scrolledPastPoint, true);

                    $scope.$apply();
                }, 500);

                angular.element($window).on('scroll', ctrl.onWindowScroll);
            }
            else if (type === 'time') {
                ctrl.showHideTimeout = $timeout(() => {
                    setPopupOpenStatus(split[0] === 'opened', true);
                }, unit * 1000);
            }
        };

        // $window.pageYOffset is for IE compatibility
        ctrl.getWindowScrollPct = () => 100 / ($document[0].body.scrollHeight / (angular.isDefined($window.scrollY) ? $window.scrollY : $window.pageYOffset));

        ctrl.open = () => setPopupOpenStatus(true);

        ctrl.close = () => setPopupOpenStatus(false);

        function setPopupOpenStatus(status, noSave) {
            if (ctrl.opened === status) return;

            ctrl.opened = status;

            if (status) {
                $window.trackPageView(`${$rootScope.kaspersky.pageName} > Special Offers Opt-in Popup`);
            }

            if (noSave) return;

            ctrl.clearShowHideHandler(); // clear to prevent configured event to trigger after user interaction

            if (!status) {
                sessionStorageService.set(storageKey, 'closed');
            }
        }

    }
})();
