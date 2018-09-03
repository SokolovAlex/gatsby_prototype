(function() {
    'use strict';
    angular.module('kappGlobal.callbackForm')
        .controller('callbackFormController', callbackFormController);

    function callbackFormController(directiveData, $scope, errorService, ENV, ngDialog, $http, $timeout, $document) {
        let ctrl = this;
        ctrl.env = ENV.locale;
        ctrl.$onInit = activate;
        ctrl.requestCallbackForm = requestCallbackForm;
        ctrl.setCallbackBtnWidth = {};
        ctrl.callbackIsEnabled = false;

        function activate() {
            getData();
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        function getData() {
            return directiveData.getByUrl('page-header').then(response => {
                ctrl.data = response.data.fields;
                ctrl.callbackIsEnabled = ctrl.data.enableCallbackWidget && ctrl.data.enableCallbackWidget[0] === 'true';

                if (ctrl.callbackIsEnabled) {
                    return $http.get(`/content/${ctrl.env}/site-header/callback-widget.json`, {'cache': true}).then(response => {
                        ctrl.callbackPopup = response.data.fields;

                        $timeout(() => {
                            ctrl.setCallbackBtnWidth = {
                                'width': $document.find('#callback-button').outerWidth(true) + 1
                            };
                        });
                    }).catch(handleRejection);
                }
            }).catch(handleRejection);
        }

        function requestCallbackForm(munchkinId, formId) {
            ngDialog.open({
                'template': '/resources/template/html/modules/_shared/components/callback-form/templates/callback-form.html',
                'className': 'ngdialog-flyout ngdialog-callback-form',
                'data': ctrl,
                'showClose': false,
                'controller': ['marketoHelperService', function(marketoHelperService) {
                    marketoHelperService.loadMarketo(munchkinId, formId, $scope);
                }]
            });
        }
    }
})();
