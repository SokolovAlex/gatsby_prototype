(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .controller('pressArticlesBottombarController', pressArticlesBottombarController);

    function pressArticlesBottombarController($state, contentRepoService, directiveData, errorService, ENV) {
        let ctrl = this;
        ctrl.resources = [];
        ctrl.getUserFriendlyUrl = getUserFriendlyUrl;
        ctrl.$onInit = activate;
        ctrl.$onChanges = handleChanges;


        ctrl.isJPPressReleasesDetailsPage = $state.current.name === 'press-releases.details' && ENV.locale === 'ja-jp';

        function activate() {
            ctrl.usePressDetailTemplate = false;
            getTranslations();
        }

        function handleChanges(changesObj) {
            if (changesObj['relatedArticleCategory'].currentValue !== changesObj['relatedArticleCategory'].previousValue) {
                getResourceListData();
            }
        }

        function getResourceListData() {
            return contentRepoService.search(1, 5, 'pr', '', '', ctrl.relatedArticleCategory)
                .then((response) => {
                    response['data']['docs'].map((doc) => {
                        getLinkMediaByPath(doc['Url']);
                    });
                }, handleRejection);
        }

        function getTranslations() {
            directiveData.getLocal('general-translations').then((response) => {
                ctrl.translations = response.data.fields;
            }, handleRejection);
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        function getLinkMediaByPath(link) {
            return contentRepoService.getLinkMediaByPath(link)
                .then((response) => {
                    ctrl.resources.unshift(contentRepoService.populateLinkFields(response.data, link));
                }, handleRejection);
        }

        function getUserFriendlyUrl(item) {
            return contentRepoService.getUserFriendlyUrl(item.url);
        }
    }

})();
