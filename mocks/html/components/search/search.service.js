(function() {
    'use strict';
    angular.module('kappGlobal.search')
        .factory('searchService', searchService);

    function searchService($http, $window, $location, $stateParams, ENV, $rootScope) {
        let _searchUrl = `${ENV.apiServer}/_svc/search.svc/`;
        return {
            'search': search,
            'getDataPage': getDataPage,
            'getNavigators': getNavigators,
            'getSearchQueryValue': getSearchQueryValue,
            'mapSearchResult': mapSearchResult,
            'clearLocationSearch': clearLocationSearch,
            'autocomplete': autocomplete,
            'autocompleteCallback': autcompleteCallback,
            'setUrlWithSearchQuery': setUrlWithSearchQuery
        };

        function search(queryText, section) {
            let languages = $window.navigator['languages'],
                languageCode = ENV.locale.match(/^\w+/i) || getCurrentLanguageCode(languages) || 'en',
                countryCode = ENV.locale.match(/\w+$/i) || getCurrentCountryCode(languages) || 'global';
            return $http.get(_searchUrl + `Search?query=${queryText}&languageCode=${languageCode}&countryCode=${countryCode}&sec=${section}&sort=${''}`);
        }

        function getDataPage(searchId = '', pageNumber) {
            return $http.get(_searchUrl + `GetDataPage?searchId=${searchId}&pageNumber=${pageNumber}`);
        }

        function getNavigators(searchId = '') {
            return $http.get(_searchUrl + `GetNavigators?searchId=${searchId}`);
        }

        function getCurrentCountryCode(data) {
            let [dataArray] =  data,
                [, countryCode] = dataArray.split('-');
            return countryCode.toLowerCase();
        }

        function getCurrentLanguageCode(data) {
            let [dataArray] =  data,
                [languageCode] = dataArray.split('-');
            return languageCode.toLowerCase();
        }

        function getSearchQueryValue() {
            return $stateParams.query;
        }

        function setUrlWithSearchQuery(queryText) {
            $location.path('/search').search({'query': queryText});
        }

        function mapSearchResult(data) {
            return {
                'searchId': data['search_id'],
                'numberOfPages': data['pages'],
                'count': data['count']
            };
        }

        function clearLocationSearch() {
            $location.search('searchPageNumber', null);
        }

        function autocomplete(value) {
            let acomplete = $('#autocompleteElement');
            if (acomplete.length) acomplete.remove(); // remove if we already had it
            let requestScript = $window.document.createElement('script');
            requestScript.id = 'autocompleteElement';
            // Our autocomplete profile is Marketing2enUS, phrase is taken from search bar, and method is specified as the one we use
            requestScript.src = `https://autocomplete.kaspersky.com/SLAutoCompleteService.svc/GetAutocompleteData?phrase=${encodeURIComponent(value)}&profile=Marketing2enGB&count=10&method=angular.element(document).injector().get('searchService').autocompleteCallback`;
            $window.document.head.appendChild(requestScript);
        }

        function autcompleteCallback(value) {
            value.d[0].Value.shift(); // Removing original request value, kept as first item of response to prevent XSS attacks
            $rootScope.$emit('autocompleteCall', value);
        }
    }
})();
