(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .controller('sharedPressController', sharedPressController);

    function sharedPressController($q, $state, contentRepoService, directiveData, stringHelper, errorService, ENV) {
        let ctrl = this,
            currentPage, currentSelection;
        ctrl.resources = [];
        ctrl.resourcess = {};
        ctrl.prData = {};
        ctrl.filterSelections = [];
        ctrl.resourcesTotalCount = 0;
        ctrl.currentPage = 1;
        ctrl.pageSize = ctrl.pageSize || 10;
        ctrl.selector = '';
        ctrl.changeFilter = changeFilter;
        ctrl.getUserFriendlyUrl = getUserFriendlyUrl;
        ctrl.getSubCat = getSubCat;
        ctrl.pageChangeHandler = pageChangeHandler;
        ctrl.$onInit = activate;
        ctrl.locale = ENV.locale;

        let isJPHomepage = $state.current.name === 'homepage' && ctrl.locale === 'ja-jp';

        function activate() {
            let isRu = ENV.locale === 'ru-ru';
            ctrl.currentPage = contentRepoService.getPageNumberFromUrl();
            return getTranslation()
                .then(function() {
                    ctrl.selector = stringHelper.replaceDmToSpam(stringHelper.toTitleCase(contentRepoService.getSelectorFromUrl(), isRu));
                    if (isJPHomepage) return getHomepageData();
                    getResourceList(ctrl.currentPage, ctrl.selector);
                    getFilterSelections();
                })
                .catch(handleRejection);
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        function getTranslation() {
            return directiveData.getLocal('general-translations')
                .then((response) => {
                    ctrl.prData = response.data.fields;
                    let filterSelectorDefault = ctrl.prData.prSortBy || 'Sort by',
                        filterSelectorDate = ctrl.prData.prDate || 'Date';
                    ctrl.filterDefaultSelections = ctrl.locale === 'ja-jp' ? [filterSelectorDefault] : [filterSelectorDefault, filterSelectorDate];
                })
                .catch(handleRejection);
        }

        function getHomepageData() {
            return directiveData.getByUrl(ctrl.resource || 'press-releases').then(response => {
                ctrl.categories = response.data.fields.categories;
                getResourceListHp(ctrl.categories);
            }).catch(handleRejection);
        }

        function changeFilter(selection) {
            return getResourceList(1, selection);
        }

        function getResourceListHp(cats) {
            cats.map((item) => {
                ctrl.pageSize = item.numberItems;
                getResourceList(1, item.category).then((response) => {
                    item['prs'] = response;
                });
            });
        }

        function getResourceList(pageNumber, selection) {
            let targetSelection = checkDefaultSelector(selection);
            let targetPage = pageNumber;

            ctrl.currentPage = targetPage;

            if (targetSelection !== currentSelection || targetPage !== currentPage) {
                currentSelection = targetSelection;
                currentPage = targetPage;
                return getResourceListData('', '', currentSelection);
            }
        }

        function getResourceListData(contentType = '', category = '', subCat = '') {
            if (!isJPHomepage) {
                contentRepoService.setPaginationUrlValue(ctrl.currentPage);
                contentRepoService.setSelectorUrlValue(formatSelectorForUrl(ctrl.selector));
            }
            return contentRepoService.search(ctrl.currentPage, ctrl.pageSize, 'pr', contentType, category, subCat)
                .then((response) => {
                    let responseData = response['data'];
                    ctrl.resourcesTotalCount = responseData['count'];
                    return $q.all(responseData['docs'].map((doc) => getLinkMediaByPath(doc['Url'])));
                })
                .then((resources) => {
                    ctrl.resources = _.without(resources, undefined);
                    return ctrl.resources;
                })
                .catch(handleRejection);
        }

        function checkDefaultSelector(selection) {
            if (ctrl.filterDefaultSelections.indexOf(selection) !== -1) selection = '';
            return selection;
        }

        function pageChangeHandler(pageNumber) {
            getResourceList(pageNumber, ctrl.selector);
        }

        function getLinkMediaByPath(link) {
            return contentRepoService.getLinkMediaByPath(link)
                .then((response) => contentRepoService.populateLinkFields(response.data, link))
                .catch(handleRejection);
        }

        function getUserFriendlyUrl(item) {
            return contentRepoService.getUserFriendlyUrl(item.url);
        }

        function getFilterSelections() {
            return contentRepoService.getCategories()
                .then((response) => {
                    let pr = response['data']['pr'];
                    ctrl.filterSelections = contentRepoService.getCategoriesFromObject(pr, ctrl.filterSelections, 'pr').categoriesList;
                    ctrl.selector = ctrl.selector || ctrl.filterDefaultSelections[1] || ctrl.filterDefaultSelections[0];
                })
                .catch(handleRejection);
        }

        function formatSelectorForUrl(value) {
            if (!value) return '';
            value = value.replace(/-/g, '-_');
            return stringHelper.replaceSpamText(value.replace(/\s+/g, '-'));
        }

        function getSubCat(value) {
            return contentRepoService.buildSubCategoryName(value);
        }
    }
})();
