(function() {
    'use strict';
    angular.module('kappGlobal.filters')
        .filter('html', function($sce, ENV) {
            return function(arg) {
                if (arg) {
                    arg = arg.replace(/content\/\w+\-\w+\//ig, `content/${ENV.locale}/`);
                    arg = `<content>${arg || ''}</content>`; // for search markup
                }

                return $sce.trustAsHtml(arg);
            };
        })
        .filter('trustUrl', function($sce) {
            return function(url) {
                return $sce.trustAsResourceUrl(url);
            };
        })
        .filter('xpm', function($sce) {
            return function(input, rootEl, name, index) {
                let fieldMarkup;
                if (name && name.match(/cnt/)) name = name.replace(/cnt/, index);
                fieldMarkup = '<!-- Start Component Field: {"XPath" : "tcm:Content/custom:' + rootEl + '/custom:' + name + '"} -->' + input;
                return $sce.trustAsHtml(fieldMarkup);
            };
        })
        .filter('stripHtmlTags', function() {
            return function(string) {

                return (angular.isString(string) || string instanceof String) ? string.replace(/<\S[^><]*>/g, '') : string;
            };
        })
        .filter('capitalizeFirstLetter', function() {
            return function(input) {
                let retVal = (input) ? input.charAt(0).toUpperCase() + input.substring(1).toLowerCase() : '';
                return retVal;
            };
        })
        .filter('dashify', function() {
            return function(input) {
                let retVal = (input) ? input.replace(/\s+/g, '-').toLowerCase() : '';
                return retVal;
            };
        })
        .filter('customCurrency', function(currencyManager, $filter, $locale) {
            function customCurrency(input) {
                let currencyObj = currencyManager.getCurrentCurrency();
                if (!currencyObj) return input;
                let currencyTemplate = currencyObj.template || '$1',
                    tempVal,
                    decimals = angular.isNumber(currencyObj.decimalCount) ? currencyObj.decimalCount : 2;

                // set the number of decimals for the number, based on config
                tempVal = $filter('number')(input, decimals);

                // match the template (e.g. $ 1) by replacing $ with the currency symbol and 1 with the number.
                currencyTemplate = currencyTemplate.replace('$', currencyObj.symbol || $locale.NUMBER_FORMATS.CURRENCY_SYM).replace('1', tempVal);
                return currencyTemplate;
            }
            customCurrency.$stateful = true;
            return customCurrency;
        });
})();
