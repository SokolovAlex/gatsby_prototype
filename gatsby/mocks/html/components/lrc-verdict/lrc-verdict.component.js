(function() {
    'use strict';
    angular.module('kappGlobal.lrcVerdictPage')
        .component('lrcVerdictPage', {
            'bindings': {
                'verdict': '@',
                'verdictData': '<',
                //loc variable sending requests to en-ca depending on query parameter
                'loc': '<'
            },
            'template': `<ng-include src="'/apps/kapp/pages/lrc/'+$ctrl.template+'.template.html'">`,
            'controller': 'lrcVerdictPageController'
        });
})();
