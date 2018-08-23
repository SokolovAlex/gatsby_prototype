(function() {
    'use strict';
    angular.module('kappGlobal.lrcDisclaimers')
        .controller('lrcDisclaimersController', lrcDisclaimersController);

    function lrcDisclaimersController($location, $anchorScroll) {
        let ctrl = this;
        ctrl.$onInit = activate;
        $anchorScroll.yOffset = 100;

        function activate() {
            let id = $location.hash();
            $location.hash('disclaimer');
            $anchorScroll();
            $location.hash(id);
        }
    }
})();
