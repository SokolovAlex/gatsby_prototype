(function() {
    'use strict';
    angular.module('kappGlobal.siteHeader')
        .component('siteHeaderScrollNav', {
            'bindings': {
                'items': '<'
            },
            'template': `
				<li ng-repeat="item in $ctrl.items">
				    <a ng-click="$ctrl.animatedScrollTo(item.id, $event)" ng-href="#{{item.id}}">{{item.title}}</a>
				</li>
            `,
            'controller': 'siteHeaderScrollNavController'
        });
})();
