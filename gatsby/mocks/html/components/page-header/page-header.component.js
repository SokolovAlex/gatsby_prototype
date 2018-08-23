(function() {
    'use strict';
    angular.module('kappGlobal.pageHeader')
        .component('pageHeader', {
            'bindings': {
                'resource': '@',
                'headerType': '@',
                'bannerImage': '@',
                'showBreadcrumb': '@',
                'noPadding': '@',
                'product': '<'
            },
            'controller': 'pageHeaderController',
            'templateUrl': ['$element', '$attrs', function($element, $attrs) {
                let template = 'default';
                if ($attrs.template) template = $attrs.template;
                return `/apps/kapp/modules/_shared/components/page-header/templates/page-header-${template}.html`;
            }]
        })
        .component('breadcrumb', {
            'bindings': {},
            'template': `<p class="breadcrumbs">
					       <a ng-href="{{state.link}}" ng-repeat="state in $ctrl.breadcrumbs" ng-class="{'unclickable': $last}">{{state.title}}</a>
				        </p>`,
            'controller': 'breadcrumbController'
        });
})();
