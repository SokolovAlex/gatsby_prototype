(function() {
    angular.module('kappGlobal.resourceDocuments')
        .component('b2bResourceDocuments', {
            'bindings': {
                'resource': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/resource-documents/templates/resource-documents.html',
            'controller': 'b2bResourceDocumentsController'
        });
})();
