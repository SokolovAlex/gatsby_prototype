(function() {
    'use strict';
    angular.module('kappGlobal.pageHeader')
        .controller('pageHeaderController', pageHeaderController);

    function pageHeaderController($timeout, $q, $anchorScroll, $location, directiveData, $sce, $http, ENV, $element, windowHelperService, appHelperService, errorService, ngDialog, productData, priceData, geoLocationManager, $rootScope, $scope) {
        let ctrl = this,
            $dialog = ngDialog;
        ctrl.data = {};
        ctrl.contentUrl = '';
        ctrl.env = ENV.locale;
        ctrl.videoPopup = videoPopup;
        ctrl.$onInit = activate;
        ctrl.getEltClass = getEltClass;
        ctrl.getBannerButtonClass = getBannerButtonClass;
        ctrl.navigateUserTo = windowHelperService.navigateUserTo;
        ctrl.isTotal = appHelperService.assertStateByName('smb-product-total');
        ctrl.scrollToBuy = scrollToBuy;

        let currencyChange = $rootScope.$on('currencyChange', handleCurrencyChange);

        function activate() {
            getData();
            if (ctrl.env === 'en\-global') blockProhibitedCountries();
        }

        function handleCurrencyChange() {
            if (ctrl.currency === $rootScope.currency || !ctrl.data.productShortName) return;
            ctrl.currency = $rootScope.currency;
            getMinPrice();
        }

        function handleScopeDestroyed() {
            currencyChange();
        }

        $scope.$on('$destroy', handleScopeDestroyed);

        function getData() {
            // Get B2C resource center category header path

            let b2cResourceCenterCatHeaderState = appHelperService.assertStateByName(['b2c-resource-center.category', 'b2c-resource-center.category-details']);

            if (b2cResourceCenterCatHeaderState && !ctrl.resource) ctrl.resource = '/home-security' + $location.path() + '/page-header.json';

            // format resource attribute environment path

            if (ctrl.resource) ctrl.resource = ctrl.resource.replace(/cur-locale/, ctrl.env);

            return directiveData.getByUrl(ctrl.resource || 'page-header').then(response => {
                const data = response.data.fields;
                ctrl.data = data;
                ctrl.id = response.data.id;
                ctrl.contentUrl = data.imageUrl ? $sce.trustAsResourceUrl(data.imageUrl) : '';

                const moreToLoad = [
                    directiveData.getLocal('general-translations').then(res => ctrl.localData = res.data.fields)
                ];

                if (data.headerType && data.headerType.indexOf('Buyblock') > -1 && data.moreLink.product) {
                    moreToLoad.push(
                        directiveData.getByUrl(data.moreLink.product).then(res => ctrl.productInfo = res.data.fields)
                    );
                }

                if (data.surtitle && data.header) {
                    const bigText = data.bigText || '';
                    data.imageAlt = data.surtitle + ' ' + data.header + ' ' + bigText;
                }

                runScript();
                if (ctrl.data.productShortName) getMinPrice();

                if (ctrl.data.header === 'Security Cloud') buyblockData();

                ctrl.isHeadlineDisplayed = isHeadlineDisplayed();
                ctrl.isOverlayDisplayed = isOverlayDisplayed();

                if (data.quickmenuButtons && data.quickmenuButtons.length) data.quickmenuButtons.forEach((item, index) => {
                    if (!item.product || !item.product.match(/\.json/)) return;

                    moreToLoad.push(
                        $http.get(item.product, {'cache': true}).then(res => ctrl.data.quickmenuButtons[index].product = res.data.fields)
                    );
                });

                return $q.all(moreToLoad);
            }, handleRejection);
        }

        function buyblockData() {
            return directiveData.getLocal('buyblock/buyblock-texts')
                .then(response => {
                    ctrl.buyblockData = response.data.fields;
                });
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

        function runScript() {
            $timeout(() => {
                // About Us Page Header

                var $mainMenu = $($element).find('#site-header .main-menu');

                $($element).find('.about-us-page-header .cta-scroll').click(function(e) {
                    e.preventDefault();
                    var $scrollTo = $($(this).attr('href'));
                    if ($scrollTo.length) {
                        $('html,body').animate({
                            'scrollTop': $scrollTo.offset().top - $mainMenu.outerHeight(true)
                        }, 1000);
                    }
                });
                $($element).find('.toggle-button').click(function(e) {
                    e.preventDefault();

                    var $this = $(this);

                    $this.closest('.toggle-container').find('.toggle-content').slideToggle();
                    $this.closest('.toggle-container').toggleClass('open');
                });
                $($element).find('.read-less').click(function(e) {
                    e.preventDefault();

                    $location.hash('smb-more-description-id');
                    $anchorScroll();
                });

                if ($location.hash()) $anchorScroll();

            });
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        function blockProhibitedCountries() {
            if (geoLocationManager.isKscProhibitedCountry()) {
                ctrl.isProductBlocked = true;
            }
        }

        function getEltClass() {
            const headerType = ctrl.data.headerType;
            return {
                'product-header': headerType === 'Blank' || headerType === 'SMB Product' || headerType === 'SMB Targeted Solution',
                'no-breadcrumbs': ctrl.data.hideBreadcrumbs === 'Yes',
                'no-headlines': !isHeadlineDisplayed(),
                'image-bg': ctrl.data.bannerImage !== null && headerType !== 'About Team Header',
                'about-us-page-header': headerType === 'About Team Header',
                'page-header': headerType !== 'About Team Header',
                'small-header': headerType === 'SMB Product',
                'taller-header': headerType === 'Taller header',
                'ksc-header': headerType === 'KSC'
            };
        }

        function isHeadlineDisplayed() {
            const headerType = ctrl.data.headerType;
            return headerType === undefined || [
                'Blank',
                'SMB Product',
                'SMB Targeted Solution',
                'B2C Thank You V2',
                'About Team Header',
                'SMB MSP',
                'KSC'
            ].indexOf(headerType) === -1;
        }

        function getBannerButtonClass(pos) {
            const bannerBtns = ctrl.data.bannerbuttons;

            if (pos === 'left') {
                return {
                    'col-l-8': bannerBtns.length === 1,
                    'col-xl-9': ctrl.data.padButtons === 'Yes' && bannerBtns.length === 1,
                    'col-l-12 col-xl-7': bannerBtns.length > 1
                };
            }

            return {
                'col-l-4': bannerBtns.length === 1,
                'col-xl-3 no-gutter': ctrl.data.padButtons === 'Yes' && bannerBtns.length === 1,
                'col-l-12 col-xl-5': bannerBtns.length > 1
            };
        }

        function isOverlayDisplayed() {
            return [
                'Blank',
                'SMB Product',
                'SMB Targeted Solution',
                'B2C Thank You V2',
                'B2C Thank You V1',
                'KSC'
            ].indexOf(ctrl.data.headerType) === -1;
        }

        function getMinPrice() {
            return productData.getb2c(ctrl.data.productShortName)
                .then((response) => {
                    priceData.getPrice(response.data.fields.title, 'Purchase')
                        .then((response) => {
                            ctrl.minPrice = response.data[0] && response.data[0].price;
                        }, handleRejection);
                });
        }

        function scrollToBuy(event) {
            let anchor = event.currentTarget.attributes['href'].nodeValue;
            event.preventDefault();

            $location.hash(anchor);
            $anchorScroll();
        }
    }
})();
