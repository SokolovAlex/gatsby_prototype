(function() {
    'use strict';
    angular.module('kappGlobal.hmc')
        .component('hmcPromo2up', {
            'bindings': {
                'resource': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/hmc/templates/hmc-promo-2up.html',
            'controller': function($rootScope, $scope, directiveData, ENV, errorService) {
                let ctrl = this;
                ctrl.$onInit = activate;

                function activate() {
                    getData();
                }

                function getData() {
                    return directiveData.get(`/content/${ENV.locale}/hmc/hmc-promo-2up.json`).then((response) => {
                        ctrl.data = response.data.fields.Body;
                    }, (rejection) => {
                        errorService.warn(rejection);
                    });
                }
            }
        });
})();
