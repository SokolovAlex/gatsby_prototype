(function() {
    'use strict';
    angular.module('kappGlobal.siteTop')
        .controller('siteTopController', siteTopController);

    function siteTopController($element, $rootScope, $state, $timeout, directiveData, errorService) {
        let ctrl = this;
        ctrl.getActiveItem = getActiveItem;
        ctrl.$onInit = activate;

        function activate() {
            return directiveData.getLocal('sitetop/sitetop').then((response) => {
                ctrl.data = response.data.fields;
                prependComment(response.data.id);
            }, (rejection) => {
                errorService.warn(rejection);
            });
        }

        function prependComment(id) {
            $timeout(() => {
                let comment = `<!-- Start Component Presentation: {"ComponentID" : "${id}","ComponentTemplateID" : "tcm:246-294262-32"} -->`;
                $($element).prepend(comment);
            });
        }

        function getActiveItem(link) {
            if (!$rootScope.pageDataReady) {
                let pageDataReady = $rootScope.$on('pageDataReady', () => {
                    ctrl.breadcrumbs = $rootScope.breadcrumbs;
                    pageDataReady();
                });
            } else {
                ctrl.breadcrumbs = $rootScope.breadcrumbs;
            }

            if (ctrl.breadcrumbs) {
                return ctrl.breadcrumbs && ctrl.breadcrumbs[1] && ctrl.breadcrumbs[1].link === link || $state.current.url === link;
            }
        }
    }
})();
