(function() {
    'use strict';
    angular.module('kappGlobal.rss')
        .controller('rssFeedsDetailsController', rssFeedsDetailsController);

    function rssFeedsDetailsController(contentRepoService, errorService) {
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

        function getDetails() {
            let path = contentRepoService.getPathFromUrl();
            return contentRepoService.getLinkMediaByPath(path).then((response) => {
                ctrl.details = contentRepoService.populateLinkFields(response['data'], path);
            }, (rejection) => {
                errorService.warn(rejection);
            });
        }
    }

})();
