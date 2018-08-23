(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .controller('articleSidebarController', articleSidebarController);

    function articleSidebarController($q, localStorageService, contentRepoService, directiveData, errorService) {
        let ctrl = this,
            cached = localStorageService.get(ctrl.cacheName);
        ctrl.resources = [];
        ctrl.currentPage = 1;
        ctrl.pageSize = 5;
        ctrl.getUserFriendlyUrl = contentRepoService.getUserFriendlyUrl;
        ctrl.$onInit = activate;

        function activate() {
            ctrl.repoType = ctrl.repoType || 'smb';
            ctrl.cacheName = `side-widget-${ctrl.repoType}-${ctrl.category}`;

            getTranslations();
            if (cached !== null) {
                ctrl.resources = cached;
                return;
            }
            getResourceListData();
        }

        function getResourceListData() {
            let repoType = ctrl.repoType === 'vsb' ? 'smb' : ctrl.repoType;
            return contentRepoService.search(1, 5, repoType, '', ctrl.category)
                .then(getSearchResources, handleRejection);
        }


        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        function getTranslations() {
            return directiveData.getLocal('general-translations').then((response) => {
                ctrl.translations = response.data.fields;
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
                localStorageService.set(ctrl.cacheName, ctrl.resources, 120);
            });
        }
    }
})();
