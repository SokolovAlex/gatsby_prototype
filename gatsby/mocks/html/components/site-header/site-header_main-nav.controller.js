(function() {
    'use strict';
    angular.module('kappGlobal.siteHeader')
        .controller('mainNavController', mainNavController);

    function mainNavController($state, $window, rootScopeHelper, geoLocationManager, appHelperService, directiveData, templateVersion, $scope, $rootScope, ENV, $document, windowHelperService, errorService) {
        let ctrl = this,
            curUrl = $state.href($state.current.name, $state.params, {'absolute': true}),
            geoIP  = geoLocationManager.getUserGeoIp(curUrl),
            stateData;

        const states = ['search', 'lrc-serial', 'lrc-verdict'];

        ctrl.showMenu = !appHelperService.assertStateByName(states);
        ctrl.makeActive = makeActive;
        ctrl.getTemplateUrl = getTemplateUrl;
        ctrl.$onInit = activate;
        ctrl.$onDestroy = destroyGlobalListeners;
        ctrl.getInnerItems = getInnerItems;
        ctrl.hideGetInTouchCta = hideGetInTouchCta;
        ctrl.navigateUserTo = windowHelperService.navigateUserTo;
        ctrl.isVPN  = geoLocationManager.isVpnProhibitedCountry(geoIP);

        // Switching the highlighted nav panel item on stateChange
        let stateChangeSuccessListener = $rootScope.$on('$stateChangeSuccess', updateActiveNav);

        function updateActiveNav() {
            stateData = appHelperService.getCurrentStateData() || {};
            stateData.navIndex = overrideNavIndex() || stateData.navIndex;
            if (stateData.navIndex > -1) makeActive(stateData.navIndex);
        }

        function getMainNav() {
            return directiveData.getBySection('main-nav').then((response) => {
                ctrl.entData = response.data.fields.rightMenuItem;
            }, handleRejection);
        }

        function  getInnerItems(event, skip) {
            ctrl.siteHeader.getInnerItems(event, skip);
        }

        function activate() {
            getData();
            updateActiveNav();
            if (appHelperService.stateIncludes('enterprise')) setENTStateNavIndex();
            if (appHelperService.assertStateByName(['smb-home', 'vsb-home'])) {
                getMainNav().then(() => {
                    if (ctrl.entData.ctaLink) overrideSearch();
                });
            }
        }

        rootScopeHelper.on($scope, 'ngRender', updateUtm);

        function updateUtm() {
            directiveData.getByUrl('meta').then(response => {
                ctrl.utm = response.data.fields.utm;
            }).catch(handleRejection);
        }

        function hideGetInTouchCta() {
            const states = ['enterprise-wiki-section', 'enterprise-wiki-section-home'];

            return !appHelperService.assertStateByName(states) && !ctrl.utm;
        }

        function destroyGlobalListeners() {
            angular.element(window).off('scroll.mainNavController');
            stateChangeSuccessListener();
        }

        function setENTStateNavIndex() {
            let sts = ['enterprise-resources', 'enterprise-resource', 'enterprise-case-studies-ferrari'];
            getTemplateVersion().then(function(response) {
                if (sts.indexOf(appHelperService.getCurrentState()) > -1 && response.template === '2.0') {
                    makeActive(4);
                }
                if (response.template === '3.0') {
                    getMainNav();
                    overrideSearch();
                }
            }, handleRejection);
        }

        function getTemplateVersion() {
            return templateVersion.getVer('enterprise-security', 'ent-hp-menu', 'meta').then(function(response) {
                return response.data.fields;
            }, handleRejection);
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        function getTemplateUrl(template) {
            if (template) return `/apps/kapp/modules/_shared/components/site-header/templates/site-header_mega-menu__${template}.html`;
        }

        function makeActive(index) {
            ctrl.activeState = index;
        }

        function getData() {
            return directiveData.getLocal('general-translations').then((response) => {
                ctrl.generalData = response.data.fields;
            }, handleRejection);
        }

        function overrideRuNavIndex() {
            let smbDownloads = 'small-to-medium-business-security/downloads';
            if (appHelperService.stateIncludes('partners') && stateData.navIndex > 2) return ++stateData.navIndex;
            if (appHelperService.stateIncludes('vsb') && stateData.navIndex > 1) return ++stateData.navIndex;
            if (appHelperService.stateIncludes('home-security-section') && stateData.navIndex > 1) return ++stateData.navIndex;
            if (appHelperService.assertStateByName('smb-how-to-buy')) return 2;
            if (appHelperService.assertStateByName(['smb-resources-center', 'smb-resources-category'])) return 6;
            if (appHelperService.getCurrentState().substr(0, 3) === 'lrc') return 2;
            if (windowHelperService.getPathName().indexOf(smbDownloads) > -1) return 4;
        }

        function overrideJpNavIndex() {
            if (appHelperService.getCurrentState().indexOf('partners-technology') > -1) return 2;
            if (appHelperService.assertStateByName(['resources-center', 'resources-category'])) return 3;
            if (appHelperService.assertStateByName(['vsb-downloads', 'vsb-download', 'vsb-download-success'])) return 1;
            if (appHelperService.assertStateByName('partners-technology-partnership')) return 2;
            if (appHelperService.assertStateByName('partners-whitelist-program')) return 3;
        }

        // Used to override selected item in Navigation based on locale
        function overrideNavIndex() {
            if (ENV.locale === 'ru-ru') return overrideRuNavIndex();
            if (ENV.locale === 'ja-jp') return overrideJpNavIndex();
            if (ENV.locale === 'en-us') {
                let currentState = appHelperService.getCurrentState();
                switch (currentState) {
                case 'vsb-downloads':
                    return 1;
                case 'vsb-contact-us':
                    return 2;
                case 'resources-center':
                    return 3;
                }
            }
            return false;
        }

        function overrideSearch() {
            angular.element($window).on('scroll.mainNavController', function() {
                if ($window.scrollY) ctrl.hideSearch = $window.scrollY >= 150;
                else if ($document[0].documentElement.scrollTop) ctrl.hideSearch = $document[0].documentElement.scrollTop >= 150;
                else ctrl.hideSearch = false;
                $scope.$digest();
            });
        }
    }
})();
