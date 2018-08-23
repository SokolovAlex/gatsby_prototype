(function() {
    'use strict';

    angular.module('kappGlobal.newsLetterPopup')
        .factory('newsLetterConfigService', newsLetterConfigService);

    function newsLetterConfigService(ENV, $http, $q, $window, sessionStorageService) {
        const storageKey = 'newsletter-config';

        const service = {
            'getGlobalConfig': () => {
                const cachedConfig = sessionStorageService.get(storageKey);

                if (cachedConfig) {
                    return $q.resolve(cachedConfig);
                }

                return $http.get(`/content/${ENV.locale}/site-general/newsletter-config.json`, {'cache': true})
                    .then(response => {
                        sessionStorageService.set(storageKey, response.data.fields);
                        return response.data.fields;
                    })
                    .catch(() => {
                        // no global config provided
                        // the newsletter popup is disabled on the whole app
                        return undefined;
                    });
            },
            'getConfigPathForCurrentPage': () => {
                return service.getGlobalConfig()
                    .then(config => {
                        if (!config || !config.pathsToConfigMapping) {
                            return;
                        }

                        // _.find is for IE compatibility
                        const pathToConfigMapping = _.find(config.pathsToConfigMapping, d => {
                            return $window.location.href.match(d.key) !== null;
                        });

                        return pathToConfigMapping ? pathToConfigMapping.value : undefined;
                    });
            },
            'getConfigForCurrentPage': () => {
                return service.getConfigPathForCurrentPage()
                    .then(configPath =>
                        configPath
                            ? $http.get(configPath, {'cache': true})
                                .then(config => config.data.fields)
                                // resolve even when the config is not there
                                .catch(() => undefined)
                            : undefined
                    );
            }
        };

        return service;
    }
})();
