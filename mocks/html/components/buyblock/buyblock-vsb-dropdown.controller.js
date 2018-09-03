(function() {
    'use strict';
    angular.module('kappGlobal.buyblocks')
        .controller('buyblockVsbDropdownController', buyblockVsbDropdownController);

    function buyblockVsbDropdownController($rootScope, $scope, $state, ENV, SETUP, buyBlockHelperService,
        directiveData, priceData, productData, tracking, windowHelperService, buyblockService, appHelperService, errorService) {
        let ctrl = this;
        ctrl.isChecked = `${SETUP.isChecked}`;
        ctrl.showAR = `${SETUP.showAR}`;
        ctrl.productPricesExist = true;
        ctrl.currency = buyblockService.getCurrency(ctrl);
        ctrl.currentValue = {
            'price': 'no data',
            'eStore': '/store'
        };
        if (!ctrl.isCustomLocale) ctrl.curState = $state.current.parent;
        ctrl.termArr = [];
        ctrl.buyLink = 'no data received yet';
        ctrl.defaultAutorenew = (ctrl.isChecked === 'true');
        ctrl.selectedPackString = '';
        ctrl.selectedTermString = '';
        ctrl.showARPopup = showARPopup;
        ctrl.registerOnce = registerOnce;
        ctrl.getPriceList = getPriceList;
        ctrl.setCurrentValue = setCurrentValue;
        ctrl.sendToBuyUrl = sendToBuyUrl;
        ctrl.addSalesTrackingParameters = addSalesTrackingParameters;
        ctrl.getPromoline = getPromoline;
        ctrl.getSavings = getSavings;
        ctrl.isTotal = appHelperService.assertStateByName('smb-product-total');

        // $rootScope destroy events begin
        let arPopupCheck = $rootScope.$on('arPopupCheck', (event, value) => {
                ctrl.autorenew = value;
                setCurrentValue();
            }),
            disableAR = $rootScope.$on('disableAR', () => {
                ctrl.autorenew = false;
                setCurrentValue();
            }),
            currencyChange = $rootScope.$on('currencyChange', handleCurrencyChange);
        // $rootScope destroy events end
        ctrl.$onInit = activate;
        ctrl.hasTrialButton = hasTrialButton;

        function activate() {
            ctrl.locale = ctrl.locale || ENV.locale;
            ctrl.isCustomLocale = checkCustomLocale();

            getProductData();

            $scope.$on('$destroy', handleScopeDestroyed);
        }

        function addSalesTrackingParameters(event) {
            if (event) event.preventDefault();
            if (!ctrl.error) ctrl.sendToBuyUrl();
        }

        function getPromoline() {
            return ctrl.promoline ? ctrl.promoline : ctrl.buyblockData ? ctrl.buyblockData.promoline : undefined;
        }

        function isTotalOrHybridCloud() {
            const name = ctrl.productName;
            return name === 'Kaspersky Total Security for Business' || name.indexOf('Kaspersky Hybrid Cloud') !== -1;
        }

        function getPriceList() {
            if (angular.isUndefined(ctrl.productName)) return;
            setEStore();
            return priceData.getPrice(ctrl.productName, ctrl.purchaseType, ctrl.currency, ctrl.newEstore || '')
                .then(handlePriceSuccess, handlePriceError);
        }

        function registerOnce(checked) {
            if (ctrl.modalDisplayedOnce) return;

            ctrl.modalDisplayedOnce = true;
            buyblockService.registerOnce(checked, ctrl.defaultAutorenew, true);
        }

        function sendToBuyUrl() {
            windowHelperService.goToUrl(tracking.formatQueryString(ctrl.buyLink, buyBlockHelperService.hasPurchaseAsPurchaseType(ctrl.purchaseType)));
        }

        function setPackArr() {
            const packListMatchingSelectedTerm = ctrl.priceList.filter(i => i.term === ctrl.termValue).map(i => i.pack);

            ctrl.packArr = _.uniq(packListMatchingSelectedTerm)
                .sort((a, b) => parseInt(a) - parseInt(b));
        }

        function setCurrentValue() {
            // A check for proper text input begin
            let packNumber = parseInt(ctrl.packValue, 10);
            ctrl.error = false;

            if (ctrl.isCustomLocale) {
                if (isNaN(packNumber)) ctrl.packValue = ctrl.minValue; // for IE which allows symbols in the number input

                if (angular.isUndefined(ctrl.packValue) || packNumber > 0 && packNumber < ctrl.minValue) {
                    ctrl.error = true; // the value is incorrect but user could continue his input to get a valid number, triggers red border
                    return false;
                }

                ctrl.error = false;

                if (packNumber <= 0) ctrl.packValue = ctrl.minValue;
            }

            if (packNumber > ctrl.maxValue) ctrl.packValue = ctrl.maxValue;

            if (ctrl.packValue === undefined) {
                ctrl.error = true;
                return;
            }

            findMatch();
            ctrl.renewalAvailable = buyblockService.checkRenewal(ctrl.priceList, ctrl.packValue, ctrl.termValue, mustParsePackValue());
            return priceData.getCartLink(ctrl.currentValue.product_id, ctrl.currentValue.id, ctrl.purchaseType)
                .then((response) => {
                    ctrl.buyLink = response.data;
                }, (rejection) => {
                    errorService.warn(rejection);
                    ctrl.buyLink = 'Oops! Something went wrong';
                });
        }

        function showARPopup() {
            buyblockService.showARPopup();
        }

        // Private methods
        function buyblockSetup() {
            return directiveData.getLocal('buyblock/buyblock-texts')
                .then(response => {
                    let isB2B = $state.current.parent ? Boolean($state.current.parent.match(/(smb|vsb)/ig)) : false;
                    ctrl.buyblockData = response.data.fields;
                    ctrl.buyblockData.unavailableMsgType = '';
                    if (ctrl.buyblockData.buyblock_not_available_msg) ctrl.buyblockData.unavailableMsgType = 'b2c';
                    if (ctrl.buyblockData.buyblock_not_available_b2b_msg) ctrl.buyblockData.unavailableMsgType = 'b2b';
                    checkDisclaimer(isB2B);
                    checkMetaCountries();
                });
        }

        function checkCustomLocale() {
            let customLocales = ['da-dk', 'en-us', 'es-es', 'fr-fr', 'it-it', 'ja-jp', 'nb-no', 'nl-nl', 'ru-ru', 'sv-se'];
            return ctrl.setCustomLocale || customLocales.indexOf(ctrl.locale) > -1;
        }

        function checkMetaCountries() {
            let metaCountries = ['en-za', 'en-ae', 'ar-ae', 'tr-tr'];
            if (metaCountries.indexOf(ctrl.locale) > -1)
                ctrl.buyblockData.needMore = ctrl.buyblockData.or;
        }

        function checkDisclaimer(isB2B) {
            let b2bDisclaimer = ctrl.buyblockData.disclaimer || ctrl.buyblockData.smbDisclaimer,
                hideAsteriskOnB2B = ctrl.product && ctrl.product.hideAsterisk && ctrl.product.hideAsterisk[0] === 'true' && isB2B;

            if (ctrl.locale === 'en-us' && $rootScope.kaspersky.verdictSite === 'LRC') return ctrl.disclaimerObj = {};

            ctrl.disclaimerObj = ctrl.product && ctrl.product.bbDisclaimer
                ? {'disclaimer': ctrl.product.bbDisclaimer, 'asterisk': hideAsteriskOnB2B ? '' : '*'}
                : buyblockService.checkDisclaimer(isB2B, ctrl.buyblockData.b2cDisclaimer, b2bDisclaimer, hideAsteriskOnB2B);
        }

        function setProductPageLink() {
            ctrl.product.prodPageLink = ctrl.hideProductLinks ? '' : ctrl.product.prodPageLink;
        }

        function getProductData() {
            if (ctrl.productShortName) { // for cases when we only know the name of the product
                return getCustomProduct();
            } else { // for cases when we have all product data available
                $scope.$watch('$ctrl.productInfo', (newV) => {
                    if (newV && angular.isObject(newV)) {
                        ctrl.product = ctrl.productInfo;
                        ctrl.productName = ctrl.productInfo.title;
                        ctrl.getPriceList();
                        setProductPageLink();
                        buyblockSetup();
                    }
                });
            }
        }

        function handleCurrencyChange() {
            ctrl.currency = $rootScope.currency || '';
            ctrl.getPriceList();
            ctrl.packValue = ctrl.minValue;
        }

        function handleScopeDestroyed() {
            arPopupCheck();
            disableAR();
            currencyChange();
        }

        /**
         * ctrl.product.bbSettings.eStore pulls data from Tridion component, ctrl.estore takes it from parameter passed in
         * this conditional is probably used to target buyblocks outside of LRC, added lrc state detection to make it work for ATT verdicts - AFedotov
         */
        function setEStore() {
            if (ctrl.estore || $state.includes('lrc-verdict')) {
                ctrl.newEstore = ctrl.estore;
            } else {
                ctrl.newEstore = (ctrl.product && ctrl.product.bbSettings) ? ctrl.product.bbSettings.eStore : '';
            }
        }

        function setupPriceList() {
            const hasAutoRenewal = ctrl.priceList.some(item => ctrl.showAR !== false && ctrl.priceList[0].autorenew !== item.autorenew);

            ctrl.termArr = _.uniq(ctrl.priceList.map(i => i.term));

            if (ctrl.disableAutoRenew === 'true') {
                ctrl.showAR = false;
                ctrl.autorenew = false;
            } else {
                if (!hasAutoRenewal) {
                    ctrl.showAR = false;
                    if (!ctrl.isCustomLocale) ctrl.defaultAutorenew = ctrl.priceList[0].autorenew;
                } else {
                    ctrl.showAR = `${SETUP.showAR}`;
                }
            }

            function setCustomSelectedTerm() {
                _.forEach(ctrl.termArr, function(value) {
                    if (parseInt(value) === parseInt(ctrl.selectedTerm || ctrl.product.bbSettings.selectedTerm)) {
                        ctrl.selectedTermString = value;
                    }
                });
            }

            if (ctrl.product.bbSettings && (ctrl.selectedTerm || ctrl.product.bbSettings.selectedTerm)) setCustomSelectedTerm();
            ctrl.termValue = ctrl.selectedTermString || ctrl.termArr[0];
            ctrl.autorenew = ctrl.defaultAutorenew;

            setPackArr();

            // Min and max value search
            findMinMax();

            function findMinMax() {
                let mappedPackArr = _.map(ctrl.packArr, function(obj) {
                    return parseInt(obj);
                });
                ctrl.maxValue = Math.max.apply(Math, mappedPackArr);
                ctrl.minValue = Math.min.apply(Math, mappedPackArr);
            }

            function setCustomSelectedPack() {
                let x = parseInt(ctrl.selectedPack || ctrl.product.bbSettings.selectedPack);
                ctrl.selectedPackString = ctrl.packArr.sort( (a, b) => Math.abs(x - parseInt(a)) - Math.abs(x - parseInt(b)) )[0];
                ctrl.showMinMaxDisclaimer = x > parseInt(ctrl.selectedPackString) || x < parseInt(ctrl.selectedPackString);
            }

            // let packValueInt = (ctrl.template === 'smb-prod' && !ctrl.isCustomLocale) ? parseInt(ctrl.packArr[0]) : ctrl.packArr[0];
            if (ctrl.product.bbSettings && (ctrl.selectedPack || ctrl.product.bbSettings.selectedPack)) setCustomSelectedPack();
            if (!ctrl.isCustomLocale) ctrl.packValue = parseInt(ctrl.selectedPackString) || parseInt(ctrl.packArr[0]);
            if (ctrl.isCustomLocale) ctrl.packValue = ctrl.selectedPackString || ctrl.packArr[0];
            // ctrl.packValue = ctrl.selectedPackString || packValueInt;

            // Emit Buyblock ready event to currency selector
            $rootScope.buyBlockReady();
            setCurrentValue();
        }

        function handlePriceError(response) {
            ctrl.productPricesExist = false;
            ctrl.isTotalOrHybridCloud = isTotalOrHybridCloud();
            errorService.warn(response);
        }

        function handlePriceSuccess(response) {
            if (ctrl.product.bbSettings.isChecked)
                ctrl.isChecked = ctrl.product.bbSettings.isChecked;
            if (ctrl.product.bbSettings.showAR)
                ctrl.showAR = ctrl.product.bbSettings.showAR;

            ctrl.priceList = response.data;
            if (!angular.isObject(ctrl.priceList) || !ctrl.priceList.length) {
                errorService.warn('API not available');
                ctrl.productPricesExist = false;
                ctrl.isTotalOrHybridCloud = isTotalOrHybridCloud();
                return false;
            }
            setupPriceList();
            ctrl.productPricesExist = true;
        }

        function getCustomProduct() {
            let promiseFn = productData.getsmb;
            if (ctrl.productShortName === 'ksos') promiseFn = productData.getvsb;
            return promiseFn(ctrl.productShortName)
                .then((response) => {
                    ctrl.product = ctrl.productInfo = response.data.fields;
                    ctrl.productName = response.data.fields.title;
                    setProductPageLink();
                    buyblockSetup();

                })
                .then(() => {
                    ctrl.getPriceList();
                });
        }

        function findMatch() {
            let matchConfig = {
                    'pack': ctrl.packValue,
                    'term': ctrl.termValue,
                    'autorenew': ctrl.autorenew
                },
                matchIndex = buyblockService.findPriceMatch(ctrl.priceList, matchConfig, mustParsePackValue());

            if (matchIndex < 0) {
                matchConfig.autorenew = !matchConfig.autorenew;

                matchIndex = buyblockService.findPriceMatch(ctrl.priceList, matchConfig, mustParsePackValue());
            }

            if (matchIndex > -1) {
                ctrl.currentValue = ctrl.priceList[matchIndex];
                ctrl.currentValuePack = ctrl.currentValue.pack.split(' + ');
                ctrl.packValue = ctrl.isCustomLocale ? ctrl.currentValue.pack : parseInt(ctrl.currentValuePack[0]);
            }
        }

        function mustParsePackValue() {
            return ctrl.locale !== 'ru-ru' && ctrl.locale !== 'ja-jp';
        }

        function hasTrialButton() {
            return buyblockService.hasTrialButton(ctrl.product) && !ctrl.hideTrialButton;
        }

        /**
         * Get savings messaging and value (either custom or default)
         */
        function getSavings(messageType) {
            if (ctrl.product) return buyblockService.getSavings(messageType, ctrl.currentValue, ctrl.product.bbSettings, ctrl.buyblockData, ctrl.saveRateText, ctrl.savingsPriceType);
        }
    }
})();
