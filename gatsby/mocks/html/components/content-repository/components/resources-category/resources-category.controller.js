(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .controller('resourcesCategoryController', resourceCategoryController);

    function resourceCategoryController($q, contentRepoService, directiveData, appHelperService, errorService, $element, $timeout) {
        let ctrl = this;
        ctrl.resources = [];
        ctrl.categories = [];
        ctrl.currentPage = 1;
        ctrl.pageSize = 10;
        ctrl.selectorModel = '';
        ctrl.hasResources = true;
        ctrl.getUserFriendlyUrl = getUserFriendlyUrl;
        ctrl.changeSelector = changeSelector;
        ctrl.pageChangeHandler = pageChangeHandler;
        ctrl.$onInit = activate;
        ctrl.defaultYears = contentRepoService.getDefaultYears();
        ctrl.locale = appHelperService.getLocale();

        function activate() {
            ctrl.category = ctrl.category || contentRepoService.getCategoryParams();
            ctrl.repoType = ctrl.repoType || 'smb';
            ctrl.currentPage = contentRepoService.getPageNumberFromUrl();
            ctrl.selectorModel = formatSelectorForApp(contentRepoService.getSelectorFromUrl());
            ctrl.startDate = formatSelectorForApp(contentRepoService.getDateFromUrl());
            if (ctrl.repoType !== 'about') setParams(ctrl.currentPage, ctrl.selectorModel, ctrl.startDate);
            getCategories();
            getResourceListData();
            getTranslations();
            setAttribute();
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        function getTranslations() {
            return directiveData.getLocal('general-translations').then((response) => {
                ctrl.translations = response.data.fields;
            }, handleRejection);
        }

        function changeSelector(selector) {
            let urlSelectorParam = formatSelectorForApp(contentRepoService.getSelectorFromUrl());

            if (urlSelectorParam === selector) {
                ctrl.selectorModel = '';
            } else if (selector) {
                ctrl.selectorModel = formatSelectorForApp(selector);
            }

            ctrl.currentPage = 1;
            setParams(ctrl.currentPage, ctrl.selectorModel, ctrl.startDate);

            return getResourceListData();
        }

        function getResourceListData() {
            let repoType = ctrl.repoType === 'vsb' ? 'smb' : ctrl.repoType;
            return contentRepoService.search(ctrl.currentPage, ctrl.pageSize, repoType, '', ctrl.category, ctrl.selectorModel, ctrl.startDate)
                .then((response) => {
                    let responseData = response['data'];
                    ctrl.resourcesTotalCount = responseData['count'];
                    ctrl.resources = [];
                    let mediaByPathAjaxCalls = [],
                        urls = [];
                    responseData['docs'].map((doc) => {
                        let url = doc['Url'];
                        mediaByPathAjaxCalls.unshift(contentRepoService.getLinkMediaByPath(url));
                        urls.unshift(url);
                    });

                    $q.all(mediaByPathAjaxCalls)
                        .then((responses) => {
                            responses.map((response, index) => {
                                let fields = contentRepoService.populateLinkFields(response.data, urls[index]);
                                ctrl.resources.unshift(fields);
                            });
                        }, handleRejection)
                        .finally(() => {
                            ctrl.hasResources = ctrl.resources.length > 0;
                        });
                }, handleRejection);
        }

        function getCategories() {
            return contentRepoService.getCategories().then((response) => {
                let repoType = ctrl.repoType === 'vsb' ? 'smb' : ctrl.repoType,
                    category = response['data'][repoType];
                ctrl.categoriesList = contentRepoService.getCategoriesFromObject(category, ctrl.filterSelections);
                ctrl.categories = ctrl.categoriesList.categoriesWithSubCat[ctrl.category];
            }, handleRejection);
        }

        function getUserFriendlyUrl(item) {
            return contentRepoService.getUserFriendlyUrl(item.url);
        }

        function pageChangeHandler(number) {
            ctrl.currentPage = number;
            contentRepoService.setPaginationUrlValue(ctrl.currentPage);
            return getResourceListData();
        }

        function formatSelectorForUrl(value) {
            return value.replace(/\s+/g, '-');
        }

        function formatSelectorForApp(value) {
            return value ? value.replace(/-/g, ' ') : '';
        }

        function setParams(pageNumber, selector, startDate) {
            contentRepoService.setPaginationUrlValue(pageNumber);
            contentRepoService.setSelectorUrlValue(formatSelectorForUrl(selector));
            contentRepoService.setDateUrlValue(formatSelectorForUrl(startDate));
        }

        function setAttribute() {
            $timeout(() => {
                let list = $($element).find('.articles-list li .icon-doc');
                list.each(function(i, elem) {
                    if ($(elem).hasClass('icon-pdf')) {
                        $(elem).attr('download', true);
                    }
                });
            }, 5000);
        }
    }
})();
