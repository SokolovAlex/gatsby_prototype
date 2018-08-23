(function() {
    'use strict';
    angular.module('kappGlobal.rss')
        .controller('rssFeedsController', rssFeedsController);
    function rssFeedsController(contentRepoService, errorService) {
        let ctrl = this,
            filterSelectorDefault = 'Sort by',
            filterSelectorDate = 'Date';
        ctrl.resources = [];
        ctrl.filterSelections = [filterSelectorDefault, filterSelectorDate];
        ctrl.resourcesTotalCount = 0;
        ctrl.currentPage = 1;
        ctrl.pageSize = 10;
        ctrl.changeFilter = changeFilter;
        ctrl.getUserFriendlyUrl = getUserFriendlyUrl;
        ctrl.pageChangeHandler = pageChangeHandler;
        ctrl.$onInit = activate;

        function activate() {
            getResourceListData();
            getFilterSelections();
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        function changeFilter(selection) {
            ctrl.currentPage = 1;
            selection = selection === filterSelectorDefault ||
            selection === filterSelectorDate ? '' : selection;
            return getResourceListData('', '', selection);
        }

        function getResourceListData(contentType = '', category = '', subCat = '') {
            return contentRepoService.search(ctrl.currentPage, ctrl.pageSize, 'pr', contentType, category, subCat)
                .then((response) => {
                    let responseData = response['data'];
                    ctrl.resourcesTotalCount = responseData['count'];
                    responseData['docs'].map((doc) => {
                        getLinkMediaByPath(doc['Url']);
                    });
                }, handleRejection);
        }

        function pageChangeHandler(pageNumber) {
            ctrl.currentPage = pageNumber;
            let selector = ctrl.selector === filterSelectorDefault ? '' : ctrl.selector;
            return getResourceListData('', '', selector);
        }

        function getLinkMediaByPath(link) {
            ctrl.resources = [];
            return contentRepoService.getLinkMediaByPath(link)
                .then((response) => {
                    ctrl.resources.push(contentRepoService.populateLinkFields(response.data, link));
                }, handleRejection);
        }

        function getUserFriendlyUrl(item) {
            return contentRepoService.getUserFriendlyUrl(item.url);
        }

        function getFilterSelections() {
            return contentRepoService.getCategories().then((response) => {
                let pr = response['data']['pr'];
                ctrl.filterSelections = contentRepoService.getCategoriesFromObject(pr, ctrl.filterSelections).categoriesList;
                ctrl.selector = ctrl.filterSelections[0];
            }, handleRejection);
        }
    }
})();
