(function() {
    'use strict';
    angular.module('kappGlobal.customHtml')
        .controller('customHtmlController', customHtmlController);

    function customHtmlController(directiveData, ENV, errorService, $timeout, $element) {
        let ctrl = this;
        ctrl.data = {};
        ctrl.env = ENV.locale;
        ctrl.$onInit = activate;

        function activate() {
            getData();
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        function getData() {
            if (ctrl.resource && ctrl.resource.match(/\//)) {
                ctrl.resource = ctrl.resource.replace(/cur-locale/, ctrl.env);
                return directiveData.get(ctrl.resource).then(response => {
                    ctrl.data = response.data.fields;
                }, handleRejection);
            } else {
                return directiveData.getByUrl(ctrl.resource || 'custom-html').then((response) => {
                    ctrl.data = response.data.fields;
                    $timeout(() => {
                        $element.find('.accordion-section > li > h4, .ent-accordion .accordion-section .accordion-title').click(function() {
                            $(this).parent().toggleClass('open');
                            $(this).siblings().slideToggle();
                        });
                    });
                }, handleRejection);
            }
        }

    }
})();
