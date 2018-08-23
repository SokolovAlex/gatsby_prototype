(function() {
    'use strict';
    angular.module('kappGlobal.lrcSerial')
        .controller('lrcSerialController', lrcSerialController);

    function lrcSerialController($scope, $state, sessionStorageService, directiveData, lrcService, $q, errorService, windowHelperService, ngDialog) {
        let ctrl = this;
        ctrl.sendSerial = sendSerial;
        ctrl.editInput = editInput;
        ctrl.$onInit = activate;
        ctrl.openScreenshotDialog = openScreenshotDialog;
        const opts = {'location': false, 'inherit': true};

        function activate() {
            ctrl.isPartner = ctrl.template === 'lrc-serial-dialog';
            let promises = [getLrcSerial(), getTranslation()];
            $q.all(promises);
        }

        function getLrcSerial() {
            return directiveData.getByUrl('lrc-serial').then((response) => {
                ctrl.data = response.data.fields;
                ctrl.hideSidebar = ctrl.data.hideSidebar && ctrl.data.hideSidebar[0] === 'True';
            }, handleRejection);
        }

        function getTranslation() {
            return directiveData.getLocal('general-translations').then((response) => {
                ctrl.translations = response.data.fields;
            }, handleRejection);
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        function openScreenshotDialog($event) {
            $event.preventDefault();
            ngDialog.open({
                'template':
                    `<div class="modal-header">
                    		<a class="modal-button modal-close" aria-label="Dismiss" ng-click="closeThisDialog(0)">
                    			<span class="font-icons icon-cancel"></span>
                    		</a>
                    </div>
                    <div class="text-center">
                      <img ng-src="{{ngDialogData.data.infoImg}}" />
                    </div>`,
                'plain': true,
                'className': 'ngdialog-flyout ngdialog--lrc-dialog',
                'data': ctrl,
                'showClose': false,
                'scope': $scope,
                'width': 772
            });
        }

        function sendSerial() {
            if (ctrl.serial) {
                if (ctrl.serial.length === 18) {
                    let serialArr = ctrl.serial.split('');
                    serialArr.splice(4, 0, '-');
                    serialArr.splice(11, 0, '-');
                    ctrl.serial = serialArr.join('');
                }
                if (ctrl.serial.length === 32) {
                    let serialArr = ctrl.serial.split('');
                    serialArr.splice(8, 0, '-');
                    serialArr.splice(13, 0, '-');
                    serialArr.splice(18, 0, '-');
                    serialArr.splice(23, 0, '-');
                    ctrl.serial = serialArr.join('');
                }
                if (!$scope.serialForm.$invalid) {
                    lrcService.searchLicense(ctrl.serial, {}).then((response) => {
                        ctrl.license = response;
                        if (ctrl.isPartner) return handlePartnerSuccess();

                        handleLRCSuccess();

                    }, (rejection) => {
                        ctrl.error = ctrl.translations.lrcInvalidSerial || 'You may have made a mistake when entering your License information. Please try entering it again.';
                        errorService.warn(rejection);
                    });
                } else {
                    $scope.serialForm.serial.$dirty = true;
                }
            } else {
                $scope.serialForm.serial.$dirty = true;
            }
        }

        function handleLRCSuccess() {
            ctrl.license.data.verdictSerial = ctrl.serial;

            setLostDaysLeft(ctrl.license.data.days_left);
            // Check if the verdict is LOSTDAYS problem related and save partner name and link
            if (ctrl.license.data.verdict.match(/LOSTDAYS_FALLBACK/)) {
                ctrl.lostDaysDisclaimer = {
                    'partner': ctrl.license.data.verdict.match(/LOSTDAYS_FALLBACK_(.*)/)[1],
                    'link': ctrl.license.data.provider_url
                };
                ctrl.lostDaysDisclaimerFullText = replaceAll(ctrl.translations[ctrl.lostDaysDisclaimer.partner], /href="#"/, `href="${ctrl.lostDaysDisclaimer.link}"`);

            } else if (ctrl.license.data.verdict.match(/KSC_FAM_UNKNOWN/)) {
                ctrl.lostDaysDisclaimerFullText = ctrl.translations[ctrl.license.data.verdict];

            } else {
                $state.go('lrc-verdict', {
                    'verdict': ctrl.license.data.verdict,
                    'verdictData': ctrl.license.data
                }, opts);
            }
        }

        function handlePartnerSuccess() {
            if (!ctrl.license.data.partnerid) return ctrl.noPartner = true;
            getPartnerData();
        }

        function getPartnerData() {
            directiveData.getByUrl('/lrc/partner-mapping.json').then(function(response) {
                let partnerObj = _.find(response.data.fields.map, ['id', String(ctrl.license.data.partnerid)]);

                if (!partnerObj) return ctrl.noPartner = true;
                windowHelperService.goToUrl(partnerObj.href);
            });
        }

        // Private Methods
        function replaceAll(lostDaysString, find, replace) {
            return lostDaysString.replace(find, replace);
        }

        function editInput(newV, oldV) {
            if (newV && oldV && newV.length < 21) {
                if (newV.length > oldV.length && (ctrl.serial.length === 4 || ctrl.serial.length === 11) && ctrl.serial[ctrl.serial.length - 1] !== '-') ctrl.serial += '-';
            } else if (newV && oldV && newV.length === 21) {
                let serialArr = ctrl.serial.replace(/-/g, '').split('');
                serialArr.splice(8, 0, '-');
                serialArr.splice(13, 0, '-');
                serialArr.splice(18, 0, '-');
                ctrl.serial = serialArr.join('');
                if (newV.length > oldV.length && (ctrl.serial.length === 23) && ctrl.serial[ctrl.serial.length - 1] !== '-') ctrl.serial += '-';
            } else if (newV && oldV && newV.length > 21) {
                if (newV.length > oldV.length && (ctrl.serial.length === 23) && ctrl.serial[ctrl.serial.length - 1] !== '-') ctrl.serial += '-';
            }
        }

        function setLostDaysLeft(daysLeft) {
            sessionStorageService.set('lrc-daysLeft', daysLeft);
        }
    }
})();
