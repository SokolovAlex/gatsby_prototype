(function() {
    'use strict';
    angular.module('kappGlobal.buyblocks')
        .controller('buyblockDropdownController', buyblockDropdownController);

    function buyblockDropdownController($rootScope, $scope, $state, ENV, SETUP, appHelperService,
        directiveData, priceData, productData, windowHelperService, buyblockService, ngDialog, errorService) {
        let ctrl = this;
        ctrl.error = ctrl.error || null;
        ctrl.isB2B = false;
        ctrl.hidePack = false;
        ctrl.isChecked = `${SETUP.isChecked}`;
        ctrl.showAR = `${SETUP.showAR}`;
        ctrl.curState = $state.current.parent;
        ctrl.stateName = $state.current.name;
        ctrl.currency = buyblockService.getCurrency(ctrl);
        ctrl.currentValue = {
            'price': 'no data',
            'eStore': '/store'
        };
        ctrl.productPricesExist = true;
        ctrl.navigateUserTo = windowHelperService.navigateUserTo;
        ctrl.product = {};
        ctrl.productName = ctrl.productName || '';
        ctrl.productShortName = ctrl.productShortName || '';
        ctrl.asterisk = '';
        ctrl.translations = {};
        ctrl.buyblockData = {
            'unavailableMsgType': '',
            'buyblock_not_available_msg': '',
            'buyblock_not_available_b2b_msg': '', 'b2cDisclaimer': '', 'disclaimer': ''
        };
        ctrl.priceList = [];
        ctrl.packArr = [];
        ctrl.termArr = [];
        ctrl.buyLink = 'no data received yet';
        ctrl.omnitureText = 'Buy';
        ctrl.defaultAutorenew = (ctrl.isChecked === 'true');
        ctrl.priceListGroupedBy = {'term': {}, 'pack': {}};
        ctrl.notAvailableItemsFor = {'term': {}, 'pack': {}};

        ctrl.addSalesTrackingParameters = addSalesTrackingParameters;
        ctrl.registerOnce = registerOnce;
        ctrl.setCurrentValue = setCurrentValue;
        ctrl.showARPopup = showARPopup;
        ctrl.sendToBuyUrl = sendToBuyUrl;
        ctrl.getPromoline = getPromoline;
        ctrl.accountDescPopup = accountDescPopup;
        ctrl.getSavings = getSavings;
        ctrl.isPriceSavingDisplayed = isPriceSavingDisplayed;
        ctrl.isPackDisabled = isPackDisabled;
        ctrl.isTermDisabled = isTermDisabled;

        // $rootScope destroy events begin
        let currencyChange = $rootScope.$on('currencyChange', handleCurrencyChange),
            arPopupCheck = $rootScope.$on('arPopupCheck', (event, value) => {
                ctrl.autorenew = value;
                setCurrentValue();
            });
        // $rootScope destroy events end

        ctrl.$onInit = activate;
        ctrl.$onChanges = handleChanges;
        ctrl.hasTrialButton = hasTrialButton;

        function activate() {
            ctrl.locale = ctrl.locale || ENV.locale;

            getProductData(ctrl.productShortName);
            getTranslations();
            $scope.$on('$destroy', handleScopeDestroyed);
        }

        function handleChanges(changesObj) {
            if (changesObj['valueToSet']) {
                handleUpdateCurrentValue(changesObj['valueToSet'].currentValue);
            }
        }

        function getPromoline() {
            return ctrl.promoline ? ctrl.promoline : ctrl.buyblockData ? ctrl.buyblockData.promoline : undefined;
        }

        function addSalesTrackingParameters(event) {
            if (event)
                event.preventDefault();
            if (ctrl.error) return;
            sendToBuyUrl();
        }

        function registerOnce(checked) {
            buyblockService.registerOnce(checked, ctrl.defaultAutorenew);
        }

        function handleUpdateCurrentValue(valueToSet) {
            let valueIsDifferent = !_.isEqual(valueToSet, {
                'pack': ctrl.packValue,
                'term': ctrl.termValue,
                'autorenew': ctrl.autorenew
            });

            if (valueToSet && valueIsDifferent) {
                ctrl.packValue = valueToSet.pack;
                ctrl.termValue = valueToSet.term;
                ctrl.autorenew = valueToSet.autorenew;
                if (ctrl.priceList && ctrl.priceList.length > 0) setCurrentValue();
            }
        }

        function setCurrentValue(changedProp) {
            findMatch();
            ctrl.renewalAvailable = buyblockService.checkRenewal(ctrl.priceList, ctrl.packValue, ctrl.termValue, false);

            let promise = priceData.getCartLink(ctrl.currentValue.product_id,
                ctrl.currentValue.id, ctrl.purchaseType, ctrl.product.shortName)
                .then(
                    response => { ctrl.buyLink = response.data; },
                    rejection => {
                        errorService.warn(rejection);
                        ctrl.buyLink = 'Oops! Something went wrong';
                    }
                );

            ctrl.onFormUpdated({
                'values': {
                    'term': ctrl.termValue,
                    'pack': ctrl.packValue,
                    'autorenew': ctrl.autorenew
                }
            });

            setAvailableOptionList(changedProp);

            return promise;
        }

        function setAvailableOptionList(prop) {
            if (ctrl.template !== '58' || !prop) return;

            // this avoid repeating the same logic for term and pack
            // prop is pack|term
            // otherProp is the other value
            const otherProp = prop === 'term' ? 'pack' : 'term',
                propValue = ctrl[`${prop}Value`],
                otherPropValueArr = ctrl[`${otherProp}Arr`],
                availableListForOtherProp = _.uniq(ctrl.priceListGroupedBy[prop][propValue].map(i => i[otherProp]));

            ctrl.notAvailableItemsFor[otherProp] = _.difference(otherPropValueArr, availableListForOtherProp)
                .reduce((res, pack) => Object.assign(res, {[pack]: true}), {});
        }

        function isPackDisabled(value) {
            return ctrl.notAvailableItemsFor.pack[value] === true;
        }

        function isTermDisabled(value) {
            return ctrl.notAvailableItemsFor.term[value] === true;
        }

        function showARPopup() {
            buyblockService.showARPopup();
        }

        function sendToBuyUrl() {
            return buyblockService.sendToBuyUrl(ctrl.buyLink, ctrl.purchaseType);
        }

        function hidePack() {
            if (ctrl.locale === 'ru-ru' && (ctrl.productShortName === 'ksc-family' || (ctrl.product && ctrl.product.shortName === 'ksc-family'))) {
                ctrl.hidePack = true;
            }
        }

        // Private helper Methods
        function buyblockSetup() {
            return directiveData.getLocal('buyblock/buyblock-texts')
                .then((response) => {
                    const bbSettings = ctrl.productInfo ? ctrl.productInfo.bbSettings : {},
                        isB2B = $state.current.parent ? Boolean($state.current.parent.match(/(smb|vsb)/ig)) : false;

                    ctrl.buyblockData = Object.assign({}, response.data.fields, bbSettings);

                    ctrl.disablePackSelect = ctrl.buyblockData.packSelectDisabled === 'True';
                    ctrl.disableTermSelect = ctrl.buyblockData.termSelectDisabled === 'True';

                    ctrl.buyblockData.unavailableMsgType = ''; // this.buyblockData.unavailableMsgType used in ng-switch directive to pick b2b_fallback text if it exists and b2c_fallback if not
                    if (ctrl.buyblockData.buyblock_not_available_msg && !isB2B) ctrl.buyblockData.unavailableMsgType = 'b2c';
                    if (ctrl.buyblockData.buyblock_not_available_b2b_msg && isB2B) ctrl.buyblockData.unavailableMsgType = 'b2b';
                    checkDisclaimer(isB2B);
                    hidePack();
                });
        }

        function checkDisclaimer(isB2B) {
            let b2bDisclaimer = ctrl.buyblockData.disclaimer || ctrl.buyblockData.smbDisclaimer;

            if (ctrl.locale === 'en-us' && $rootScope.kaspersky.verdictSite === 'LRC') return ctrl.disclaimerObj = {};

            ctrl.disclaimerObj = ctrl.product && ctrl.product.bbDisclaimer
                ? {'disclaimer': ctrl.product.bbDisclaimer, 'asterisk': '*'}
                : buyblockService.checkDisclaimer(isB2B, ctrl.buyblockData.b2cDisclaimer, b2bDisclaimer);
        }

        function findMatch() {
            let matchConfig = {
                    'pack': ctrl.packValue,
                    'term': ctrl.termValue,
                    'autorenew': ctrl.autorenew
                },
                matchIndex = buyblockService.findPriceMatch(ctrl.priceList, matchConfig, false);

            if (matchIndex < 0) {
                ctrl.autorenew = !ctrl.autorenew;
                matchConfig.autorenew = !matchConfig.autorenew;

                matchIndex = buyblockService.findPriceMatch(ctrl.priceList, matchConfig, false);
            }

            if (matchIndex > -1) {
                ctrl.currentValue = ctrl.priceList[matchIndex];
            }
        }

        function getTranslations() {
            return directiveData.getLocal('general-translations').then((response) => {
                ctrl.translations = response.data.fields;
            });
        }

        function setProductPageLink() {
            ctrl.product.prodPageLink = ctrl.hideProductLinks ? '' : ctrl.product.prodPageLink;
        }

        function getProductData(productShortName) {
            if (productShortName) {
                return getCustomProduct(productShortName);
            }
            let productInfo = $scope.$watch('$ctrl.productInfo', (newV) => {
                if (newV) {
                    ctrl.product = ctrl.productInfo;
                    ctrl.productName = ctrl.productInfo.title;
                    setProductPageLink();
                    getPriceList();
                    productInfo();
                    buyblockSetup();
                }
            });
        }

        function getCustomProduct(productShortName) {
            return productData.getb2c(productShortName).then((response) => {
                ctrl.product = response.data.fields;
                ctrl.productName = response.data.fields.title;
                setProductPageLink();
                buyblockSetup();
            }).then(() => {
                getPriceList();
            });
        }

        function getPriceList() {
            if (angular.isUndefined(ctrl.productName)) return;
            setEStore();
            return priceData.getPrice(ctrl.productName, ctrl.purchaseType, ctrl.currency, ctrl.newEstore || '')
                .then(handlePriceSuccess, handlePriceError);
        }

        function handleCurrencyChange() {
            ctrl.currency = $rootScope.currency;
            getPriceList();
        }

        function handlePriceError(rejection) {
            ctrl.productPricesExist = false;
            errorService.warn(rejection);
        }

        function handleScopeDestroyed() {
            arPopupCheck();
            currencyChange();
        }

        function resetPricingObjectsToDefault() {
            ctrl.packArr = [];
            ctrl.termArr = [];
            ctrl.buyLink = 'no data received yet';
            ctrl.defaultAutorenew = (ctrl.isChecked === 'true');
            ctrl.productPricesExist = true;
        }

        function handlePriceSuccess(response) {
            setupTracking();
            const bbSettings = ctrl.product.bbSettings;

            if (bbSettings.isChecked)
                ctrl.isChecked = bbSettings.isChecked;
            if (bbSettings.showAR)
                ctrl.showAR = bbSettings.showAR;
            if (bbSettings.hideArCheckbox) {
                ctrl.showAR = bbSettings.hideArCheckbox[0] && bbSettings.hideArCheckbox[0].toLowerCase() !== 'true';
            }

            resetPricingObjectsToDefault();

            ctrl.priceList = response.data;
            ctrl.priceList.sort((a, b) => {
                return parseInt(a.pack) - parseInt(b.pack);
            });

            if (!angular.isObject(ctrl.priceList) || !ctrl.priceList.length) {
                errorService.warn('API not available');
                ctrl.productPricesExist = false;
                return false;
            }
            setupPriceList();
        }

        function isPriceSavingDisplayed() {
            const hasCurVal = ctrl.currentValue && ctrl.currentValue.price_striked,
                buyblockData = ctrl.buyblockData;

            return hasCurVal && (buyblockData.saveRate || buyblockData.saveRateText);
        }

        function setEStore() {
            if (ctrl.estore || appHelperService.stateIncludes('lrc-verdict')) {
                ctrl.newEstore = ctrl.estore;
                return;
            }
            ctrl.newEstore = ctrl.product.bbSettings.eStore;
        }

        function getCNPackValue() {
            if (ctrl.locale === 'zh-cn' && (ctrl.productShortName === 'kav' || $state.params.productName === 'kav')) {
                return ctrl.packArr[0];
            }
        }

        function getUSPackValue() {
            if (ctrl.locale === 'en-us' && (ctrl.productShortName === 'ktsmd' || $state.params.productName === 'ktsmd')) {
                return _.find(ctrl.packArr, i => i === '5 Devices');
            }
        }

        function setupPriceList() {
            const hasAutoRenewal = ctrl.priceList.some(item => ctrl.showAR !== false && ctrl.priceList[0].autorenew !== item.autorenew);

            ctrl.packArr = _.uniq(ctrl.priceList.map(i => i.pack));
            ctrl.termArr = _.uniq(ctrl.priceList.map(i => i.term));

            ctrl.priceListGroupedBy = {
                'term': _.groupBy(ctrl.priceList, 'term'),
                'pack': _.groupBy(ctrl.priceList, 'pack')
            };

            // if we have only one autorenew and it doesn't match the default one
            if (ctrl.disableAutoRenew === 'true') {
                ctrl.showAR = false;
                ctrl.autorenew = false;
            } else {
                if (!hasAutoRenewal) {
                    ctrl.showAR = false;
                    ctrl.defaultAutorenew = ctrl.priceList[0].autorenew;
                } else {
                    ctrl.showAR = `${SETUP.showAR}`;
                }
            }

            // when we provided with a number for licenses convert it to string like '1 device' for LRC
            if (ctrl.selectedPack) {
                setCustomSelectedPack(ctrl);
            }
            // when we provided with a number for terms convert it to string like '2 years' for LRC
            if (ctrl.selectedTerm && ctrl.productShortName === 'ksec') {
                ctrl.selectedTermString = ctrl.selectedTerm;
            }
            else if (ctrl.selectedTerm) {
                setCustomSelectedTerm(ctrl);
            }

            ctrl.packValue = getCNPackValue() || ctrl.selectedPackString || getUSPackValue() || ctrl.packArr[0];
            ctrl.termValue = ctrl.selectedTermString || ctrl.termArr[0];
            ctrl.autorenew = (ctrl.selectedAutorenew === 'true') || ctrl.defaultAutorenew;

            // Emit Buyblock ready event to currency selector
            $rootScope.buyBlockReady();

            setCurrentValue();
            setAvailableOptionList('pack');
            setAvailableOptionList('term');

            updatePriceFormat();
        }

        function setCustomSelectedPack(ctrl) {
            const selectedPack = parseInt(ctrl.selectedPack);
            ctrl.selectedPackString = _.find(ctrl.packArr, value => parseInt(value) === selectedPack);
        }

        function setCustomSelectedTerm(ctrl) {
            if (ctrl.selectedTerm === '0') ctrl.selectedTerm = 1;

            if (ctrl.selectedTerm === '0.5' && ctrl.priceListGroupedBy.term['6 Months']) {
                ctrl.selectedTerm = ctrl.selectedTermString = '6 Months';
                return;
            }

            const selectedTermFloat = parseFloat(ctrl.selectedTerm),
                rounded = selectedTermFloat < 1 ? Math.ceil(selectedTermFloat) : Math.floor(selectedTermFloat);

            ctrl.termArr.forEach(function(value) {
                const valueInt = parseInt(value);
                // this is needed for cases where product is in months, and the term would come as 0.08 (30/365)
                // use ceil for numbers < 1 and floor for numbers > 1
                if (valueInt === rounded || valueInt === rounded - 1) {
                    ctrl.selectedTermString = value;
                }
            });
        }

        function setupTracking() {
            if (ctrl.purchaseType === 'Renewal') ctrl.omnitureText = 'Renew';
            if (ctrl.upgradeButton) ctrl.omnitureText = 'Upgrade';
        }

        function accountDescPopup() {
            ngDialog.open(buyblockService.ngDialogSettings(ctrl, $scope, {
                'className': 'ngdialog-plain ngdialog-narrow',
                'template': '/apps/kapp/modules/b2c/components/kscloud-disclaimers/templates/account-description.html'
            }));
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

        function updatePriceFormat() {
            let products = ['kesb-select', 'kesb-advanced', 'ksos', 'cloud'], hasProduct = _.some(products, product => product === ctrl.product.shortName);

            ctrl.showLabelFR = appHelperService.stateIncludes('lrc-verdict') && hasProduct && ENV.locale === 'fr-fr';
        }
    }
})();
