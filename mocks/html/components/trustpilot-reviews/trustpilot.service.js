(function() {
    angular.module('kappGlobal.trustpilotReviews')
        .factory('trustpilotReviewsService', trustpilotReviewsFactory);
    function trustpilotReviewsFactory($http, errorService) {
        return {
            'getCustomerReviews': getCustomerReviews
        };

        function getCustomerReviews(starsFilter, reviewsNum, tagFilter) {
            return $http.jsonp(`https://api.trustpilot.com/v1/business-units/49bd50700000640005042760/reviews?apikey=whUgvv6UJzvK6a1z2M8pK279osL7EdUl&stars=${starsFilter}&perPage=${reviewsNum}&tagValue=${tagFilter}`, {'jsonpCallbackParam': 'callback'}).then(response => {
                return response;
            }, (rejection) => {
                errorService.warn(rejection);
            });
        }
    }
})();
