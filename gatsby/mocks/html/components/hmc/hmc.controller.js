(function() {
    'use strict';
    angular.module('kappGlobal.hmc')
        .controller('hmcController', hmcController);

    function hmcController($rootScope, $http, $q, $location, $anchorScroll, currencyManager, ngDialog, $window, cookieService, $state, $timeout, ENV, windowHelperService, errorService) {
        let ctrl = this,
            finalSelectionFilter = {},
            storeResults = null,
            currentName = '',
            $dialog = ngDialog;

        ctrl.hmcData = [
            { 'currentStep': 'step-1', 'stateClass': 'hmc-modal-step1' },
            { 'currentStep': 'step-2', 'stateClass': 'hmc-modal-step2' },
            { 'currentStep': 'results', 'stateClass': 'hmc-modal-results' },
            { 'currentStep': 'autoPopup', 'stateClass': 'hmc-modal-auto-popup' }
        ];
        ctrl.QuestionSelected = [];
        ctrl.stateClass = [];
        ctrl.hmcVerdict = [];
        ctrl.isPopupOpen = false;
        ctrl.bannerPopupActive = false;
        ctrl.requiredOptionActive = false;
        ctrl.allSelected = false;
        ctrl.step = ctrl.hmcData[0];
        ctrl.kscAvailable = false;
        ctrl.template = 'default';
        ctrl.getSelectedOS = getSelectedOS;
        ctrl.backBtn = backBtn;
        ctrl.loadHMC = loadHMC;
        ctrl.closePromoBanner = closePromoBanner;
        ctrl.selectCheckbox = selectCheckbox;
        ctrl.checkQuestions = checkQuestions;
        ctrl.progressBar = progressBar;
        ctrl.selectAll = selectAll;
        ctrl.isMobile = windowHelperService.isMobile();
        ctrl.$onInit = activate;

        function closeDialog() {
            $dialog.close();
        }

        function activate() {
            getData();
            currencyManager.getCurrencies();
        }

        function getData() {
            let promises = [
                $http.get(`/content/${ENV.locale}/hmc/hmc-ui-fields.json`, { 'cache': true }),
                $http.get(`/content/${ENV.locale}/hmc/hmc-step-1.json`, { 'cache': true }),
                $http.get(`/content/${ENV.locale}/hmc/hmc-step-2.json`, { 'cache': true }),
                $http.get(`/content/${ENV.locale}/hmc/hmc-logic.json`, { 'cache': true })
            ];

            $q.all(promises).then((response) => {
                ctrl.hmcUI = response[0].data.fields;
                ctrl.step1 = response[1].data.fields;
                ctrl.step2 = response[2].data.fields;
                ctrl.settings = response[3].data.fields;

                // check for ksc toggle in the CMS component

                if (ctrl.settings.hmc_ksc_enable && ctrl.settings.hmc_ksc_enable[0] === 'true') ctrl.kscAvailable = true;

                // template check

                if (ctrl.settings.hmc_template && ctrl.settings.hmc_template === 'v2') ctrl.template = 'v2';

                // check for popup option in the CMS component

                if (ctrl.settings.hmc_popup && ctrl.settings.hmc_popup[0]) autoPopup(ctrl.settings.hmc_popup[0]);

                currentName = $rootScope.kaspersky.pageName;
            });
        }

        function stepsDialog() {
            return $dialog.open({
                'template': `/apps/kapp/modules/_shared/components/hmc/templates/hmc-steps-${ctrl.template}.html`,
                'className': `hmc-modal-wrapper-${ctrl.template} ngdialog-flyout`,
                'showClose': false,
                'name': 'default-popup',
                'data': ctrl,
                'closeByNavigation': true,
                'onOpenCallback': function() {
                    ctrl.isPopupOpen = true;

                    $timeout(() => {
                        ctrl.currentPopup = angular.element(document).find('#hmc-modal');
                    }, 200);
                },
                'preCloseCallback': function() {
                    $timeout(() => {
                        ctrl.QuestionSelected.length = 0;
                        ctrl.hmcVerdict.length = 0;
                        ctrl.stateClass = [];
                        ctrl.step = '';
                        ctrl.isPopupOpen = false;
                        ctrl.requiredOptionActive = false;
                        ctrl.allSelected = false;
                        ctrl.bannerPopupActive = true;
                        ctrl.autoPopupActive = false;

                        if (ctrl.hmcData && ctrl.hmcData[0].autoPopup) ctrl.hmcData[0].autoPopup = false;

                        angular.element(document).find('#hmc-os-selection').children().removeClass('selected');

                        $timeout(() => {
                            angular.element(document).find('html').removeClass(`hmc-mobile-banner-active-${ctrl.template}`);
                        }, 400);
                    });
                }
            });
        }

        function loadHMC($event) {
            $event.stopPropagation();
            $event.preventDefault();

            $dialog.closeAll();

            $timeout(() => {
                ctrl.stateClass.push('hmc-embedded');
                ctrl.step = ctrl.hmcData[0];
                ctrl.autoPopupActive = false;
                angular.element(document).find('html').removeClass(`hmc-mobile-banner-active-${ctrl.template}`);

                stepsDialog();
            }, 600);
        }

        function getSelectedOS($event) {
            $event.preventDefault();

            ctrl.OSSelected = [];
            let OSCollection = angular.element(document).find('#hmc-os-selection .form-element.checkbox.selected').parent().children();

            if (angular.element(document).find('#hmc-os-selection .form-element.checkbox.selected').length > 0) {

                // gather user-selected OS data

                _.forEach(angular.element(document).find('#hmc-os-selection .form-element.checkbox.selected'), function(value) {
                    ctrl.OSSelected.push(_.findIndex(OSCollection, value));
                });
            }

            function skipStep2() {
                processData();

                if (!ctrl.isPopupOpen) {
                    stepsDialog();
                }

                ctrl.stateClass.push('hmc-step2-skipped');
                ctrl.step = ctrl.hmcData[2];
            }

            function goToStep2() {
                ctrl.hmcData[1];
                ctrl.step = ctrl.hmcData[1];

                if (!ctrl.isPopupOpen) {
                    stepsDialog();
                }

                $timeout(() => {
                    $window.trackPageView(currentName + ' > HMC > Choose Your Needs');
                }, 100);
            }

            if (ctrl.kscAvailable) {
                goToStep2();
            } else {
                if (ctrl.OSSelected.indexOf(0)) {
                    skipStep2();
                } else {
                    goToStep2();
                }
            }
        }

        function selectAll($event) {
            if ($event) $event.preventDefault();

            ctrl.allSelected = !ctrl.allSelected;

            if (ctrl.allSelected === true) {
                ctrl.requiredOptionActive = true;
                angular.element(document).find('#hmc-questions-selection, form.narrow-wrapper > .row').children().addClass('selected');
            } else {
                ctrl.requiredOptionActive = false;
                angular.element(document).find('#hmc-questions-selection, form.narrow-wrapper > .row').children().removeClass('selected');
            }
        }

        function selectCheckbox($event) {
            if (angular.element(document).find($event.currentTarget).hasClass('select-all')) {
                selectAll();
            } else {
                angular.element(document).find($event.currentTarget).toggleClass('selected');
            }

            if (angular.element(document).find($event.currentTarget).parent().children().hasClass('selected')) {
                ctrl.requiredOptionActive = true;
            } else {
                ctrl.requiredOptionActive = false;
            }

            $event.stopPropagation();
            $event.preventDefault();
        }

        let mediaQuery = $window.matchMedia('(min-width: 769px)');
        mediaQuery.addListener(mqBreakPoint);

        function mqBreakPoint(mediaQuery) {
            if (mediaQuery.matches) {
                ctrl.isMobile = false;
                angular.element(document).find('html').removeClass(`hmc-mobile-banner-active-${ctrl.template}`);
            } else {
                ctrl.isMobile = true;
                if (ctrl.autoPopupActive) angular.element(document).find('html').addClass(`hmc-mobile-banner-active-${ctrl.template}`);
            }
        }

        function closePromoBanner() {
            ctrl.stateClass = ctrl.stateClass.filter(e => e !== 'hmc-promo-popup-v2');

            $timeout(() => {
                $window.trackPageView(currentName + ' > HMC > Select Platform');
            }, 100);
        }

        let ngRender = $rootScope.$on('ngRender', () => {
            embeddedBtn();
            ngRender();
        });

        function autoPopup(trigger) {
            function triggerHMCPopup() {
                cookieService.set('hmc_auto_open', 'true', 1);
                ctrl.isPopupOpen = true;
                ctrl.hmcData[0].autoPopup = true;
                ctrl.stateClass.push('hmc-auto-popup');
                ctrl.autoPopupActive = true;

                if (ctrl.template === 'v2') ctrl.stateClass.push('hmc-promo-popup-v2');

                let bannerOmnitureValue = $rootScope.$on('ngRender', () => {
                    $window.trackPageView(currentName + ' > HMC > Start');
                    bannerOmnitureValue();
                });

                mqBreakPoint(mediaQuery);

                $timeout(() => {
                    stepsDialog();
                }, trigger.hmc_popup_trigger_time || 0);
            }

            if (trigger && trigger.hmc_enable_popup[0]) {
                ctrl.popup = trigger;

                let currentState = $state.current.name,
                    hmcPopupLocation = '';

                switch (trigger.hmc_location) {
                case 'homepage':
                    hmcPopupLocation = 'homepage';
                    break;
                case 'Product pages':
                    hmcPopupLocation = 'home-product';
                    break;
                case 'Home Security Homepage':
                    hmcPopupLocation = 'home-security';
                    break;
                }

                if (ctrl.popup.hmc_enable_popup[0] === 'true' && !cookieService.get('hmc_auto_open')) {
                    if (currentState === hmcPopupLocation) {
                        triggerHMCPopup();
                    } else if (!hmcPopupLocation.length) {
                        triggerHMCPopup();
                    }
                }
            }
        }

        function checkQuestions($event) {
            $event.preventDefault();

            // gather user-selected questions data

            let checkboxes = angular.element(document).find('#hmc-questions-selection .form-element.checkbox');
            _.forEach(checkboxes, function(el, i) {
                if (!angular.element(el).hasClass('select-all')) {
                    if (angular.element(el).hasClass('selected')) {
                        ctrl.QuestionSelected.push(i);
                    }
                }
            });

            ctrl.step = ctrl.hmcData[2];

            $location.hash('hmc-modal');
            $anchorScroll();
            processData();
        }

        function backBtn(event) {
            event.stopPropagation();
            event.preventDefault();

            ctrl.QuestionSelected.length = 0;
            ctrl.hmcVerdict.length = 0;

            if (ctrl.currentPopup.hasClass('hmc-modal-results')) {
                ctrl.step = ctrl.hmcData[1];
            }

            if (ctrl.currentPopup.hasClass('hmc-embedded') || ctrl.currentPopup.hasClass('hmc-auto-popup')) {
                if (ctrl.currentPopup.hasClass('hmc-step2-skipped') && ctrl.currentPopup.hasClass('hmc-modal-results') || ctrl.currentPopup.hasClass('hmc-modal-step2')) {
                    ctrl.step = ctrl.hmcData[0];
                    ctrl.stateClass.splice(1, 1);
                    ctrl.requiredOptionActive = false;
                } else if (ctrl.currentPopup.hasClass('hmc-modal-results')) {
                    ctrl.step = ctrl.hmcData[1];
                }
            } else {
                if (ctrl.currentPopup.hasClass('hmc-modal-step1') || ctrl.currentPopup.hasClass('hmc-modal-step2') || ctrl.currentPopup.hasClass('hmc-modal-results') && ctrl.currentPopup.hasClass('hmc-step2-skipped')) {
                    closeDialog();
                }

                if (ctrl.currentPopup.hasClass('hmc-step2-skipped')) {
                    ctrl.stateClass.splice(0, 1);
                } else {
                    ctrl.step = ctrl.hmcData[1];
                }
            }
        }

        function progressBar(current) {
            if (current.currentStep === 'step-1' || current.currentStep === 'autoPopup') {
                return {'width': '0'};
            }

            if (current.currentStep === 'step-2') {
                return {'width': '50%'};
            }

            if (current.currentStep === 'results') {
                return {'width': '100%'};
            }
        }

        function filterMatch(dataSet, secondDimensionDataSet, relevancy, isOs) {
            var filtered = dataSet;
            var selection = !isOs ? 'hmcQuestionIndex' : 'hmcOsIndex';

            if (!secondDimensionDataSet.length) {
                filtered = filtered.filter(function(elem) {
                    return !elem[selection].length;
                });
            } else {
                for (var i = 0; i < secondDimensionDataSet.length; i++) {
                    filtered = filtered.filter(function(elem) {
                        let diff = elem[selection].length - secondDimensionDataSet.length;
                        return $.inArray(secondDimensionDataSet[i], elem[selection]) !== -1 && (0 <= diff && diff <= relevancy);
                    });
                }
            }

            return filtered;
        }

        function truncateByIndex(questionsSelected, relevancyIndex) {
            if (!questionsSelected) questionsSelected = [];

            var filtered = questionsSelected,
                truncate = false;

            questionsSelected.forEach(function(val) {
                if (val >= relevancyIndex) {
                    truncate = true;
                    return false;
                }
            });
            if (truncate) {
                for (var j = 0; j < relevancyIndex; j++) {
                    filtered = filtered.filter((val) => {
                        return val !== j;
                    });
                }
            }

            return filtered;
        }

        function findByPriority(priorityCheck) {
            var max = 0;

            for (var i = 1; i < priorityCheck.length; i++) {
                if (priorityCheck[i].priority > priorityCheck[i - 1].priority) {
                    max = i;
                }
            }

            return priorityCheck[max];
        }

        function getHMCResult(selection) {
            if (!selection || selection.length === 'undefined') {
                selection = {
                    'hmcResultComponents': [`content/${ENV.locale}/home-security/products/ktsmd/ktsmd.json`]
                };

                if (ctrl.kscAvailable) {
                    selection = {
                        'hmcResultComponents': [`content/${ENV.locale}/home-security/products/ksc-personal/ksc-personal.json`, `content/${ENV.locale}/home-security/products/ksc-family/ksc-family.json`]
                    };
                }
            }

            storeResults = selection.hmcResultComponents;
            return selection.hmcResultComponents;
        }

        function getSvar64(os, questions, verdicts, version) {
            let sVar64 = [],
                versionId = version || 'acq';

            sVar64.push(versionId);

            function getValues(item) {
                var holder = [];

                _.forEach(item, function(value) {
                    holder.push(value);
                });

                return holder.length > 0 ? holder : 'na';
            }

            // add selected os indexes to array

            sVar64.push(getValues(os));

            // add selected questions to array
            // if non selected then add 'na'

            sVar64.push(getValues(questions) || 'na');

            // set verdict data

            let verdictData = [],
                recommendedVerdict;

            _.forEach(verdicts, function(value, index) {
                verdictData.push(value.shortName);

                if (index === verdicts.length - 1) {
                    recommendedVerdict = value.shortName;
                }
            });

            sVar64.push(verdictData);

            // set final recommended verdict value

            sVar64.push(recommendedVerdict);

            return sVar64.join(':');
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        function processData() {
            let osRelevancy = 0,
                questionsRelevancy = 3,
                questionSelectionFilter,
                osSelectionFilter,
                selectedQuestions = ctrl.QuestionSelected;

            if (ctrl.kscAvailable) {
                questionsRelevancy = 5;
            }

            selectedQuestions = truncateByIndex(selectedQuestions, 3);
            osSelectionFilter = filterMatch(ctrl.settings.hmcLogicBlock, ctrl.OSSelected, osRelevancy, true);
            questionSelectionFilter = filterMatch(osSelectionFilter, selectedQuestions, questionsRelevancy, false);
            finalSelectionFilter = findByPriority(questionSelectionFilter);
            getHMCResult(finalSelectionFilter);

            // get resource element

            storeResults.forEach((item, index) => {
                if (item.match(/\.json/)) {
                    return $http.get(item, {'cache': true}).then((response) => {
                        ctrl.hmcVerdict[index] = response.data.fields;
                        ctrl.hmcVerdict[index].selectedDevices = 3;

                        if (ENV.locale === 'en-us' && ctrl.hmcVerdict[index].shortName === 'ktsmd') {
                            ctrl.hmcVerdict[index].selectedDevices = 5;
                        }

                        if ((ENV.locale === 'zh-cn' || ENV.locale === 'en-us') && ctrl.hmcVerdict[index].shortName === 'ktsmd') {
                            ctrl.hmcVerdict[index].selectedDevices = 5;
                        }

                        if (ENV.locale === 'zh-cn' && ctrl.hmcVerdict[index].shortName === 'kis') {
                            ctrl.hmcVerdict[index].selectedDevices = 1;
                        }

                        if (index === storeResults.length - 1) {
                            $timeout(() => {
                                $window.kaspersky.hmcTool = getSvar64(ctrl.OSSelected, ctrl.QuestionSelected, ctrl.hmcVerdict);
                                if (angular.isDefined($window.s)) $window.s.eVar64 = $window.kaspersky.hmcTool;
                                $window.trackPageView(currentName + ' > HMC > We recommend > ' + response.data.fields.title);
                            }, 100);
                        }
                    }, handleRejection);
                }
            });
        }

        function runEmbeddedHMC() {
            ctrl.stateClass.push('hmc-embedded');
            ctrl.step = ctrl.hmcData[0];
            stepsDialog();

            $timeout(() => {
                $window.trackPageView(currentName + ' > HMC > Select Platform');
            }, 100);
        }

        function embeddedBtn() {
            angular.element(document).find('.hmc-open.hmc-show-start-screen').on('click', ($event) => {
                $event.stopPropagation();
                $event.preventDefault();

                if ($event.handled !== true) {
                    $event.handled = true;
                    runEmbeddedHMC();
                }
            });
        }
    } // controller end
})();
