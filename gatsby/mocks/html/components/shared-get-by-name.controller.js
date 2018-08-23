(function() {
    angular.module('kappGlobal')
        .controller('sharedGetByNameController', sharedGetByNameController);

    function sharedGetByNameController(directiveData, $element, errorService) {
        let ctrl = this;
        ctrl.$onInit = activate;

        function activate() {
            getData();
        }

        function getData() {
            let elementName = ctrl.contentName || ctrl.resource || $element['context'].localName;
            return directiveData.getByUrl(elementName).then((response) => {
                ctrl.data = response.data.fields;
            }, (rejection) => {
                errorService.warn(rejection);
            });
        }
    }
})();
