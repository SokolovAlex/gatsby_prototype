(function() {
    'use strict';
    angular.module('kappGlobal.trustpilotReviews')
        .component('trustpilotReviews', {
            'bindings': {
                'resource': '@'
            },
            'templateUrl': '/apps/kapp/modules/_shared/components/trustpilot-reviews/templates/trustpilot-reviews.html',
            'controller': 'trustpilotReviewsController'
        });
})();
