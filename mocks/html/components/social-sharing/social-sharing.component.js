(function() {
    'use strict';
    angular.module('kappGlobal.socialSharing')
        .component('socialSharing', {
            'templateUrl': '/apps/kapp/modules/_shared/components/social-sharing/template/social-sharing.html',
            'bindings': {
                'template': '@'
            },
            'controller': 'socialSharingController'
        });
})();
