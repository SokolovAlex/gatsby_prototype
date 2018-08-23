(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .controller('pressCenterNavController', pressCenterNavController);
    function pressCenterNavController($window, $scope, directiveData, errorService) {
        let ctrl = this;
        ctrl.data = {};
        ctrl.$onInit = activate;
        ctrl.$onDestroy = destroyGlobalListeners;

        function activate() {
            getData();
        }

        function destroyGlobalListeners() {
            angular.element(window).off('scroll.pressCenterNavController');
        }

        function getData() {
            return directiveData.getByUrl('press-center-nav').then(response => {
                ctrl.data = response.data.fields;
                runScripts();
            }, (rejection) => {
                errorService.warn(rejection);
            });
        }

        function runScripts() {
            angular.element($window).on('scroll.pressCenterNavController', function() {
                if ($window.scrollY >= 447) {
                    ctrl.stickyNav = true;
                    angular.element('#page-header').css('margin-bottom', '73px');
                } else {
                    ctrl.stickyNav = false;
                    angular.element('#page-header').css('margin-bottom', '0px');
                }
                $scope.$apply();
            });
        }
    }
})();
