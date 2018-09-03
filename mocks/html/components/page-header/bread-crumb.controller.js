(function() {
    'use strict';
    angular.module('kappGlobal.pageHeader')
        .controller('breadcrumbController', breadcrumbController);

    function breadcrumbController($rootScope) {
        let ctrl = this;
        ctrl.breadcrumbs = $rootScope.breadcrumbs;

        let pageDataReady = $rootScope.$on('pageDataReady', () => {
            ctrl.breadcrumbs = $rootScope.breadcrumbs;
            pageDataReady();
        });
    }
})();
