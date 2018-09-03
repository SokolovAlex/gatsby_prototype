(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .component('repoHeader', {
            'bindings': {
                'showFigure': '<',
                'contentName': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/content-repository/components/repo-header/templates/repo-header.html',
            'controller': 'repoHeaderController'
        });
})();
