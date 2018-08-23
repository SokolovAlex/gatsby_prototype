(function() {
    'use strict';
    angular.module('kappGlobal.cookiesRequirement')
        .factory('cookiesRequirementService', cookiesRequirementService);

    function cookiesRequirementService($q, sessionStorageService, errorService, directiveData) {
        return {
            'getContent': getContent
        };

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        function getContent() {
            let cachedData = sessionStorageService.get('local[general-translations]'), deferred = $q.defer();

            if (cachedData) {
                deferred.resolve(cachedData);
                return deferred.promise.then((cachedData) => {
                    return cachedData.fields;
                }, function(error) {
                    return deferred.reject(error);
                });
            }

            return directiveData.getLocal('general-translations').then((response) => {
                return response.data.fields;
            }, handleRejection);
        }
    }
})();
