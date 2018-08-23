(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .component('smbRepoAllArticlesHeader', {
            'bindings': {
                'showFigure': '<',
                'contentName': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/content-repository/components/repo-header/templates/smb-repo-all-articles-header.html',
            'controller': 'repoHeaderController'
        });
})();
