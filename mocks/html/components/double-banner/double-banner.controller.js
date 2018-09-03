(function() {
    'use strict';
    angular.module('kappGlobal.doubleBanner')
        .controller('doubleBannerController', doubleBannerController);

    function doubleBannerController(directiveData, $element, $rootScope, errorService) {
        let ctrl = this,
            ngRender = $rootScope.$on('ngRender', runScripts);
        ctrl.$onInit = activate;

        function activate() {
            getData();
        }

        function getData() {
            return directiveData.getByUrl(ctrl.resource || 'double-banner').then(response => {
                ctrl.data = response.data.fields;
            }, handleRejection);
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        function runScripts() {
            var redHeight = $('.quick-menu .red-item').outerWidth(true);
            $element.find('.narrow-link a').css({'width': redHeight + 'px'});
            ngRender();
        }
    }
})();
