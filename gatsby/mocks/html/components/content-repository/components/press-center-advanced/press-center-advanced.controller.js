(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .controller('pressCenterAdvancedController', pressCenterAdvancedController);
    function pressCenterAdvancedController(directiveData, contentRepoService, errorService) {
        let ctrl = this;
        ctrl.data = {};
        ctrl.$onInit = activate;

        function activate() {
            getData();
            getTranslations();
        }

        function getData() {
            return directiveData.getByUrl(ctrl.resource || 'press-center-advanced').then(response => {
                ctrl.data = response.data.fields;
                if (ctrl.template === 'horizontal-list') getRepoData();
            }, handleRejection);
        }

        function getRepoData() {
            return contentRepoService.search(1, 3, ctrl.repoType || 'smb', '', ctrl.repoCategory || '01::customers')
                .then(handleRepoData, handleRejection);
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        function handleRepoData(response) {
            if (response && response.data) ctrl.articleUrls = response.data.docs;
            if (ctrl.articleUrls.length) {
                ctrl.articles = [];
                _.forEach(ctrl.articleUrls, function(article) {
                    contentRepoService.getLinkMediaByPath(article.Url).then(function(response) {
                        ctrl.articles.unshift(response.data);
                    }, handleRejection);
                });
            }
        }

        function getTranslations() {
            return directiveData.getLocal('general-translations').then((response) => {
                ctrl.translations = response.data.fields;
            }, handleRejection);
        }

    }
})();
