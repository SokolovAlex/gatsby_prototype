(function() {
    'use strict';
    angular.module('kappGlobal.search')
        .controller('searchController', searchController);

    function searchController($rootScope, $stateParams, $element, $scope, $window, directiveData, searchService, $sanitize, $log, errorService) {
        let ctrl = this;
        ctrl.searchModel = {
            'query': '',
            'searchTerm': '',
            'orderBy': 'date',
            'responseCount': 0,
            'responsePages': 0,
            'currentPage': 1,
            'pageSize': 10,
            'responseData': [],
            'allPages': [],
            'pageNumbers': []
        };

        ctrl.showNoresultDisplay = false;
        ctrl.search = search;
        ctrl.getPaginationNumbering = getPaginationNumbering;
        ctrl.changeOrderBy = changeOrderBy;
        ctrl.getPageDisplayTotal = getPageDisplayTotal;
        ctrl.getPageStartDisplay = getPageStartDisplay;
        ctrl.pageChangeHandler = pageChangeHandler;
        ctrl.$onInit = activate;
        ctrl.$onDestroy = handleDestruction;

        function decodeSearchQuery(searchQuery) {
            let doc = $window.document,
                element = doc.createElement('div');
            element.innerHTML = searchQuery;
            return element.textContent;
        }

        function activate() {
            getData();
            let searchQuery = $sanitize($stateParams.query);
            ctrl.searchModel.query = decodeSearchQuery(searchQuery);
            if (!searchQuery) return;
            search(searchQuery);
            ctrl.autocomplete();
        }
        // Sanitization of an input
        $scope.$watch('$ctrl.searchModel.query', function(newV) {
            ctrl.searchModel.query = decodeSearchQuery($sanitize(newV.replace(/<[^>]+>/gm, '')));
        });

        function getData() {
            return directiveData.getLocal('general-translations').then((response) => {
                ctrl.searchData = response.data.fields;
            }, handleRejection);
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        let autoOff = $rootScope.$on('autocompleteCall', (ev, val) => {
            ctrl.autocompleteQ = val.d[0].Value;
        });

        ctrl.autocomplete = () => {
            searchService.autocomplete(ctrl.searchModel.query, $element);
        };

        function handleDestruction() {
            autoOff();
            let autocompleteTag =  $window.document.querySelector('#autocompleteElement');
            if (autocompleteTag) $window.document.querySelector('head').removeChild(autocompleteTag);
        }

        function search(queryText, section) {
            let decodedQueryText = decodeSearchQuery(queryText);
            reset(decodedQueryText);
            return searchAndGetPages(decodedQueryText, section);
        }

        function searchAndGetPages(queryText, section = '') {
            return searchService.search(queryText, section)
                .then(getSearchResponse, handleRejection);
        }

        function reset(queryText) {
            ctrl.searchModel.allPages = [];
            ctrl.searchModel.currentPage = 1;
            ctrl.searchModel.responseCount = 0;
            ctrl.searchModel.searchTerm = queryText;
            ctrl.searchModel.query = queryText;
            ctrl.autocompleteQhtml = undefined;
            ctrl.autocompleteQ = undefined;
        }

        function getSearchResponse(response) {
            ctrl.searchModel.responseData = searchService.mapSearchResult(response.data);
            ctrl.searchModel.responseCount = response.data['count'];
            ctrl.searchModel.responsePages = response.data['pages'];

            if (ctrl.searchModel.responseCount === 0) {
                ctrl.showNoresultDisplay = true;

                setRootScopeProperties(ctrl.searchModel.query, 0);
            } else {
                return searchService.getDataPage(ctrl.searchModel.responseData.searchId, ctrl.searchModel.currentPage)
                    .then((value) => {
                        ctrl.searchModel.allPages = value.data;
                        setRootScopeProperties(ctrl.searchModel.query, ctrl.searchModel.responseCount);
                    }, handleRejection);
            }
        }

        function getPaginationNumbering(index) {
            return (ctrl.searchModel.pageSize * ctrl.searchModel.currentPage) - (ctrl.searchModel.pageSize - index ) + 1;
        }

        function changeOrderBy(orderBy) {
            ctrl.searchModel.orderBy = orderBy;
        }

        function getPageDisplayTotal() {
            let totalOnCurrentPageViewing = ctrl.searchModel.pageSize * ctrl.searchModel.currentPage;
            if (ctrl.searchModel.responseCount < totalOnCurrentPageViewing) return ctrl.searchModel.responseCount;
            return totalOnCurrentPageViewing;
        }

        function getPageStartDisplay() {
            let totalOnCurrentPageViewing = ctrl.searchModel.pageSize * ctrl.searchModel.currentPage;
            return (totalOnCurrentPageViewing - ctrl.searchModel.pageSize) + 1;

        }

        function pageChangeHandler(number) {
            ctrl.searchModel.currentPage = number;
            return searchAndGetPages(ctrl.searchModel.query);
        }

        function setRootScopeProperties(searchQuery, searchCount) {
            $rootScope.search.query = searchQuery;
            $rootScope.search.count = searchCount;
            $rootScope.kaspersky.searchTotalResults = searchCount;
            $rootScope.kaspersky.searchQuery = searchQuery;
            if ($window.trackPageView) {
                $log.log($rootScope.kaspersky);
                $window.trackPageView($rootScope.kaspersky.pageName);  // search tracking requirement
            }
        }
    }

})();
