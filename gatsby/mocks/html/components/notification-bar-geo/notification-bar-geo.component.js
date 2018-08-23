(function() {
    'use strict';
    angular.module('kappGlobal.notificationBarGeo')
        .component('notificationBarGeo', {
            'bindings': {
                'resource': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/notification-bar-geo/templates/notification-bar-geo.html',
            'controller': 'notificationBarGeoController'
        });
})();
