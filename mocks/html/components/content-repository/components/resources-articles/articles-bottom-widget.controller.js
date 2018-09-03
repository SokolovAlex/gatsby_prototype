(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .controller('articlesBottomWidgetController', articlesBottomWidgetController);

    function articlesBottomWidgetController($q, localStorageService, contentRepoService, directiveData, translationsHelperService, errorService) {
        let ctrl = this;
        ctrl.resources = [];
        ctrl.currentPage = 1;
        ctrl.pageSize = 6;
        ctrl.getUserFriendlyUrl = getUserFriendlyUrl;
        ctrl.getStrippedString = getStrippedString;
        ctrl.$onInit = activate;

        let cacheName = `bottom-widget-${ctrl.repoType}`,
            cached = localStorageService.get(cacheName);

        function activate() {
            ctrl.repoType = ctrl.repoType || 'smb';
            if (cached !== null) {
                ctrl.resources = cached;
                return;
            }
            getResourceListData();
            getTranslations();
        }

        function getTranslations() {
            return directiveData.getLocal('general-translations').then((response) => {
                ctrl.translations = response.data.fields;
            }, handleRejection);
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        function getResourceListData() {
            contentRepoService.getCategories()
                .then((response) => {
                    let repoType = ctrl.repoType === 'vsb' ? 'smb' : ctrl.repoType,
                        dataCategory = response['data'][repoType],
                        categories = contentRepoService.getCategoriesFromObject(dataCategory).categoriesList;
                    categories.map((val) => {
                        return contentRepoService.search(1, 5, repoType, '', val)
                            .then(getSearchResources, handleRejection);
                    });
                }, handleRejection);
        }

        function getSearchResources(response) {
            let ajaxCalls = [],
                paths = [];

            response['data']['docs'].map((doc) => {
                let url = doc['Url'];
                ajaxCalls.push(contentRepoService.getLinkMediaByPath(url));
                paths.push(url);
            });

            $q.all(ajaxCalls).then((response) => {
                response.map((val, index) => {
                    ctrl.resources.unshift(contentRepoService.populateLinkFields(val.data, paths[index]));
                });

            }, handleRejection).finally(() => {
                _.forEach(ctrl.resources, function(obj) {
                    translationsHelperService.getCategoryTranslation(obj.categoryName).then(function(response) {
                        obj.translatedCategoryName = response;
                    }, handleRejection);
                });
                localStorageService.set(cacheName, ctrl.resources, 120);
            });
        }


        function getUserFriendlyUrl(item) {
            return contentRepoService.getUserFriendlyUrl(item.url);
        }

        function getStrippedString(str, length) {
            return contentRepoService.getStrippedString(str, length);
        }
    }

})();
