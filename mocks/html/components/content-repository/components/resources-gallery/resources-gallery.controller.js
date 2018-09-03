(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .controller('resourcesGalleryController', resourcesGalleryController);

    function resourcesGalleryController(contentRepoService, errorService) {
        let ctrl = this;
        ctrl.categories = [];
        ctrl.categoryStrings = '';
        ctrl.$onInit = activate;

        function activate() {
            ctrl.repoType = ctrl.repoType || 'smb';
            getResourceListData();
        }

        function getResourceListData() {
            contentRepoService.getCategories()
                .then((response) => {
                    let repoType = ctrl.repoType === 'vsb' ? 'smb' : ctrl.repoType,
                        dataCategory = response['data'][repoType];
                    ctrl.categories = contentRepoService.getCategoriesFromObject(dataCategory).categoriesList;
                    ctrl.categories.map((value, index) => {
                        if (index === (ctrl.categories.length - 1)) {
                            ctrl.categoryStrings += value;
                        }
                        else {
                            ctrl.categoryStrings += `${value},`;
                        }
                    });
                }, (rejection) => {
                    errorService.warn(rejection);
                });
        }
    }

})();
