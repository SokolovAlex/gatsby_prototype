(function() {
    'use strict';

    angular.module('kappGlobal.gdprReady', [])
        .component('gdprReady', {
            'bindings': {
                'gdprImg': '@'
            },
            'controller': () => {
            },
            'template': '<div class="gdpr-ready" ng-if="$ctrl.gdprImg"><img class="gdpr-logo" ng-src="{{::$ctrl.gdprImg | addLocalRoot}}"/></div>'
        });
})();
