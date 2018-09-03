(function() {
    'use strict';
    angular.module('kappGlobal.notificationBarGeo')
        .factory('notificationBarGeoService', notificationBarGeoService);

    function notificationBarGeoService($http, ENV) {
        const config = {
            'serverUrl': ENV.apiServer,
            'apiUrl': `${ENV.apiServer}/_svc/page/ipinfo`
        };

        return {
            'getRegionByCode': getRegionByCode,
            'getXMLRules': getXMLRules
        };

        function getRegionByCode(code, regions) {
            let regionObj = _.find(regions, function(obj) {

                return obj.locales.indexOf(code) > -1;
            });
            if (regionObj && 'name' in regionObj) return regionObj;
        }

        function getXMLRules(path) {
            return $http.get(`${config.apiUrl}?url=${path}`, {'cache': true});
        }

    }
})();
