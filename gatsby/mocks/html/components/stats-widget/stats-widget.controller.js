(function() {
    'use strict';
    angular.module('kappGlobal.statsWidget')
        .controller('statsWidgetController', statsWidgetController);

    function statsWidgetController(directiveData, errorService, ENV) {
        let ctrl = this;
        ctrl.$onInit = activate;
        ctrl.locale = ENV.locale;

        function activate() {
            getData();
        }

        function getData() {
            return directiveData.get('/site-general/stats-widget/stats-widget.json').then((response) => {
                ctrl.data = response.data.fields;
            }, (rejection) => {
                errorService.warn(rejection);
            });
        }

    }
})();
