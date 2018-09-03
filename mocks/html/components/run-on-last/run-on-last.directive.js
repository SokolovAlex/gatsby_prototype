(function() {
    angular.module('kappGlobal.runOnLast', [])
        .directive('runOnLast', runOnLast);
    function runOnLast($log) {
        return {
            'link': function(scope, element, attrs) {
                if (scope.$last) {
                    try {
                        scope.$parent.$ctrl[attrs.runOnLast]();
                    } catch (e) {
                        $log.warn('\'' + attrs.runOnLast + '\'' + ' not a function.');
                    }
                }
            },
            'restrict': 'A'
        };
    }
})();
