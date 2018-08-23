(function() {
    'use strict';
    angular.module('kappGlobal.notificationBarGeo')
        .controller('notificationBarGeoController', notificationBarGeoController);

    function notificationBarGeoController(windowHelperService, directiveData, errorService, appHelperService, cookieService, notificationBarGeoService, ENV, ngDialog, $window) {
        let ctrl = this,
            localeCode = windowHelperService.getIPCountry(),
            urlBlocklList = ['/renewal-center/home', '/downloads', '/downloads/thank-you/antivirus', '/downloads/thank-you/internet-security', '/downloads/thank-you/total-security', '/downloads/thank-you/free-antivirus-download', '/downloads/thank-you/security-scan',
                '/downloads/thank-you/antivirus-free-trial', '/downloads/thank-you/internet-security-free-trial', '/downloads/thank-you/total-security-free-trial', '/small-business-security/downloads', '/small-business-security/downloads/small-office-security',
                '/small-business-security/downloads/thank-you/small-office-security-free-trial'],
            isAssertedState = _.includes(urlBlocklList, appHelperService.getLocationPath());
        ctrl.bannerHidden = true;
        ctrl.closeNotification = closeNotification;
        ctrl.$onInit = activate;

        /**
         * Check whether to show the geo ip bar or not.
         * If the message should not show, the response will be empty.
         * Also, don't make any further calls if user has already chosen and has cookies
         */
        function activate() {
            let locale = ENV.locale;
            let hasCookie = cookieService.get('ignoreredirects');
            if (isAssertedState || hasCookie || locale.substr(3, 6) !== 'global') return false;
            ctrl.path = windowHelperService.getPathName();

            return notificationBarGeoService.getXMLRules(ctrl.path).then(response => {
                if (!response || (response.data && !response.data.length)) return;
                initialiseBindings();
                initialise(response.data[0]);
            }).catch(handleRejection);
        }

        function initialiseBindings() {
            ctrl.applyOption = applyOption;
            ctrl.regionObj = {};
        }

        /**
         * Set binding and get further data.
         * Also set the cookie to switch messages.
         * @param  {Object} response Response from promise
         */
        function initialise(response) {
            ctrl.targetUrl = response;
            getRegionConfigData();
            getData();
        }

        /**
         * Get the regions to match against IPCountry, and to find its label.
         */
        function getRegionConfigData() {
            return directiveData.get('/site-header/geoip-notification-config.json').then(response => {
                if (response && response.data.fields) ctrl.regionsConfig = response.data.fields;
                ctrl.regionObj = notificationBarGeoService.getRegionByCode(localeCode, ctrl.regionsConfig.regions);

                // value to interpolate from CMS component
                ctrl.site = ctrl.regionObj.site;
            }).catch(handleRejection);
        }

        /**
         * Get copy text for the messages
         */
        function getData() {
            return directiveData.get(ctrl.resource || '/site-header/geoip-notification-bar.json').then(response => {
                ctrl.data = response.data.fields;
                cookieService.set('ignoreredirects', true, 7);

                if (ctrl.regionObj.lang === 'en-za' ||
                    ctrl.regionObj.lang === 'en-tr' ||
                    ctrl.regionObj.lang === 'tr-tr') {
                    ctrl.overlayEnabled = true;
                    callNotificationPopup();
                } else {
                    ctrl.bannerHidden = false;
                }

            }).catch(handleRejection);
        }

        /**
         * Send error to service
         * @param  {object} rejection [description]
         */
        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        /**
         * Redirect user and append tracking
         */
        function applyOption($event, path) {
            if ($event) $event.preventDefault();
            cookieService.set('ignoreredirects', false, 7);
            let url = (path || ctrl.targetUrl.host) + ctrl.path;
            return windowHelperService.navigateUserTo(`//${url}?ignoreredirects=true&utm_source=Internal&utm_medium=Redirect&utm_campaign=IP_Redirect_Pilot&reseller=${ctrl.regionObj.lang}_ip-pilot_oth_ona_oth__onl_b2c_kasper_ban_______`);
        }

        /**
         * Function to call the ngDialog popup
         */
        function callNotificationPopup() {
            ngDialog.open({
                'template': '/apps/kapp/modules/_shared/components/notification-bar-geo/templates/notification-bar-geo-popup.html',
                'className': 'ngdialog-plain geo-notification-popup',
                'data': ctrl,
                'closeByDocument': false,
                'showClose': false,
                'onOpenCallback': () => {
                    $window.trackPageView('Home > Geo Redirect Suggestion Popup');
                }
            });
        }

        /**
         * Function for the ngDialog close button
         */
        function closeNotification($event) {
            if ($event) $event.preventDefault();
            ngDialog.close();
        }
    }
})();
