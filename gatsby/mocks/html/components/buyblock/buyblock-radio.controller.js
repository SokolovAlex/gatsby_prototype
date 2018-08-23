(function() {
    'use strict';
    angular.module('kappGlobal.buyblocks')
        .controller('buyblockRadioController', buyblockRadioController);

    function buyblockRadioController($rootScope, $q, $scope, $state, ENV, SEO,
        SETUP, directiveData, priceData, productData, windowHelperService, buyblockService, errorService, ngDialog, geoLocationManager, appHelperService) {
        let ctrl = this;
        ctrl.isChecked = SETUP.isChecked;
        ctrl.productPricesExist = true;
        ctrl.showAR = SETUP.showAR;
        ctrl.showOnlyAR = false;
        ctrl.hidePack = false;
        ctrl.curState = $state.current.parent;
        ctrl.stateName = $state.current.name;
        ctrl.navigateUserTo = windowHelperService.navigateUserTo;
        ctrl.currency = buyblockService.getCurrency(ctrl);
        ctrl.$id = $scope.$id || Math.random().toString(36).substring(7); // backup for cases where $scope.$id is 0 and falsey
        ctrl.buyLink = 'no data received yet';
        ctrl.currentValue = {
            'price': 'no data',
            'eStore': '/store'
        };
        ctrl.registerOnce = registerOnce;
        ctrl.showARPopup = showARPopup;
        ctrl.getPriceList = getPriceList;
        ctrl.setSelectedOption = setSelectedOption;
        ctrl.applyOption = applyOption;
        ctrl.radioFilter = radioFilter;
        ctrl.sendToBuyUrl = sendToBuyUrl;
        ctrl.addSalesTrackingParameters = addSalesTrackingParameters;
        ctrl.getPromoline = getPromoline;
        ctrl.hasTrialButton = hasTrialButton;
        ctrl.moreDevicesPopup = moreDevicesPopup;
        ctrl.accountDescPopup = accountDescPopup;
        ctrl.handleBundleChange = handleBundleChange;
        ctrl.getSavings = getSavings;
        ctrl.isActive = isActive;
        ctrl.switchTerm = switchTerm;
        ctrl.productPageName =  $state.params.jsonName;

        // $rootScope destroy events begin
        let currencyChange = $rootScope.$on('currencyChange', handleCurrencyChange),
            productSelected,
            arPopupCheck = $rootScope.$on('arPopupCheck', (event, value) => {
                if (value && ctrl.showAR) {
                    ctrl.autorenew = value;
                } else {
                    ctrl.autorenew = false;
                }
                applyOption();
            }),
            orderBy = {
                'TERM': 'term',
                'TERM_PACK': 'term then pack',
                'PACK': 'pack',
                'PACK_TERM': 'pack then term'
            };

        // $rootScope destroy events end

        function setUnavailableText() {
            ctrl.buyblockUnavailableText = ctrl.isProductBlocked && isProductKSC() ? ctrl.buyblockData.kscUnavailableText : ctrl.buyblockData.buyblock_not_available_msg;
            if (!ctrl.buyblockUnavailableText) ctrl.buyblockUnavailableText = '<p>This product is currently unavailable in your region. Please <a href="/about/contact">contact us</a> for further details.</p>';
        }

        /**
         * Handler for when an option is selected in another buyblock with the same product.
         * @param  {Object} event
         * @param  {Object} optionObj   The object of the active option
         */
        function handleProductSelected(event, optionObj) {
            if (optionObj.scope === ctrl.$id) return;
            ctrl.autorenew =  optionObj.autoRenewal;
            ctrl.hasBundle = optionObj.hasBundle;
            ctrl.isBundleActive = optionObj.isBundleActive;
            ctrl.priceList = optionObj.priceList;
            setSelectedOption(optionObj.optionID);
            if (ctrl.selectedID !== optionObj.optionID) updateSelectedID(optionObj.optionID);
        }

        /**
         * Updates the radio checkbox with the active option
         * @param  {Number} id The ID of the active option
         */
        function updateSelectedID(id) {
            if (angular.isUndefined(id)) return;
            ctrl.selectedID = id;
        }

        ctrl.$onInit = activate;

        function activate() {
            ctrl.defaults = {
                'term': ctrl.selectedTerm,
                'pack': ctrl.selectedPack
            };
            ctrl.locale = ctrl.locale || ENV.locale;
            let productData = getProductData(),
                buyBlockSetup = buyblockSetup(),
                promises = [productData, buyBlockSetup];
            $q.all(promises).then(setUnavailableText);
            $scope.$on('$destroy', handleScopeDestroyed);
        }

        function hasTrialButton() {
            return buyblockService.hasTrialButton(ctrl.product) && !ctrl.hideTrialButton;
        }

        function addSalesTrackingParameters(event) {
            if (event) event.preventDefault();
            sendToBuyUrl();
        }

        function getPriceList() {
            if (angular.isUndefined(ctrl.productName) || ctrl.stateName === 'home-downloads') return;
            setEStore();
            return priceData.getPrice(ctrl.productName, ctrl.purchaseType, ctrl.currency, ctrl.newEstore || '')
                .then(handlePriceSuccess, handlePriceError);
        }

        function registerOnce(checked) {
            buyblockService.registerOnce(checked, ctrl.isChecked);
        }

        function radioFilter(input) {
            if (!input || input.autorenew !== ctrl.autorenew) {
                return;
            }
            if (ctrl.itemOffersGroupLimit && input.outOfGroupVisibleLimit) {
                return;
            }
            if (ctrl.priceList.length <= ctrl.limitTo || ctrl.showEvenDevices === 'Yes') {
                return true;
            }

            const isUSLocale = ENV.locale === 'en-us';

            if (isUSLocale && $state.includes('lrc-verdict') && ctrl.defaults.pack) {
                if (parseInt(input.pack) % ctrl.defaults.pack === 0) {
                    return true;
                }
            }
            else if (isUSLocale && ctrl.productShortName === 'ktsmd') {
                if (parseInt(input.pack) % 5 === 0) {
                    return true;
                }
            } else {
                if (parseInt(input.pack) % 2 !== 0) {
                    return true;
                }
            }
        }

        function getPromoline() {
            // GWP-31338 home-security page has a specific promoline
            const isHomeSec = ctrl.stateName === 'home-security';
            return ctrl.buyblockData
                ? ctrl.buyblockData[isHomeSec ? 'promolineHomeSecurity' : 'promoline']
                : ctrl.promoline;
        }

        function showARPopup() {
            buyblockService.showARPopup(ctrl.showAR);
        }

        function getBuyButtonText() {
            let isExtendedButtonText = angular.isString(ctrl.updateButtonText) ? ctrl.updateButtonText !== 'false' : ctrl.updateButtonText;
            if (ENV.locale === 'ru-ru' && isExtendedButtonText) {
                ctrl.updatedBuyButtonText = ctrl.buyblockData.extendButtonText;
            } else if (ENV.locale === 'en-us' && ctrl.upgradeButton) {
                ctrl.updatedBuyButtonText = ctrl.buyblockData.upgradeText;
            } else if (ENV.locale === 'en-us' && !ctrl.upgradeButton && ctrl.purchaseType !== 'Purchase') {
                ctrl.updatedBuyButtonText = ctrl.buyblockData.renewText;
            } else {
                ctrl.updatedBuyButtonText = ctrl.buyButtonText || ctrl.buyblockData.buyText;
            }
        }

        function sendToBuyUrl() {
            buyblockService.sendToBuyUrl(ctrl.buyLink, ctrl.purchaseType);
        }

        function hidePack() {
            if (ctrl.locale === 'ru-ru' && (ctrl.productShortName === 'ksc-family' || (ctrl.product && ctrl.product.shortName === 'ksc-family'))) {
                ctrl.hidePack = true;
            }
        }

        // Private methods
        function buyblockSetup() {
            return directiveData.getLocal('buyblock/buyblock-texts')
                .then(response => {
                    ctrl.buyblockData = response.data.fields;
                    let isB2B = $state.current.parent ? Boolean($state.current.parent.match(/(smb|vsb)/ig)) : false;
                    checkDisclaimer(isB2B);
                    getBuyButtonText();
                    hidePack();
                });
        }

        function doScreenshotsSeo() {
            let newScreenshotsArr = [],
                seoAltTexts = SEO[ENV.locale] || SEO['default'],
                screenshots = (ctrl.productInfo) ? ctrl.productInfo.screenshots : [];
            for (let i = 0, len = screenshots.length; i < len; i++) {
                let obj = {},
                    ss = screenshots[i];
                if (angular.isString(ss)) {
                    let name = ss.split('/').pop().split('.')[0];
                    obj.path = ss;
                    obj.name = name;
                    obj.altText = (seoAltTexts && seoAltTexts[name]) ? seoAltTexts[name] : name;
                    newScreenshotsArr.push(obj);
                }
            }
            ctrl.productInfo.screenshots = newScreenshotsArr; // replace array of string, with array of object
        }

        function checkDisclaimer(isB2B) {
            let b2bDisclaimer = ctrl.buyblockData.disclaimer || ctrl.buyblockData.smbDisclaimer;
            ctrl.disclaimerObj = ctrl.hidePriceDisclaimer === 'true' && $rootScope.kaspersky.verdictSite !== 'ATT' ? false : ctrl.product && ctrl.product.bbDisclaimer
                ? {'disclaimer': ctrl.product.bbDisclaimer, 'asterisk': '*'}
                : buyblockService.checkDisclaimer(isB2B, ctrl.buyblockData.b2cDisclaimer, b2bDisclaimer);
        }

        function resetPricingObjectsToDefault() {
            ctrl.priceList = [];
            ctrl.selectedOption = {
                'price': ''
            };
            ctrl.selectedPack = ctrl.defaults.pack;
            ctrl.selectedTerm = ctrl.defaults.term;
            ctrl.buyLink = 'no data received yet';
            ctrl.autorenew = (ctrl.isChecked === 'true');
            ctrl.productPricesExist = true;
            ctrl.isBBReady = false;
        }

        function handleCurrencyChange() {
            if (ctrl.currency === $rootScope.currency) return;
            ctrl.isBBReady = false;
            ctrl.currency = $rootScope.currency;
            if (ctrl.product.bbSettings.purchaseType !== 'Free' && !ctrl.isProductBlocked) getPriceList();
        }

        function handleBundleChange() {
            if (!ctrl.isBundleActive) ctrl.productNameBackup = ctrl.productName;

            ctrl.isBundleActive = !ctrl.isBundleActive;
            ctrl.productName = ctrl.isBundleActive ? ctrl.product.bundleProductName : ctrl.productNameBackup;
            ctrl.previousBundleOption = ctrl.selectedOption;
            $scope.$emit('buyblockBundleChange', {
                'isActive': ctrl.isBundleActive,
                'productName': ctrl.productShortName
            });

            getPriceList();
            applyOption();
        }

        function handleScopeDestroyed() {
            if (angular.isFunction(productSelected)) productSelected();
            currencyChange();
            arPopupCheck();
            $rootScope.mainProductAlreadySelected = false;
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

        /**
         * Get the default option either from Product settings or template override
         */
        function getDefaultOption() {
            let option,
                hasTemplateOverride,
                hasProductOverride;
            hasTemplateOverride = (ctrl.defaults.term || ctrl.defaults.pack);
            hasProductOverride = (ctrl.product.bbSettings && ctrl.product.bbSettings.selectedTerm && ctrl.product.bbSettings.selectedPack);

            if (hasTemplateOverride) option = findOptionByKeys(ctrl.defaults.term, ctrl.defaults.pack);
            if (ctrl.previousBundleOption) option = findOptionByKeys(ctrl.previousBundleOption.term, ctrl.previousBundleOption.pack);
            if (!option && hasProductOverride) option = findOptionByKeys(ctrl.product.bbSettings.selectedTerm, ctrl.product.bbSettings.selectedPack);
            if (!option) option = findFirstAvailableOption();
            return option;
        }

        function findFirstAvailableOption() {
            let filteredPriceList = ctrl.priceList.filter(radioFilter),
                options = ctrl.showTerm && ctrl.monthlyAvailable ? ['subscription', ctrl.showTerm] : ['autorenew', ctrl.autorenew];
            return _.find(filteredPriceList, options);
        }

        /**
         * Get the default options either from Product settings or template override
         */
        function findOptionByKeys(term, pack) {
            let isSelectedTerm,
                filteredPriceList = ctrl.priceList.filter(radioFilter);

            if (!filteredPriceList.length) filteredPriceList = ctrl.priceList;

            term = term || ctrl.selectedOption.term || filteredPriceList[0].term;
            pack = pack || ctrl.selectedOption.pack || filteredPriceList[0].pack;
            return _.find(filteredPriceList, function(obj) {
                isSelectedTerm = term.length > 2 ? obj.term === term : parseInt(obj.term) === parseInt(term);
                return isSelectedTerm && parseInt(obj.pack) === parseInt(pack) && obj.autorenew === ctrl.autorenew;
            });
        }

        /**
         * Get the default options either from Product settings or template override
         */
        function findOptionById(id = ctrl.selectedID) {
            return _.find(ctrl.priceList, ['id', parseInt(id)]);
        }

        function setupPriceList(listOrderBy) {
            const productHasAutoRenewal = ctrl.priceList.some(item => ctrl.priceList[0].autorenew !== item.autorenew);

            // if we have only one autorenew and it doesn't match the default one

            if (ctrl.disableAutoRenew === 'true') {
                ctrl.showAR = false;
                ctrl.autorenew = false;
            } else {
                if (!productHasAutoRenewal) {
                    ctrl.showAR = false;
                    ctrl.autorenew = ctrl.priceList[0].autorenew;
                } else {
                    ctrl.showAR = SETUP.showAR;
                }
            }

            // apply default for RU if not overridden
            if (ENV.locale === 'ru-ru') listOrderBy = !listOrderBy ? orderBy.TERM_PACK : listOrderBy;

            const orderByFunc = getOrderByFunction(listOrderBy) || getOrderByFunction(orderBy.PACK_TERM);
            ctrl.priceList.sort(orderByFunc);

            if (ctrl.itemOffersGroupLimit) {
                _.values(_.groupBy(ctrl.priceList, 'autorenew')).forEach(arGroup => {
                    const itemsByTerm = _.values(_.groupBy(arGroup, 'term'));

                    if (itemsByTerm.length > 1) {
                        itemsByTerm.forEach(groupedList => {
                            groupedList.slice(ctrl.itemOffersGroupLimit)
                                .forEach(item => item.outOfGroupVisibleLimit = true);
                        });
                    }
                });
            }

            applyOption(true);

            if (isProductKSC()) checkMonthlyOptions();

            // Emit Buyblock ready event to currency selector
            $rootScope.buyBlockReady();
            getFirstProductMaxAndMinPrices(ctrl.priceList);
            ctrl.showMoreDevices = hasMoreDevices();
        }

        /**
         * Returns the matching sort function or undefined if not matched to one of orderBy constants
         * @param key
         * @return {function|undefined}
         */
        function getOrderByFunction(key) {
            switch (key) {
            case orderBy.TERM:
                return buildOrderByFunction('term');
            case orderBy.TERM_PACK:
                return buildOrderByFunction('term', buildOrderByFunction('pack'));
            case orderBy.PACK:
                return buildOrderByFunction('pack');
            case orderBy.PACK_TERM:
                return buildOrderByFunction('pack', buildOrderByFunction('term'));
            }
        }

        /**
         * Builds and returns an int based ordering function for prop
         * @param {String} prop name of prop to sort on
         * @param {function?} equalSort equal case callback
         * @return {function(a, b): number}
         */
        function buildOrderByFunction(prop, equalSort) {
            return (a, b) => {
                const propA = parseInt(a[prop]),
                    propB = parseInt(b[prop]);
                return equalSort && propA === propB ? equalSort(a, b) : propA - propB;
            };
        }

        function checkMonthlyOptions() {
            ctrl.monthlyAvailable = false;
            ctrl.priceList.forEach((item) => {
                if (parseFloat(item.term) % 1 !== 0) {
                    ctrl.monthlyAvailable = true;
                    ctrl.showTerm = ctrl.product.bbSettings.selectedTab;
                    let dec = Math.round(item.term.match(/\d+(.|,)\d+/g) * 12);
                    item.term = item.term.replace(/\d+(.|,)\d+/g, dec);
                    item.subscription = 'Month';
                } else item.subscription = 'Year';
            });
            switchArCheckbox();
        }

        function isActive(name) {
            return ctrl.showTerm === name;
        }

        function switchTerm(showTerm) {
            ctrl.showTerm = showTerm;
            switchArCheckbox();
        }

        function updateOptions() {
            ctrl.selectedOption = findFirstAvailableOption();
            updateSelectedID(ctrl.selectedOption.id);
            $scope.$emit(`productSelected-${ctrl.productShortName}`, {
                'scope': ctrl.$id,
                'optionID': ctrl.selectedOption.id,
                'autoRenewal': ctrl.autorenew,
                'priceList': ctrl.priceList,
                'hasBundle': ctrl.hasBundle,
                'isBundleActive': ctrl.isBundleActive
            });
            getBuyLink();
        }

        function switchArCheckbox() {
            ctrl.priceList.some(function(item) {
                if (item.subscription && ctrl.showTerm) {
                    if (ctrl.showTerm === 'Month') {
                        showHideTabs('false', true);
                    } else {
                        showHideTabs('true', false);
                    }
                    ctrl.autorenew = item.autorenew;
                    updateOptions();
                    return true;
                } else {
                    showHideTabs('true', false);
                    return true;
                }
            });
        }

        function showHideTabs(showAR, showOnlyAR) {
            if (ctrl.monthlyAvailable) {
                ctrl.showAR = showAR;
                ctrl.showOnlyAR = showOnlyAR;
            } else ctrl.showTerm = 'Year';
        }

        /**
         * Override buyblock settings with ones from Tridion. Needs to run even if they're set to false.
         */
        function overrideBuyblockSettings() {
            // if we have overridden values come from Tridion - needs to run even if false
            const bbSettings = ctrl.product.bbSettings;

            [
                'isChecked',
                'showAR',
                'itemOffersOrderBy',
                'itemOffersGroupLimit'
            ]
                .filter(key => angular.isDefined(bbSettings[key]))
                .forEach(key => ctrl[key] = bbSettings[key]);

            if (angular.isDefined(bbSettings.hideArCheckbox) && bbSettings.hideArCheckbox[0]) ctrl.hideArCheckbox = bbSettings.hideArCheckbox[0];
        }

        /**
         * Preparation for pricelist.
         * @param  {Object} response The pricelist object
         */
        function handlePriceSuccess(response) {
            overrideBuyblockSettings();
            resetPricingObjectsToDefault();

            ctrl.priceList = response.data;
            if (!angular.isArray(ctrl.priceList) || !ctrl.priceList.length) {
                return handlePriceError('API not available');
            }
            setupPriceList(ctrl.product.bbSettings.itemOffersOrderBy);
        }

        /**
         * Handles product not found, prices or service not available
         * @param  {String} response
         */
        function handlePriceError(response) {
            ctrl.productPricesExist = false;
            ctrl.isBBReady = true;
            errorService.warn(response);
            return false;
        }

        function setProductPageLink() {
            ctrl.product.prodPageLink = ctrl.hideProductLinks ? '' : ctrl.product.prodPageLink;
        }

        /**
         * Sets the number of options to show in radio list to 6.
         * For US LRC verdicts this is meant to be 3 (except KSC)
         */
        function setOptionsLimit() {
            ctrl.limitTo = ctrl.locale === 'en-us' && ($state.includes('lrc-verdict') && !isProductKSC()) ? 3 : 6;
        }

        /**
         * Get the product data when we already have the product short name available
         */
        function getProductByName() {
            return productData.getb2c(ctrl.productShortName)
                .then((response) => {
                    handleProductData(response.data.fields);
                });
        }

        /**
         * Checks whether we need to listen for the product data to come from another component
         */
        function getProductData() {
            if (ctrl.productShortName) return getProductByName();

            let productInfo = $scope.$watch('$ctrl.productInfo', (newV) => {
                if (!newV) return;
                handleProductData(ctrl.productInfo);
                productInfo();
            });
        }

        function isProductKSC() {
            return ctrl.productShortName.indexOf('ksc') > -1;
        }
        /**
         * Set up product data bindings
         * @param  {Object} product Product data
         */
        function handleProductData(product) {
            ctrl.product = ctrl.productInfo = product;
            if (!ctrl.productShortName) ctrl.productShortName = product.shortName;
            ctrl.productName = product.title;
            ctrl.showEvenDevices = product.bbSettings.showEvenDevices;
            ctrl.hasBundle = $state.params.bundle && appHelperService.isTrue(ctrl.product.enableBundle) && ctrl.product.bundleProductName;

            productSelected = $rootScope.$on(`productSelected-${ctrl.productShortName}`, handleProductSelected);

            if (ctrl.locale === 'en\-global' && isProductKSC()) blockProhibitedCountries();
            if (ctrl.product.bbSettings.purchaseType !== 'Free' && !ctrl.isProductBlocked) getPriceList();
            doScreenshotsSeo();
            setProductPageLink();
            setOptionsLimit();
        }

        function blockProhibitedCountries() {
            if (geoLocationManager.isKscProhibitedCountry()) {
                ctrl.isProductBlocked = true;
                handlePriceError('Product not available in this country');
            }
        }

        /**
         * Whether to show the button 'Show more devices' or not
         * @return {Boolean}
         */
        function hasMoreDevices() {
            let checkAutoRenewal = _.countBy(ctrl.priceList, 'autorenew');
            return checkAutoRenewal.false ? checkAutoRenewal.false > ctrl.limitTo : checkAutoRenewal.true > ctrl.limitTo;
        }


        /**
         * Set an option from the radio checkbox or from another buyblock. If ID is present, it's internal.
         * @param {String|Number} id The ID of the option to select
         */
        function setSelectedOption(id) {
            if (angular.isUndefined(id)) {
                $scope.$emit(`productSelected-${ctrl.productShortName}`, {
                    'scope': ctrl.$id,
                    'optionID': ctrl.selectedID,
                    'autoRenewal': ctrl.autorenew,
                    'priceList': ctrl.priceList,
                    'hasBundle': ctrl.hasBundle,
                    'isBundleActive': ctrl.isBundleActive
                });
            }

            if (angular.isArray(ctrl.priceList)) ctrl.selectedOption = findOptionById(id) || findFirstAvailableOption();
            getBuyLink();
        }

        /**
         * Reapply an existing option (e.g. if switching from AR to non-AR)
         */
        function applyOption(isInit) {
            ctrl.selectedOption = isInit ? getDefaultOption() : findOptionByKeys() || findFirstAvailableOption();
            updateSelectedID(ctrl.selectedOption.id);
            $scope.$emit(`productSelected-${ctrl.productShortName}`, {
                'scope': ctrl.$id,
                'optionID': ctrl.selectedOption.id,
                'autoRenewal': ctrl.autorenew,
                'priceList': ctrl.priceList,
                'hasBundle': ctrl.hasBundle,
                'isBundleActive': ctrl.isBundleActive
            });
            getBuyLink();
        }

        /**
         * Get the buy link for the current selected option
         */
        function getBuyLink() {
            ctrl.isBBReady = false;
            if (angular.isUndefined(ctrl.selectedOption)) return false;
            return priceData.getCartLink(ctrl.selectedOption.product_id, ctrl.selectedOption.id, ctrl.purchaseType, ctrl.productName, ctrl.resellerOverride)
                .then(handleBuyLinkSuccess, handleBuyLinkError)
                .then(() => { ctrl.isBBReady = true; });
        }

        /**
         * Prepare checkout link for tracking
         * @param  {Object} response The checkout link object
         */
        function handleBuyLinkSuccess(response) {
            ctrl.buyLink = response.data;
        }

        /**
         * Handle link not found
         * @param  {Object|String} response
         */
        function handleBuyLinkError(response) {
            errorService.warn(response);
            ctrl.buyLink = 'Oops! Something went wrong';
        }

        function moreDevicesPopup() {
            ngDialog.open(buyblockService.ngDialogSettings(ctrl, $scope, {
                'className': 'ngdialog-no-bg',
                'template': '/apps/kapp/modules/_shared/components/buyblock/templates/buyblock-more-devices-popup.html'
            }));
        }

        function accountDescPopup() {
            ngDialog.open(buyblockService.ngDialogSettings(ctrl, $scope, {
                'className': 'ngdialog-plain ngdialog-narrow',
                'template': '/apps/kapp/modules/b2c/components/kscloud-disclaimers/templates/account-description.html'
            }));
        }

        function getFirstProductMaxAndMinPrices(priceList) {
            if (!angular.isArray(priceList)) return;
            if (!$rootScope.mainProductAlreadySelected) {
                let filteredPriceList = priceList.filter(x => ctrl.radioFilter(x));
                ctrl.minValue = filteredPriceList[0].price;
                ctrl.maxValue = filteredPriceList[filteredPriceList.length - 1].price;
                $rootScope.mainProductAlreadySelected = true;
            }
        }

        /**
         * Get savings messaging and value (either custom or default)
         */
        function getSavings(messageType) {
            if (angular.isUndefined(ctrl.product) || angular.isUndefined(ctrl.buyblockData) || angular.isUndefined(ctrl.selectedOption)) return;

            let overrideText = ctrl.hasBundle && ctrl.isBundleActive ? ctrl.product.bundleBuyblockPromo : null;

            return buyblockService.getSavings(messageType, ctrl.selectedOption, ctrl.product.bbSettings, ctrl.buyblockData, overrideText || ctrl.saveRateText, ctrl.savingsPriceType, ctrl.component);
        }
    }
})();
