(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .component('resourcesGallery', {
            'templateUrl': '/apps/kapp/modules/_shared/components/content-repository/components/resources-gallery/templates/resources-gallery.html',
            'controller': 'resourcesGalleryController',
            'bindings': {
                'repoType': '@'
            }
        });
})();
