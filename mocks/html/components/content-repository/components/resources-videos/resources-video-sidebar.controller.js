(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .controller('resourcesVideoSideBarController', resourcesVideoSideBarController);

    function resourcesVideoSideBarController(contentRepoService, errorService) {
        let ctrl = this;
        ctrl.videos = [];
        ctrl.$onInit = activate;
        ctrl.getUserFriendlyUrl = getUserFriendlyUrl;

        function activate() {
            getMoreVideos();
        }

        function getMoreVideos() {
            return contentRepoService.search(1, 1000, 'smb', 'Repository Video')
                .then((response) => {
                    response['data']['docs'].map((doc) => {
                        getLinkMediaByPath(doc['Url']);
                    });
                }, handleRejection);
        }

        function getLinkMediaByPath(link) {
            return contentRepoService.getLinkMediaByPath(link)
                .then((response) => {
                    ctrl.videos.unshift(contentRepoService.populateLinkFields(response.data, link));
                }, handleRejection);
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        function getUserFriendlyUrl(item) {
            return contentRepoService.getUserFriendlyUrl(item.url);
        }

    }

})();
