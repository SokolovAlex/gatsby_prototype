(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .component('resourcesItem', {
            'templateUrl': '/apps/kapp/modules/_shared/components/content-repository/components/resources-gallery/templates/resources-gallery-item.html',
            'controller': 'resourcesGalleryItemController',
            'bindings': {
                'categoryStrings': '@',
                'repoType': '@'
            }
        });
})();
