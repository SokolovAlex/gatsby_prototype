(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .controller('repoHeaderController', repoHeaderController);

    function repoHeaderController(localStorageService, contentRepoService, $element, errorService) {
        let ctrl = this;
        ctrl.contentName = ctrl.contentName || $element['context'].localName;
        let pressHeaderCacheName = `${ctrl.contentName}-cache-name`;
        ctrl.headerData = {};
        ctrl.$onInit = activate;

        function activate() {
            ctrl.headerData = getHeaderDataFromCache();
            if (ctrl.headerData === null) {
                getHeaderByName(ctrl.contentName);
            }
        }

        function getHeaderDataFromCache() {
            return localStorageService.get(pressHeaderCacheName);
        }

        function getHeaderByName(headerName) {
            return contentRepoService.getHeaderByName(headerName)
                .then((response) => {
                    ctrl.headerData = contentRepoService.populateRepositoryHeaderFields(response.data);
                    localStorageService.set(pressHeaderCacheName, ctrl.headerData);
                }, (rejection) => {
                    errorService.warn(rejection);
                });
        }
    }
})();
