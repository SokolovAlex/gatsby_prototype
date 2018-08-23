(function() {
    'use strict';
    angular.module('kappGlobal.footerGlobal')
        .controller('footerGlobalController', footerGlobalController);

    function footerGlobalController($q, $state, directiveData, SETUP, errorService, windowHelperService, ENV, appHelperService) {
        let ctrl = this,
            noCustomFooter, newsletterEnabled;

        ctrl.data = {};
        ctrl.cCountry = `${SETUP.country}`;
        ctrl.year = new Date();
        ctrl.displayRssLink = true;
        ctrl.locale = ENV.locale;
        ctrl.$onInit = activate;
        ctrl.toggleSelector = toggleSelector;
        ctrl.closeSelector = closeSelector;
        ctrl.displayNewsletterForm = displayNewsletterForm;
        ctrl.handleNewsletterLoaded = handleNewsletterLoaded;
        ctrl.isB2B = $state.current.parent === 'smb' || $state.current.parent === 'vsb';
        ctrl.isENT = $state.current.parent === 'enterprise';

        function activate() {
            let promises = [getFooterBySection(), getCountrySelector()];
            $q.all(promises);

            if (['big', 'small'].indexOf(ctrl.size) !== -1) {
                ctrl.bigFooter = ctrl.size === 'big';
                ctrl.smallFooter = ctrl.size === 'small';
            }
            else {
                if ($state.current.parent === 'home-security-section' || $state.current.name === 'search') {
                    ctrl.bigFooter = true;
                } else {
                    ctrl.smallFooter = true;
                }
            }

            ctrl.isJP = isJP();

        }

        function getFooterBySection() {
            return directiveData.getBySection('footer').then(response => {
                if (response && response.data.fields) {
                    ctrl.data = response.data.fields;
                    setDisplayRssLink(ctrl.data);
                }
            }, (rejection) => {
                errorService.warn(rejection);
                noCustomFooter = true;
            }).then(getFooterData);
        }

        function getFooterData() {
            return directiveData.getLocal('footer/footer').then((response) => {
                overrideCopyrightForSMB_VSB_ENT(response.data.fields);
                ctrl.generalFooterData = response.data.fields;
                setDisplayRssLink(ctrl.generalFooterData);
                if (noCustomFooter) ctrl.data = ctrl.generalFooterData;
            }, handleRejection);
        }

        /**
         * Overrides copyright value based on
         * https://jira.kaspersky.com/browse/SMB-4260
         * https://jira.kaspersky.com/browse/GWP-33973
         * @param data
         */
        function overrideCopyrightForSMB_VSB_ENT(data) {
            const pathname = windowHelperService.getPathName(),
                getOverride = key => data[key] ? data[key] : data.copyright;

            if (pathname === '/renewal-center/smb') {
                data.copyright = getOverride('copyright-smb');
            }
            else if (pathname === '/renewal-center/vsb') {
                data.copyright = getOverride('copyright-vsb');
            } else if (ctrl.isENT) {
                data.copyright = getOverride('copyright-ent');
            }
        }

        function getCountrySelector() {
            return directiveData.getLocal('footer/country-selector').then((response) => {
                if (response.data && response.data.fields) {
                    ctrl.cSelector = response.data.fields.Body;
                }
            }, handleRejection);
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        function toggleSelector($event) {
            $event.preventDefault();
            const $footer = $('.footer-selector');
            $($event.currentTarget).toggleClass('active');
            $footer.slideToggle(400);
            $('html, body').animate({
                'scrollTop': $footer.offset().top - 20
            }, 700);
        }

        function closeSelector($event) {
            $('.footer-selector').slideToggle(500);
            $('.country-selector-button').removeClass('active');
            $event.preventDefault();
        }

        function setDisplayRssLink(data) {
            if (data && data.rssLink && data.rssLink.hide[0] === 'Yes') ctrl.displayRssLink = false;
        }

        function handleNewsletterLoaded(componentEnabled) {
            newsletterEnabled = componentEnabled;
        }

        function displayNewsletterForm() {
            return !windowHelperService.isMobile() || newsletterEnabled;
        }

        function isJP() {
            return appHelperService.assertStateByName(['product-kss', 'product-kfa', 'kfa-thank-you']) && ctrl.locale === 'ja-jp';
        }
    }
})();
