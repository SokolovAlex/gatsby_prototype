(function() {
    angular.module('kappGlobal.buyblocks')
        .factory('buyblockService', buyblockService);

    function buyblockService($rootScope, currencyManager, windowHelperService, sessionStorageService,
        appHelperService, $filter, SETUP) {
        return {
            'sendToBuyUrl': sendToBuyUrl,
            'hasPurchaseAsPurchaseType': hasPurchaseAsPurchaseType,
            'getCurrency': getCurrency,
            'checkDisclaimer': checkDisclaimer,
            'registerOnce': registerOnce,
            'showARPopup': showARPopup,
            'checkRenewal': checkRenewal,
            'ngDialogSettings': ngDialogSettings,
            'findPriceMatch': findPriceMatch,
            'hasTrialButton': hasTrialButton,
            'getSavings': getSavings
        };

        function sendToBuyUrl(buyLink) {
            return windowHelperService.goToUrl(buyLink);
        }

        function hasPurchaseAsPurchaseType(purchaseType) {
            return purchaseType && purchaseType === 'Purchase';
        }

        function ngDialogSettings(ctrl, scope, settings) {
            let defaultSettings = {
                'data': ctrl,
                'scope': scope
            };

            if (settings) for (let attr in settings) defaultSettings[attr] = settings[attr];

            return defaultSettings;
        }

        function getCurrency(value) {
            currencyManager.getCurrencies();

            let requiredArray = ['currency', 'symbol', 'locale'];
            let hasAllRequirements = requiredArray.every(function(item) {
                return value.hasOwnProperty(item);
            });

            if (!hasAllRequirements) return $rootScope.currency || '';
            $rootScope.populateCurrency({
                'currency': value.currency,
                'symbol': value.symbol,
                'locale': value.locale
            });
            return value.currency;
        }

        function checkDisclaimer(isB2B, b2cDisclaimer, b2bDisclaimer, hideAsteriskOnB2B) {
            let disclaimerObj = {};

            if (!isB2B && b2cDisclaimer) {
                disclaimerObj.asterisk = '*';
                disclaimerObj.disclaimer = b2cDisclaimer;
            }

            if (isB2B && b2bDisclaimer) {
                disclaimerObj.asterisk = hideAsteriskOnB2B ? '' : '*';
                disclaimerObj.disclaimer = b2bDisclaimer;
            }

            return disclaimerObj;
        }

        function registerOnce(checked, defaultAutoRenew, canClickTwice = false) {
            if (!defaultAutoRenew) return;
            let isRegistered = sessionStorageService.get('unchecked');
            if (isRegistered && canClickTwice) {
                $rootScope.$emit('clickedTwice');
                return;
            }
            if (isRegistered) return;
            sessionStorageService.set('unchecked', 'true');
            $rootScope.$emit('onceUnchecked');
            if (checked) {
                $rootScope.$emit('checkboxClicked', true);
            }
        }

        function showARPopup(arPopupButtons = 'true') {
            $rootScope.$emit('toggleARPopup', arPopupButtons);
            $rootScope.$emit('onceUnchecked');
        }

        /**
         * Given a list of price configurations, check if there are two different
         * configurations for the same pack and term values, one with autorenew enabled
         * and another one with no autorenew.
         * @param {object[]} priceList - List containing all the price configurations
         * @param {string | number} packValue - Provided pack value
         * @param {string} termValue - Provided term value
         * @param {boolean} parsePack - If provided and true, the value of the field
         *                              'pack' will be parsed to int before comparing
         * @returns {boolean} True if both configurations are found; false otherwise
         */
        function checkRenewal(priceList, packValue, termValue, parsePack) {
            let manualConfig = {
                    'pack': packValue,
                    'term': termValue,
                    'autorenew': false
                },
                autoConfig = {
                    'pack': packValue,
                    'term': termValue,
                    'autorenew': true
                };

            return findPriceMatch(priceList, manualConfig, parsePack) > -1
                && findPriceMatch(priceList, autoConfig, parsePack) > -1;
        }

        /**
         * Find a matching price config on a provided price list.
         * @param {object[]} priceList - List containing all the price configurations
         * @param {object} matchConfig - Target config to be found in the price list
         * @param {boolean} parsePack - If provided and true, the value of the field
         *                              'pack' will be parsed to int before comparing
         * @returns {number} The index of the first appearance of a matching config, if any; -1 otherwise
         */
        function findPriceMatch(priceList, matchConfig, parsePack) {
            const comparator = parsePack
                ? config => parseInt(config.pack) === parseInt(matchConfig.pack)
                    && config.term === matchConfig.term
                    && config.autorenew === matchConfig.autorenew
                : matchConfig;

            return _.findIndex(priceList, comparator);
        }

        /**
         * Check if the trial button must be shown or hidden
         * @param {object} productData - Product data from Tridion
         * @returns {boolean} True if trial button must be shown, false otherwise
         */
        function hasTrialButton(productData) {
            if (!productData) return true;
            if (!productData.freeTrialLink) return false;

            let hideInB2c = _.first(productData.hideTrialFromB2C) === 'True';
            let isB2cPage = appHelperService.assertStateByName('home-security');
            if (isB2cPage && hideInB2c) return false;

            let hideInSmb = _.first(productData.hideTrialFromSMB) === 'True';
            let isSmbPage = appHelperService.assertStateByName('vsb-home');
            if (isSmbPage && hideInSmb) return false;

            let hideInVsb = _.first(productData.hideTrialFromVSB) === 'True';
            let isVsbPage = appHelperService.assertStateByName('vsb-home');
            if (isVsbPage && hideInVsb) return false;

            let hideInLrc = SETUP.trialButtonsInsideLrc === 'false' || _.first(productData.hideTrialFromLRC) === 'True';
            let isLrcPage = appHelperService.assertStateByName([
                'lrc-verdict',
                'lrc-serial',
                'lrc-b2b',
                'lrc-b2b-att',
                'lrc-b2c',
                'lrc-b2c-att',
                'lrc-fallback',
                'vsb-lrc-closed'
            ]);
            if (isLrcPage && hideInLrc) return false;

            let hideInProductPage = _.first(productData.hideTrialFromProductPage) === 'True';
            let isProductPage = false;
            switch (productData.shortName) {
            case 'kac':
                isProductPage = appHelperService.assertStateByName('product-adcleaner');
                break;
            case 'kbls':
                isProductPage = appHelperService.assertStateByName('product-battery-life-saver');
                break;
            case 'kcp':
                isProductPage = appHelperService.assertStateByName('product-cleaner');
                break;
            case 'kfa':
                isProductPage = appHelperService.assertStateByName('product-kfa');
                break;
            case 'kisa-free':
                isProductPage = appHelperService.assertStateByName('product-kisa-free');
                break;
            case 'kpm':
                isProductPage = appHelperService.assertStateByName('home-product-kpm');
                break;
            case 'kqs':
                isProductPage = appHelperService.assertStateByName('product-qr-scanner');
                break;
            case 'ksc':
                isProductPage = appHelperService.assertStateByName('product-system-checker');
                break;
            case 'kscloud':
                isProductPage = appHelperService.assertStateByName('home-product-kscloud');
                break;
            case 'ksec':
                isProductPage = appHelperService.assertStateByName('product-ksec');
                break;
            case 'ksk':
                isProductPage = appHelperService.assertStateByName('product-ksk');
                break;
            case 'kss':
                isProductPage = appHelperService.assertStateByName('product-kss');
                break;
            case 'kwc': // Fall-through
            case 'ksu':
                isProductPage = appHelperService.assertStateByName('product-ksu');
                break;
            case 'kvs':
                isProductPage = appHelperService.assertStateByName('product-kvs');
                break;
            case 'kvspro':
                isProductPage = appHelperService.assertStateByName('product-kvspro');
                break;
            case 'kav': // Fall-through
            case 'kis': // Fall-through
            case 'kisa': // Fall-through
            case 'kismac': // Fall-through
            case 'ktsmd':
                isProductPage = appHelperService.assertStateByName('home-product');
                break;
            case 'kcpc': // Fall-through
            case 'kcpcs': // Fall-through
            case 'kpctu': // Fall-through
            case 'kpis': // Fall-through
            case 'kwbsc':
                isProductPage = appHelperService.assertStateByName('premium-service');
                break;
            case 'ksc-family':
            case 'ksc-personal':
                isProductPage = appHelperService.assertStateByName('home-product-kscloud');
                break;
            case 'kps': // Fall-through
            case 'ksos':
                isProductPage = appHelperService.assertStateByName('vsb-product');
                break;
            case 'kseb-core': // Fall-through
            case 'cloud':
                isProductPage = appHelperService.assertStateByName('smb-product-cloud');
                break;
            case 'kseb-advanced':
                isProductPage = appHelperService.assertStateByName('smb-product-advanced');
                break;
            case 'kseb-select':
                isProductPage = appHelperService.assertStateByName('smb-product-select');
                break;
            case 'total':
                isProductPage = appHelperService.assertStateByName('smb-product-total');
                break;
            }
            return !(isProductPage && hideInProductPage);
        }

        function roundPricingPercentage(num) {
            return Math.floor(num / 5) * 5;
        }

        function getSavings(messageType, selectedOption, bbSettings, buyblockData = {}, customSaveText, customSavingsPriceType, component) {
            let savingsPrice = '',
                currentPrice = selectedOption.price,
                priceStriked = selectedOption.price_striked,
                savingsPriceType = customSavingsPriceType || (bbSettings && bbSettings.savingsPriceType),
                savingsText = customSaveText || (bbSettings && bbSettings.saveRateText) || (messageType === 'rate' ? buyblockData.saveRate : buyblockData.saveText);

            if (angular.isDefined(component) && angular.isDefined(bbSettings.saveMsgOverride)) {
                for (let i = 0; i < bbSettings.saveMsgOverride.length; i++) {
                    if (bbSettings.saveMsgOverride[i].component === component) {
                        savingsText = bbSettings.saveMsgOverride[i].savingsMsgOverride;
                        savingsPriceType = bbSettings.saveMsgOverride[i].savingsPriceType;
                    }
                }
            }

            if (!savingsPriceType) {
                return savingsText;
            }

            if (savingsPriceType && savingsText) {
                if (savingsPriceType === 'difference') {
                    savingsPrice = $filter('customCurrency')(priceStriked - currentPrice);
                }

                if (savingsPriceType === 'percentage') {
                    savingsPrice = `${Math.round(roundPricingPercentage(((priceStriked - currentPrice) / priceStriked) * 100))}%`;
                }

                if (savingsPriceType === 'exact') {
                    savingsPrice = `${Math.round((priceStriked - currentPrice) / priceStriked * 100)}%`;
                }
            }

            savingsText = _.replace(savingsText, '((savings))', savingsPrice) || false;

            return savingsText;
        }
    }
})();
