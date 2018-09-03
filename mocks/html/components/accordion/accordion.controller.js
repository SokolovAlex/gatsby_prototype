(function() {
    angular.module('kappGlobal.accordion')
        .controller('accordionController', accordionController);

    function accordionController(directiveData, $element, $timeout, errorService) {
        var ctrl = this;
        ctrl.$onInit = activate;

        function activate() {
            getData();
        }

        function getData() {
            directiveData.getByUrl(ctrl.resource || 'accordion').then((response) => {
                ctrl.data = response.data.fields;
            }, (rejection) => {
                errorService.warn(rejection);
            })
                .then(() => {
                    $timeout(() => {
                        $element.find('li > h4, .ent-accordion .accordion-section .accordion-title').click(function() {
                            $(this).parent().toggleClass('open');
                            $(this).siblings().slideToggle();
                        });
                    });

                });
        }
    }
})();
