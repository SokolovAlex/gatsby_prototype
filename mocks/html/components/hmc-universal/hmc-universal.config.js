(function() {
    angular.module('kappGlobal.hmcUniversal')
        .constant('hmcConfig', {
            'smb': {
                'init': function(ctrl) {
                    if (!ctrl.init) return;
                    return ctrl.init.resources === 'Yes' ? 'console_type' : 'license_number_detection';
                },
                'license_number_detection': function(ctrl) {
                    if (!ctrl.license_number_detection) return;
                    return ctrl.license_number_detection.license_number > ctrl.data.number ? 'area_mailboxes' : 'ksos_verdict';
                },
                'console_type': function(ctrl) {
                    if (!ctrl.console_type) return;
                    return ctrl.console_type.console_type === 'Cloud' || ctrl.console_type.console_type === `Doesn't matter` ? 'area_mailboxes' : 'area_patch';
                },
                'area_mailboxes': function(ctrl) {
                    if (!ctrl.area_mailboxes) return;
                    let step = ctrl.area_mailboxes;
                    if (step.devices && !step.nodes) {
                        return 'kes_cloud_verdict';
                    } else if (!step.devices && step.nodes) {
                        return 'ks_o365_verdict';
                    } else if (step.devices && step.nodes) {
                        return 'ks_o365_plus_kes_cloud_verdict';
                    }
                },
                'area_patch': function(ctrl) {
                    if (!ctrl.area_patch) return;
                    let step = ctrl.area_patch;
                    return step.area_patch === 'Yes' ? 'kesb_advanced_verdict' : 'kesb_select_verdict';
                }
            }
        });
})();
