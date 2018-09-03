(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .controller('resourcesCategoryDetailsController', resourcesCategoryDetailsController);
    function resourcesCategoryDetailsController(contentRepoService, translationsHelperService, seoHelperService, windowHelperService, errorService) {
        let ctrl = this;
        ctrl.details = {};
        ctrl.updatedBody = '';
        ctrl.titleSummary = '';
        ctrl.path = '';
        ctrl.isVideoList = false;
        ctrl.showOriginalImage = true;
        ctrl.$onInit = activate;
        ctrl.getRepoTranslation = translationsHelperService.getRepoTranslation;

        function activate() {
            ctrl.repoType = ctrl.repoType || 'smb';
            getDetails();
            getRepoTranslations();
        }

        function getRepoTranslations() {
            translationsHelperService.getRepoTranslations().then(function(response) {
                ctrl.repoTranslations = response;
            }).catch(handleRejection);
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        function getDetails() {
            let path = contentRepoService.getPathFromUrl();
            ctrl.path = contentRepoService.getUserFriendlyUrl(path).replace(/-/g, ' ');
            return contentRepoService.getLinkMediaByPath(path).then((response) => {
                ctrl.details = contentRepoService.populateLinkFields(response['data'], path);
                seoHelperService.setMeta({'description': response.data.fields.metaDesc});
                windowHelperService.setWindowTitle(response.data.fields.metaTitle);

                let detailsBody = angular.element(ctrl.details.body);
                angular.forEach(detailsBody, function(value, index) {
                    if ((value.tagName === 'H1' || value.tagName === 'H2') && index === 0) {
                        ctrl.titleSummary = value.innerHTML;
                    }
                    else {
                        if (value.nodeType !== 3) {
                            ctrl.updatedBody += value.outerHTML + '\n';
                        }
                    }

                    if (value.innerHTML && value.innerHTML.match(/<img/)) {
                        ctrl.showOriginalImage = false;
                    }
                });

                ctrl.updatedBody = ctrl.updatedBody || ctrl.details.summary;
                ctrl.category = contentRepoService.getCategoryParams();
                if (ctrl.details.categoryName && ctrl.category !== ctrl.details.categoryName)
                    contentRepoService.setUrlToCorrectCategory(ctrl.details.categoryName);
            }, handleRejection);
        }
    }
})();
