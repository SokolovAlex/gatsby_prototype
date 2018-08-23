(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .controller('resourcesCategoryVideoController', resourcesCategoryVideoController);
    function resourcesCategoryVideoController(contentRepoService, errorService) {
        let ctrl = this;
        ctrl.resources = [];
        ctrl.currentPage = 1;
        ctrl.pageSize = 10;
        ctrl.contentType = 'Repository Video';
        ctrl.$onInit = activate;

        function activate() {
            ctrl.category = '';
            getMoreVideos();
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        function getMoreVideos() {
            return contentRepoService.search(1, 1000, 'smb', ctrl.contentType)
                .then((response) => {
                    response['data']['docs'].map((doc) => {
                        getLinkMediaByPath(doc['Url']);
                    }, handleRejection);
                }, handleRejection);
        }

        function getLinkMediaByPath(link) {
            return contentRepoService.getLinkMediaByPath(link)
                .then((response) => {
                    ctrl.resources.unshift(contentRepoService.populateLinkFields(response.data, link));
                }, handleRejection);
        }
    }

})();
