(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .component('smbRepoHeader', {
            'bindings': {
                'showFigure': '<',
                'contentName': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/content-repository/components/repo-header/templates/smb-repo-header.html',
            'controller': 'repoHeaderController'
        });
})();
