(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .controller('sharedPressDetailsController', sharedPressDetailsController);

    function sharedPressDetailsController(contentRepoService, windowHelperService, seoHelperService, errorService, stripHtmlTagsFilter) {
        let ctrl = this;
        ctrl.details = {};
        ctrl.getTrustAsHtml = getTrustAsHtml;
        ctrl.$onInit = activate;

        function activate() {
            getDetails();
        }

        function getTrustAsHtml() {
            return contentRepoService.getTrustAsHtml(ctrl.details.body);
        }

        function getDescriptionMetaValue(text) {
            if (text.length > 300) {
                text = text.substring(0, 300);
                return `${stripHtmlTagsFilter(text)}...`;
            } else return text;
        }

        function getDetails() {
            let path = contentRepoService.getPathFromUrl();
            return contentRepoService.getLinkMediaByPath(path).then((response) => {
                ctrl.details = contentRepoService.populateLinkFields(response['data'], path);
                seoHelperService.setMeta({'description': response.data.fields.metaDesc || response.data.fields.summary || getDescriptionMetaValue(response.data.fields.body)});
                windowHelperService.setWindowTitle(response.data.fields.metaTitle || response.data.fields.title);
            }, (rejection) => {
                errorService.warn(rejection);
            });
        }
    }
})();
