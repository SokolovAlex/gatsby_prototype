(function() {
    angular.module('kappGlobal.callbackForm')
        .component('callbackForm', {
            'bindings': {
                'resource': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/callback-form/templates/callback-form-button.html',
            'controller': 'callbackFormController'
        });
})();
