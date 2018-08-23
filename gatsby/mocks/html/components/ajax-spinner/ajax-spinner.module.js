angular.module('kappGlobal.ajaxSpinner', [])
    .directive('ajaxSpinner', ajaxSpinner);

function ajaxSpinner($http) {
    return {
        'restrict': 'ACE',
        'templateUrl': '/apps/kapp/modules/_shared/components/ajax-spinner/templates/ajax-spinner.html',
        'link': function(scope) {
            scope.isLoading = function() {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch(scope.isLoading, function(v) {
                if (v) {
                    $('#spinner').show();
                } else {
                    $('#spinner').hide();
                }
            });
        }
    };
}
