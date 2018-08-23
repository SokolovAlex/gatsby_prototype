(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .component('certificatesDetails', {
            'bindings': {
                'certInfo': '<'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/content-repository/components/certificates/templates/certificates-details.template.html'
        });
})();
