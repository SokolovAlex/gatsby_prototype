(function() {
    'use strict';
    angular.module('kappGlobal.awardsSection')
        .controller('awardsSectionController', awardsSectionController);

    function awardsSectionController($element, directiveData, errorService) {
        let ctrl = this;
        ctrl.$onInit = activate;

        function activate() {
            getData();
        }

        function getData() {
            return directiveData.getByUrl(ctrl.resource || 'awards-section').then(response => {
                ctrl.data = response.data.fields;
                prependComment(response.data.id);
            }, (rejection) => {
                errorService.warn(rejection);
            });
        }

        function prependComment(id) {
            let comment = `<!-- Start Component Presentation: {"ComponentID" : "${id}","ComponentTemplateID" : "tcm:246-294262-32"} -->`;
            $($element).prepend(comment);
        }
    }
})();
