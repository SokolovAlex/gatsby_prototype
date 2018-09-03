(function() {
    'use strict';
    angular.module('kappGlobal.bazaarVoice')
        .controller('bazaarVoiceSubmitController', bazaarVoiceSubmitController);

    function bazaarVoiceSubmitController(ENV, angularLoad, $rootScope, errorService) {
        let ctrl = this;
        ctrl.$onInit = activate;
        ctrl.locale = ENV.locale;
        ctrl.bvLocale = '';
        ctrl.bvCode = {
            'en\-global': '-en_eu',
            'de-de': '-de_de',
            'en-gb': '-en_gb',
            'fr-fr': '-fr_fr',
            'es-es': '-es_es',
            'it-it': '-it_it',
            'nl-nl': '-nl_nl',
            'sv-se': '-sv_se',
            'da-dk': '-da_dk',
            'nb-no': '-no_no',
            'pt-br': '-pt_br',
            'tr-tr': '-tr_tr',
            'en-au': '-en_au',
            'en-za': '-en_za',
            'en-in': '-en_in',
            'en-ae': '-en_ae',
            'ar-ae': '-ar_sa',
            'en-us': '',
            'en-ca': '-en_ca',
            'es-mx': '-es',
            'zh-cn': '-zh_cn',
            'ja-jp': '-ja_jp'
        };

        // reset link for Bazaarvoice breadcrum item
        let ngRender = $rootScope.$on('ngRender', function() {
            if ($rootScope.breadcrumbs && $rootScope.breadcrumbs[2] && $rootScope.breadcrumbs[2].title === 'Bazaarvoice') {
                $rootScope.breadcrumbs[2].link = '';
            }
            ngRender();
        });

        function activate() {
            getData();
        }

        function getData() {
            if (ctrl.locale in ctrl.bvCode) {
                ctrl.bvLocale = ctrl.bvCode[ctrl.locale];
                loadBazaarvoice();
            }
        }

        function loadBazaarvoice() {
            angularLoad.loadScript('//kaspersky.ugc.bazaarvoice.com/static/8811' + ctrl.bvLocale + '/bvapi.js').then(function() {
                if ($BV) {
                    $BV.ui('submission_container', {});
                }
            }, (rejection) => {
                errorService.warn(rejection);
            });
        }
    }
})();
