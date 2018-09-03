(function() {
    'use strict';
    angular.module('kappGlobal.hmc')
        .component('hmcReviews', {
            'bindings': {
                'resource': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/hmc/templates/hmc-reviews.html',
            'controller': function($rootScope, $scope, directiveData, ENV, errorService) {
                let ctrl = this;
                ctrl.$onInit = activate;

                function activate() {
                    getData();
                }

                function getData() {
                    return directiveData.get(`/content/${ENV.locale}/hmc/hmc-reviews.json`).then((response) => {
                        ctrl.data = response.data.fields.Body;
                    }, (rejection) => {
                        errorService.warn(rejection);
                    });
                }
            }
        });
})();
