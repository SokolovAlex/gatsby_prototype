(function() {
    angular.module('kappGlobal.lrcVerdictPage')
        .controller('lrcVerdictPageController', lrcVerdictController);

    function lrcVerdictController(appHelperService, directiveData, productData, priceData, rootScopeHelper,
        $rootScope, $q, $anchorScroll,
        $location, errorService, $state, $scope, $timeout, $window,
        maxymiser, $http, $element, ENV, windowHelperService, $document, seoHelperService, templateVersion) {

        const DAYS_LEFT_THRESHOLD = 30;

        // localization //
        let ctrl = this,
            viewLoadedUnsub = $rootScope.$on('$viewContentLoaded', () => {
                $timeout(() => scrollToKscSection(), 2000);
            });

        $scope.$on('$destroy', () => viewLoadedUnsub());

        ctrl.$onInit = activate;
        ctrl.handleBuyblockUpdated = handleBuyblockUpdated;
        ctrl.isBuyblockEnabled = isBuyblockEnabled;
        ctrl.checkIPCountry = checkIPCountry;
        ctrl.getPageHeadline = getPageHeadline;
        ctrl.locale = appHelperService.getLocale();

        function activate() {
            ctrl.folder = ctrl.verdict.match(/[a-z0-9]+/i);
            checkEStoreAvailibity();

            handleVerdict();
            if (ctrl.verdictData) handleVerdictData();
            ctrl.locale = ENV.locale;
            ctrl.isB2B = false;
            ctrl.ipCountry = windowHelperService.getIPCountry();

            getTranslations();
            $timeout(() => { checkLostdaysNoPricing(); }, 3000);

            // TODO: add after promise
            addVerdictString();

            rootScopeHelper.on($scope, 'currencyChange', getPageHeadline($rootScope.currency));

            templateVersion.getVer('home-security', 'meta', 'products/kscloud/meta').then(function(response) {
                ctrl.templateVer = response && response.data.fields.template || '1.0';
            });
        }

        function checkIPCountry(currency) {
            const ipCountry = currency || $rootScope.currency ? currency || $rootScope.currency : ctrl.ipCountry;
            return [
                ipCountry !== 'DA',
                ipCountry !== 'DT',
                ipCountry !== 'DH'
            ].every(condition => condition);
        }

        function getPageHeadline(currency) {
            if (!ctrl.data) return;
            return ctrl.data.headline ? checkIPCountry(currency) ? ctrl.data.pageHeadline : ctrl.data.headline : ctrl.data.pageHeadline;
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        function getTranslations() {
            return directiveData.getLocal('general-translations').then((response) => {
                ctrl.translations = response.data.fields;
            }, handleRejection);
        }

        function handleBuyblockUpdated(section, product, values) {
            let targetSection = section !== 'top' ? 'top' : 'bottom';
            if (!_.isEqual(ctrl.bbData[targetSection][product], values)) {
                ctrl.bbData[targetSection][product] = values;
            }
        }

        function isBuyblockEnabled() {
            return _.get(ctrl, `data.buyblockDisabled[0]`) !== 'True';
        }

        /**
         * This is to apply the correct grammar case for the word 'days' in Russian. Depending on the number, it will end in one of the 3 cases below.
         * The general rule is: from 5 to 20, always use дней; other than that, look at the last digit of the number:
         * 1 => день
         * 2 to 4 => дня
         * 5 to 9, or 0 => дней
         * @return {String} The correct grammar case for 'days' in Russian
         */
        function parseRUDays() {
            let days = ctrl.verdictData.days_left;
            if ((days % 100 < 5) || (days % 100 > 20)) {
                if (days % 10 === 1) return 'день';
                if ((days % 10 > 1) && (days % 10 < 5)) return 'дня';
                return 'дней';
            } else {
                return 'дней';
            }
        }

        // function to get all products information in a promise
        function productsFetcher(products) {
            return $q.all(products.map(product => {
                if (product.match(/cloud|total|365|server|mobile|systems|gateway/i) || ctrl.data.productList.match(/(kes|endpoint|core|advanced|select)/ig)) {
                    return productData.getsmb(product)
                        .then(response => response.data.fields, handleRejection);
                } else if (ctrl.data.productList.match(/ksos/ig)) {
                    return productData.getvsb(product)
                        .then(response => response.data.fields, handleRejection);
                } else {
                    return productData.getb2c(product)
                        .then(response => response.data.fields, handleRejection);
                }
            }));
        }

        function checkLostdaysNoPricing() {
            let buyblocksOnPage = maxymiser.readComponentData($('buyblock-radio, buyblock-dropdown'));

            if (buyblocksOnPage > 0
                && buyblocksOnPage.every(element => element.priceList && element.priceList.length === 0)) {
                $state.go('lrc-b2c',
                    {'lostDaysDisclaimerFullText': ctrl.translations['NO_PRICING_OPTIONS']},
                    {'location': false, 'inherit': true});
            }
        }

        function setRemainingDaysMetaTags() {
            let remainingDaysMetaObj = {
                'RemainingDaysUntilExpiration': ctrl.verdictData.days_left,
                'DaysAfterExpiration': ctrl.verdictData.days_expired
            };

            if (ctrl.verdictData.days_left >= 0 || ctrl.verdictData.days_expired >= 0) seoHelperService.setMeta(remainingDaysMetaObj);
        }

        function overridePageTitle() {
            if (ctrl.data.overridePageTitle) windowHelperService.setWindowTitle(ctrl.data.overridePageTitle);
        }

        function scrollToKscSection() {
            if ((ctrl.verdictData.verdict.indexOf('KIS') > -1 || ctrl.verdictData.verdict.indexOf('KTS') > -1) && $location.hash() === 'ksc') {
                $location.hash('ksc');
                // $anchorScroll.yOffset = 200;
                $anchorScroll();
            }
        }

        function handleVerdictData() {
            //Tracking
            let verdictType = 'Home > Home Products > LRC > Verdict > ';

            if ($location.path() === '/renewal-center/vsb') {
                verdictType = 'Home > Small Business Security > LRC > Verdict > ';
            }

            $timeout(() => { $rootScope.kaspersky.pageName = verdictType + ctrl.verdict; }, 300);
            $rootScope.kaspersky.verdictSite = ctrl.verdictData.verdict.search(/^.+_T$/i) === -1 ? 'LRC' : 'ATT';
            $rootScope.kaspersky.verdictDevices = ctrl.verdictData.license_count;
            $rootScope.kaspersky.verdictTerm = Math.floor(ctrl.verdictData.license_days / 365);
            $rootScope.kaspersky.verdictLicenseStatus = ctrl.verdictData.expired;
            $rootScope.kaspersky.verdictLicenseProduct = ctrl.verdictData.verdict;
            $rootScope.kaspersky.verdictPartNumber = ctrl.verdictData.sales_tracking
                && ctrl.verdictData.sales_tracking.pnumber;
            $rootScope.kaspersky.verdictChannel = ctrl.verdictData.sales_tracking
                && ctrl.verdictData.sales_tracking.channel;
            $rootScope.kaspersky.verdictLicenseType = ctrl.verdictData.sales_tracking
                && ctrl.verdictData.sales_tracking.license_type;
            $rootScope.kaspersky.serialNumber = ctrl.verdictData.verdictSerial;
            $rootScope.kaspersky.regKey = ctrl.verdictData.sales_tracking.reg_key;
            $rootScope.kaspersky.kpc = ctrl.verdictData.kpc;
            $rootScope.kaspersky.edu = ctrl.verdictData.edu;
            $rootScope.kaspersky.verdictExpDate = ctrl.verdictData.expiration_date;
            $rootScope.kaspersky.verdictDaysRemaining = ctrl.verdictData.days_left;
            $rootScope.kaspersky.verdictDaysExpired = ctrl.verdictData.days_expired;
            setRemainingDaysMetaTags();

            if (angular.isFunction($window.trackPageView)) {
                $window.trackPageView(verdictType + ctrl.verdict);
            }
        }

        function setVerdictLicenseStatus() {
            return $rootScope.kaspersky.verdictLicenseStatus ? 'ACTIVE' : 'EXPIRED';
        }

        function addVerdictString() {
            let verdictRegion = $rootScope.verdictRegion || appHelperService.getISOLocale().id,
                verdictLicenseProduct = $rootScope.kaspersky.verdictLicenseProduct.split('_')[0] || '[NULL]',
                verdictPartner = $rootScope.verdictPartner || `[NULL]`,
                licenseStatus = setVerdictLicenseStatus(),
                metaObj = {
                    'verdictString': verdictRegion
                    + '_' + $rootScope.kaspersky.verdictSite
                    + '_' + verdictPartner
                    + '_' + $rootScope.kaspersky.verdictChannel
                    + '_' + verdictLicenseProduct
                    + '_' + $rootScope.kaspersky.verdictDevices
                    + '_' + $rootScope.kaspersky.verdictTerm
                    + '_' + licenseStatus.toUpperCase()
                };

            seoHelperService.setMeta(metaObj);
        }

        function daysRemainingBanner() {
            const isDaysRemainingBanner = ctrl.verdictData.days_left
                && ctrl.verdictData.days_left <= DAYS_LEFT_THRESHOLD
                && !ctrl.verdict.match(/_b|_t|email+/ig),
                isExpiredBanner = ctrl.verdictData.days_expired > 0 && !ctrl.verdict.match(/_b|_t|email+/ig),
                isExpirationToday = ctrl.verdictData.days_left === 0 && ctrl.verdictData.days_expired === 0 && !ctrl.verdict.match(/_b|_t|email+/ig);

            if (isDaysRemainingBanner) {
                ctrl.daysRemainingText = ctrl.verdictData.days_left + ' ' + (ctrl.verdictData.days_left === 1 ? ctrl.data.daysLeftText.replace('days', 'day') : ctrl.data.daysLeftText);
                ctrl.daysRemainingNote = ctrl.data.daysLeftNote;
            } else if (isExpiredBanner) {
                ctrl.daysRemainingText = ctrl.data.expiredText || ctrl.translations.expiredText;
                ctrl.daysRemainingNote = ctrl.data.expiredNote || ctrl.translations.expiredNote;
            } else if (isExpirationToday) {
                ctrl.daysRemainingText = ctrl.data.expiresTodayText || ctrl.translations.expiresTodayText;
                ctrl.daysRemainingNote = ctrl.data.expiredNote || ctrl.translations.expiredNote;
            }

            return ((isDaysRemainingBanner && ctrl.data.daysLeftNote) || (isExpiredBanner && ctrl.data.expiredText)) && ctrl.locale === 'en-gb';
        }
        // fetch data specific for KSC pages
        function fetchSpecificData() {
            if (ctrl.data.productList.match(/(ksc|ksc-personal|ksc-family)/ig) && !ctrl.verdict.match(/(_T)/ig)) { // if kscloud product
                let productFolder = '';
                ctrl.data.productList.split(',').forEach((item) => {
                    if (item === 'ksc-personal' || item === 'ksc-family') {
                        return productFolder = item;
                    }
                });

                directiveData.get(`/home-security/products/${productFolder}/product-features.json`)
                    .then((response) => { ctrl.features = response.data.fields; }, handleRejection);

                directiveData.get(`/home-security/products/kscloud/kscloud.json`)
                    .then((response) => { ctrl.kscloud = response.data.fields; }, handleRejection);
            }

            if (ctrl.verdict.match(/_uni/ig)) { // if uninstall verdict => show 1 up uni page
                directiveData.get(`/lrc/verdicts/${ctrl.folder[0]}/${ctrl.verdict}-features.json`).then((response) => {
                    ctrl.features = response.data.fields;
                }, handleRejection);
            }
        }

        // rm when all verdicts will be switched to template
        function setTemplateType() {
            ctrl.type = ctrl.data.productList.split(',').length;
            if (ctrl.type === 1 && isB2B(ctrl.data.productList)) ctrl.type = 'vsb'; // if b2b product
            if (ctrl.data.productList.match(/(ksc|ksc-personal|ksc-family)/ig) && !ctrl.verdict.match(/(_T)/ig)) { // if kscloud product
                ctrl.type += '-ksc';
            }
            if (ctrl.verdict === 'ksc_hard') ctrl.type += '-ksc-hard'; // if kscloud hard upsell verdict
            if (ctrl.verdict === 'ksc_exp') ctrl.type += '-edu'; // if kscloud edu verdict => show ksc experience page
            if (ctrl.verdict.match(/_uni/ig)) { // if uninstall verdict => show 1 up uni page
                ctrl.type += '-uni';
            }

            if (ctrl.verdict.match(/kfa/ig)) ctrl.type += '-kfa';
            ctrl.template = 'v' + ctrl.type + '-up';
        }

        function handleVerdict() {
            if (ctrl.folder) {
                directiveData.get(`/lrc/verdicts/${ctrl.folder[0]}/${ctrl.verdict}.json`)
                    .then((response) => {
                        ctrl.data = response.data.fields;
                        if (ctrl.locale === 'ru-ru' && ctrl.verdictData) {
                            ctrl.data.daysLeftText = ctrl.data.daysLeftText.replace('дней', parseRUDays());
                        }

                        if (isB2B(ctrl.data.productList)) ctrl.isB2B = true;

                        fetchSpecificData();

                        overridePageTitle();

                        if (ctrl.data.lrcTemplate && ctrl.data.lrcTemplate !== 'false') {
                            ctrl.template = ctrl.data.lrcTemplate;
                        } else setTemplateType();

                        ctrl.showDaysLeft = daysRemainingBanner();

                        productsFetcher(ctrl.data.productList.split(',')).then((res) => {
                            ctrl.products = res;

                            $rootScope.kaspersky.verdictProduct = ctrl.products[0].title;
                            $rootScope.kaspersky.productName = ctrl.products[0].title;
                        });

                        if (ctrl.data.comparisonTableLink) {
                            directiveData.get(ctrl.data.comparisonTableLink)
                                .then((response) => {
                                    if (response.data.schemaName === 'Custom HTML') {
                                        ctrl.data.comparisonTable = response.data.fields.Body;
                                    } else {
                                        //make it possible to insert standalone comparison tables
                                        ctrl.data.comparisonTable = false;
                                    }
                                }, handleRejection);
                        }
                        if (ctrl.data.upgradeDetails) {
                            directiveData.get(ctrl.data.upgradeDetails)
                                .then((response) => {
                                    ctrl.data.promoBlock = response.data.fields.text;
                                }, handleRejection);
                        }
                        if (ctrl.data.quickmenuButtons) {
                            ctrl.data.quickmenuButtons.forEach((item, index) => {
                                if (item['product'] && item['product'].match(/\.json/)) {
                                    return $http.get(item['product'], {'cache': true})
                                        .then(response =>
                                            ctrl.data.quickmenuButtons[index].product = response.data.fields,
                                        handleRejection);
                                }
                            });
                        }

                        // enable the scroll nav if data exists

                        if (ctrl.data.navScrollItems) {
                            $rootScope.$emit('scrollNav', ctrl.data.navScrollItems);
                        }

                    }, rejection => { errorService.warn('Verdict is not available', rejection); });
            } else {
                $state.go('lrc-b2c', {}, {
                    'location': false,
                    'inherit': true
                });
            }
        }

        ctrl.scrollTo = (id, $event) => {
            $event.preventDefault();
            $event.stopPropagation();

            $document[0].getElementById(id).scrollIntoView();
        };

        ctrl.navigateUserTo = windowHelperService.navigateUserTo;

        let initScriptsOnInclude = $rootScope.$on('$includeContentLoaded', () => {
            $($element).find('.image-link').magnificPopup({
                'type': 'image',
                'closeOnContentClick': false,
                'closeBtnInside': true
            });

            $timeout(() => {
                let mobileDefault;

                // Check if current page has comparison charts on it
                if ($('.comparison-chart').length) {
                    // Loop through each comparison chart and set the default column
                    mobileDefault = $('.comparison-chart').data('comparison-default');
                    $('.comparison-chart .' + mobileDefault).addClass('currently-active');
                }
            });

            $('.comparison-nav li a').on('click', function(e) {
                e.preventDefault();
                let $this = $(this),
                    // Get navigation direction
                    direction = $this.data('comparison-nav-direction'),
                    // Get chart ID from the data attribute
                    chartID = $this.closest('.comparison-nav').data('comparison-chart'),
                    // Get comparison chart using that ID
                    $comparisonChart = $('.comparison-chart[data-comparison-chart="' + chartID + '"]'),
                    // Get comparison chart mobile nav
                    $comparisonChartNav = $('.comparison-nav[data-comparison-chart="' + chartID + '"]'),
                    // Get current column
                    $currentColumn = $comparisonChart.find('.row-header .column-product.currently-active'),
                    currentTitle = $currentColumn.find('h2.product-title a').clone(),
                    currentID = parseInt($currentColumn.data('column')),
                    nextID = parseInt(currentID + 1),
                    prevID = parseInt(currentID - 1),
                    nextNavID = parseInt(currentID + 2),
                    prevNavID = parseInt(currentID - 2);

                // Remove featured style from the comparison chart mobile nav
                $comparisonChartNav.find('li a.feat').removeClass('feat');
                $comparisonChart.find('.row-header .column-product.column-' + ($scope.$ctrl.data.length + 1) + ' h2.product-title a').addClass('feat');

                // Check direction and if prev/next column exists
                if (direction === 'prev' && $comparisonChart.find('.column-product.column-' + prevID).length) {
                    $comparisonChart.find('.column-' + currentID).removeClass('currently-active');
                    $comparisonChart.find('.column-' + prevID).addClass('currently-active');
                    let newPrevTitle = $comparisonChart.find('.row-header .column-product.column-' + prevNavID + ' h2.product-title a').clone();

                    if ($comparisonChart.find('.row-header .column-product.column-' + prevNavID + ' .feat').hasClass('feat')) {
                        $comparisonChartNav.find('li.nav-prev a').addClass('feat');
                    }

                    if ($comparisonChart.find('.row-header .column-product.column-' + currentID + ' .feat').hasClass('feat')) {
                        $comparisonChartNav.find('li.nav-next a').addClass('feat');
                    }

                    $comparisonChartNav.find('li.nav-prev a').html(newPrevTitle.children());
                    $comparisonChartNav.find('li.nav-next a').html(currentTitle.children());

                } else if (direction === 'next' && $comparisonChart.find('.column-product.column-' + nextID).length) {
                    $comparisonChart.find('.column-' + currentID).removeClass('currently-active');
                    $comparisonChart.find('.column-' + nextID).addClass('currently-active');
                    let newNextTitle = $comparisonChart.find('.row-header .column-product.column-' + nextNavID + ' h2.product-title a').clone();

                    if ($comparisonChart.find('.row-header .column-product.column-' + nextNavID + ' .feat').hasClass('feat')) {
                        $comparisonChartNav.find('li.nav-next a').addClass('feat');
                    }

                    if ($comparisonChart.find('.row-header .column-product.column-' + currentID + ' .feat').hasClass('feat')) {
                        $comparisonChartNav.find('li.nav-prev a').addClass('feat');
                    }
                    $comparisonChartNav.find('li.nav-next a').html(newNextTitle.children());
                    $comparisonChartNav.find('li.nav-prev a').html(currentTitle.children());
                }
            });

            initScriptsOnInclude();
        });

        ctrl.bbData = {'top': {}, 'bottom': {}};

        ctrl.setBuyblockValueByProduct = (product, term, pack, autorenew) => {
            ctrl.bbData[product] = {
                'term': term,
                'pack': pack,
                'autorenew': autorenew
            };
        };

        function checkEStoreAvailibity() {
            priceData.estore().then((response) => {
                if (response.data.length && response.data.indexOf(ctrl.verdictData.provider) === -1) {
                    ctrl.verdictData.provider = '';
                }
            });
        }

        function isB2B(product) {
            return product.match(/(kes|endpoint|cloud|core|advanced|select|ksos|365|server|mobile|systems|gateway)/ig);
        }
    }
})();
