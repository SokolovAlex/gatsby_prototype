(function() {
    'use strict';
    angular.module('kappGlobal.vpnProhibitedMessage')
        .factory('vpnProhibitedMessageService', vpnProhibitedMessageService);

    function vpnProhibitedMessageService($http, ENV) {
        let serverUrl = `${ENV.server}`;
        return {
            'getVpnProhibitedMessageResource': getVpnProhibitedMessageResource
        };
        function getVpnProhibitedMessageResource() {
            return $http.get(`${serverUrl}vpnmessage/`, {'cache': true});
        }
    }
})();
