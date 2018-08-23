(function() {
    'use strict';
    angular.module('kappGlobal.paginationModule')
        .factory('paginationService', paginationService);

    function paginationService() {
        var instances = {},
            lastRegisteredInstance;
        return {
            'registerInstance': registerInstance,
            'deregisterInstance': deregisterInstance,
            'isRegistered': isRegistered,
            'getLastInstanceId': getLastInstanceId,
            'setCurrentPageParser': setCurrentPageParser,
            'setCurrentPage': setCurrentPage,
            'getCurrentPage': getCurrentPage,
            'setItemsPerPage': setItemsPerPage,
            'getItemsPerPage': getItemsPerPage,
            'setCollectionLength': setCollectionLength,
            'getCollectionLength': getCollectionLength,
            'setAsyncModeTrue': setAsyncModeTrue,
            'setAsyncModeFalse': setAsyncModeFalse,
            'isAsyncMode': isAsyncMode
        };

        function registerInstance(instanceId) {
            if (angular.isUndefined(instances[instanceId])) {
                instances[instanceId] = {
                    'asyncMode': false
                };
                lastRegisteredInstance = instanceId;
            }
        }

        function deregisterInstance(instanceId) {
            delete instances[instanceId];
        }

        function isRegistered(instanceId) {
            return (angular.isDefined(instances[instanceId]));
        }

        function getLastInstanceId() {
            return lastRegisteredInstance;
        }

        function setCurrentPageParser(instanceId, val, scope) {
            instances[instanceId].currentPageParser = val;
            instances[instanceId].context = scope;
        }

        function setCurrentPage(instanceId, val) {
            instances[instanceId].currentPageParser.assign(instances[instanceId].context, val);
        }

        function getCurrentPage(instanceId) {
            var parser = instances[instanceId].currentPageParser;
            return parser ? parser(instances[instanceId].context) : 1;
        }

        function setItemsPerPage(instanceId, val) {
            instances[instanceId].itemsPerPage = val;
        }

        function getItemsPerPage(instanceId) {
            return instances[instanceId].itemsPerPage;
        }

        function setCollectionLength(instanceId, val) {
            instances[instanceId].collectionLength = val;
        }

        function getCollectionLength(instanceId) {
            return instances[instanceId].collectionLength;
        }

        function setAsyncModeTrue(instanceId) {
            instances[instanceId].asyncMode = true;
        }

        function setAsyncModeFalse(instanceId) {
            instances[instanceId].asyncMode = false;
        }

        function isAsyncMode(instanceId) {
            return instances[instanceId].asyncMode;
        }
    }
})();
