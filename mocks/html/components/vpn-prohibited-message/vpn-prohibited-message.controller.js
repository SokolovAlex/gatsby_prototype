(function() {
    angular.module('kappGlobal.vpnProhibitedMessage')
        .controller('vpnProhibitedMessageController', vpnProhibitedMessageController);

    function vpnProhibitedMessageController($location, geoLocationManager, vpnProhibitedMessageService, errorService) {
        let ctrl = this;
        ctrl.message = '';
        ctrl.$onInit = activate;
        activate();
        function activate() {
            let url = $location.absUrl();
            ctrl.showMessage = geoLocationManager.showVpnProhibitedMessage(url);
            getProhibitedMessage();
        }

        function getProhibitedMessage() {
            return vpnProhibitedMessageService.getVpnProhibitedMessageResource().then(resource => {
                ctrl.message = resource.message;
            }, (rejection) => {
                errorService.warn(rejection);
            });
        }
    }
})();
