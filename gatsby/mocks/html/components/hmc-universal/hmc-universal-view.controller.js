(function() {
    angular.module('kappGlobal.hmcUniversal')
        .controller('hmcUniversalViewController', hmcUniversalViewController);

    function hmcUniversalViewController(directiveData, $element, ENV, hmcConfig, ngDialog, errorService, $http, $scope, $rootScope, $window) {
        let ctrl = this;
        ctrl.step = 'init';
        ctrl.products = {};
        ctrl.partTracking = '';
        ctrl.locale = ENV.locale;
        ctrl.pageName = $rootScope.kaspersky.pageName;
        ctrl.templatePath = '/apps/kapp/modules/_shared/components/hmc-universal/templates';
        ctrl.stepHistory = new Array(ctrl.step);
        ctrl.checkAndChangeStep = checkAndChangeStep;
        ctrl.checkCustomLocale = checkCustomLocale;
        ctrl.backOneStep = backOneStep;
        ctrl.closePopup = closePopup;
        ctrl.$onInit = activate;

        let preventSubmit = $element.find('form').on('submit', (ev) => {
            ev.preventDefault();
        });

        $scope.$on('$destroy', preventSubmit);

        function activate() {
            setVars();
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        function setVars() {
            ctrl.template = `${ctrl.templatePath}/${ctrl.hmcType}/${ctrl.step}.html`;
            ctrl.contentPath = `/content/${ctrl.locale}/hmc-universal/${ctrl.resource}/${ctrl.step}.json`;

            return getData();
        }

        function getData() {
            return directiveData.get(`${ctrl.contentPath}`).then((response) => {
                if (ctrl.step === 'init') ctrl.init = response.data.fields;
                else ctrl.data = response.data.fields;

                if (ctrl.data) {
                    setMinMax();

                    if (ctrl.data.products) {
                        updateTemplate();
                        getProductData();
                    }
                }
            }, handleRejection);
        }

        /**
         * Check if value from Tridion isn't 0
         * Will be 0 if field is empty as Tridion converts it
         * Only needed in specific steps
         */
        function setMinMax() {
            if (ctrl.step === 'area_mailboxes') {
                ctrl.data.minOne = ctrl.data.minOne !== 0 ? ctrl.data.minOne : 1;
                ctrl.data.maxOne = ctrl.data.maxOne !== 0 ? ctrl.data.maxOne : 999;
                ctrl.data.incOne = ctrl.data.incOne !== 0 ? ctrl.data.incOne : 1;
                ctrl.data.minTwo = ctrl.data.minTwo !== 0 ? ctrl.data.minTwo : 1;
                ctrl.data.maxTwo = ctrl.data.maxTwo !== 0 ? ctrl.data.maxTwo : 999;
                ctrl.data.incTwo = ctrl.data.incTwo !== 0 ? ctrl.data.incTwo : 1;

                if (checkCustomLocale()) customLocale(ctrl.data.incOne, ctrl.data.incTwo);
                else watchInputsForMaxValue();
            }
        }

        /**
         * Watch group of inputs for max value entered by user
         * Set to max value from Tridion if user enters bigger than allowed
         */
        function watchInputsForMaxValue() {
            ctrl.watchInputs = ['$ctrl.area_mailboxes.devices', '$ctrl.area_mailboxes.nodes'];

            $scope.$watchGroup(ctrl.watchInputs, function(newV) {
                if (newV[0] && newV[0] > ctrl.data.maxOne) ctrl[ctrl.step].devices = ctrl.data.maxOne;
                if (newV[1] && newV[1] > ctrl.data.maxTwo) ctrl[ctrl.step].nodes = ctrl.data.maxTwo;
            });
        }

        /**
         * Get product data for each product
         *
         * @return (object)
         */
        function getProductData() {
            ctrl.data.products.forEach((item, index) => {
                if (item.match(/\.json/)) {
                    return $http.get(item, {'cache': true}).then((response) => {
                        ctrl.products[index] = response.data.fields;
                    }, handleRejection);
                }
            });
        }

        /**
         * Update template with either single or double product template
         *
         * @returns {string}
         */
        function updateTemplate() {
            ctrl.template = `${ctrl.templatePath}/${ctrl.hmcType}/${ctrl.data.products.length === 1 ? 'product' : 'product_combo'}.html`;
            return ctrl.template;
        }

        /**
         * Check keys and values exist and add correct one
         * Each one is for different steps
         * Check for undefined and replace with null in order to compare
         */
        function setPack() {
            if (ctrl.area_mailboxes && (ctrl.area_mailboxes.devices || ctrl.area_mailboxes.nodes)) {
                ctrl.area_mailboxes.devices = angular.isDefined(ctrl.area_mailboxes.devices) ? ctrl.area_mailboxes.devices : 0;
                ctrl.area_mailboxes.nodes = angular.isDefined(ctrl.area_mailboxes.nodes) ? ctrl.area_mailboxes.nodes : 0;

                ctrl.selectedPack = ctrl.area_mailboxes.devices > ctrl.area_mailboxes.nodes ?
                    ctrl.area_mailboxes.devices : ctrl.area_mailboxes.nodes;
            }
        }

        /**
         * Executes the comparison function which tells which step to change to
         * Fetches and update the view and data
         *
         * @param firstStep (string) sets the first step before the checks happen
         * @param step (string) specifies the name of the step you want to navigate back to
         * @returns {boolean}
         */
        function checkAndChangeStep(firstStep, step) {
            let updateHistory = true;

            if (firstStep) ctrl[ctrl.step]['resources'] = firstStep;

            if (step) {
                updateHistory = false;
            } else {
                step = hmcConfig[ctrl.hmcType][ctrl.step](ctrl);
            }

            if (step) {
                ctrl.step = step;
            } else {
                return false;
            }

            if (updateHistory) ctrl.stepHistory.push(ctrl.step);

            setVars().then(() => {
                setPack();
                stepsDialog();
                setupTracking(firstStep, updateHistory);
            });
        }

        /**
         * Close and open a new ngDialog with correct template and data
         *
         * @returns {object}
         */
        function stepsDialog() {
            ngDialog.closeAll();
            return ngDialog.open({
                'template': ctrl.template,
                'className': `hmc-modal-wrapper-${ctrl.hmcType}-${ctrl.step} ngdialog-flyout`,
                'showClose': false,
                'closeByEscape': false,
                'closeByDocument': false,
                'closeByNavigation': true,
                'name': 'default-popup',
                'data': ctrl
            });
        }

        /**
         * Close all ngDialog popups and reset everything
         */
        function closePopup() {
            ngDialog.closeAll();
            reset();
        }

        /**
         * Delete all keys and reset all values
         * Needed when the popup is closed and want to start over
         * Not been called when using back button in popup
         */
        function reset() {
            for (let i = 0; i <= ctrl.stepHistory.length; i++) {
                for (let key in ctrl) {
                    if (ctrl.stepHistory[i] === key) delete ctrl[key];
                }
            }
            ctrl.step = 'init';
            ctrl.selectedPack = null;
            ctrl.stepHistory = new Array(ctrl.step);
            ctrl.partTracking = '';
            $window.kaspersky.hmcTool = '';
            $window.kaspersky.pageName = ctrl.pageName;
            setVars();
        }

        /**
         * Used for the back button, navigates using stepHistory
         * @returns {boolean}
         */
        function backOneStep() {
            if (ctrl.stepHistory.length > 1) {
                ctrl.stepHistory.pop();
                checkAndChangeStep(null, ctrl.stepHistory[ctrl.stepHistory.length - 1]);
            }
            return false;
        }

        /**
         * Check for custom locales to show dropdowns instead of inputs
         * Same locales are used here as for buyblocks
         *
         * @returns {boolean}
         */
        function checkCustomLocale() {
            let customLocales = ['da-dk', 'en-us', 'es-es', 'fr-fr', 'it-it', 'ja-jp', 'nb-no', 'nl-nl', 'ru-ru', 'sv-se'];
            return customLocales.indexOf(ctrl.locale) > -1;
        }

        /**
         * Set the range for the dropdowns as specified in Tridion
         */
        function customLocale(incOne, incTwo) {
            ctrl.selectRangeOne = {};
            ctrl.selectRangeTwo = {};

            if (!ctrl.data) return;
            if (ctrl.data.minOne && ctrl.data.maxOne) {
                for (let i = ctrl.data.minOne; i <= ctrl.data.maxOne; i += incOne) {
                    ctrl.selectRangeOne[i] = i;
                }
            }
            if (ctrl.data.minTwo && ctrl.data.maxTwo) {
                for (let i = ctrl.data.minTwo; i <= ctrl.data.maxTwo; i += incTwo) {
                    ctrl.selectRangeTwo[i] = i;
                }
            }
        }

        function setupTracking(firstStep, updateHistory) {
            if (firstStep) ctrl.stepOne = firstStep;

            if (!updateHistory) {
                ctrl.partTracking = ctrl.partTracking.replace(/:(,|\w)+$/g, '');
                return tracking();
            }

            if (ctrl.stepHistory.length > 2) {
                ctrl.partTracking += ':';
                let tempObj = Object.entries(ctrl[ctrl.stepHistory.slice(-2)[0]]);

                ctrl.partTracking += tempObj.map(value => value[1]).join(',');
            }

            tracking();
        }

        function tracking() {
            let answerTrkStr = 'HMC VSMB:' + ctrl.stepOne + ctrl.partTracking;
            answerTrkStr += ctrl.stepHistory.slice(-1)[0].indexOf('verdict') !== -1 ? ':' + ctrl.stepHistory.slice(-1)[0] : '';
            let stepTrkStr = ctrl.pageName + ' > HMC > ' + ctrl.step;

            $window.kaspersky.hmcTool = answerTrkStr;
            $window.trackPageView(stepTrkStr);
            $window.kaspersky.pageName = stepTrkStr;
        }
    }
})();
