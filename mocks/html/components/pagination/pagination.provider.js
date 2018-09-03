(function() {
    'use strict';
    angular.module('kappGlobal.paginationModule')
        .provider('paginationTemplate', paginationTemplateProvider);

    function paginationTemplateProvider() {
        var templatePath = 'apps/kapp/modules/_shared/components/pagination/templates/pagination-1.html';
        var templateString;
        return {
            'setPath': setPath,
            'setString': setString,
            '$get': $get
        };

        function setPath(path) {
            templatePath = path;
        }

        function setString(str) {
            templateString = str;
        }

        function $get() {
            return {
                'getPath': function() {
                    return templatePath;
                },
                'getString': function() {
                    return templateString;
                }
            };
        }
    }

})();
