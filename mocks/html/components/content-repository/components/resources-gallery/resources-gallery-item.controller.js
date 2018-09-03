(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .controller('resourcesGalleryItemController', resourcesGalleryItemController);

    function resourcesGalleryItemController(contentRepoService, errorService) {
        let ctrl = this;
        ctrl.resources = [];
        ctrl.categoryStrings = ctrl.categoryStrings || 'customers';
        ctrl.filteredResources = [];
        ctrl.$onInit = activate;

        function activate() {
            ctrl.repoType = ctrl.repoType || 'smb';
            getResourceListData();
        }

        function getResourceListData() {
            let repoType = ctrl.repoType === 'vsb' ? 'smb' : ctrl.repoType;
            return contentRepoService.getResources(repoType)
                .then((response) => {
                    if (response.data && response.data.fields && angular.isObject(response.data.fields.resourceCenterItems)) {
                        let responseData = response.data.fields.resourceCenterItems;
                        responseData.map((resourceCenterItem) => {
                            ctrl.resources.unshift(contentRepoService.populateResourcesFields(resourceCenterItem));
                        });
                        let localCategories = ctrl.categoryStrings.split(',').reverse();
                        angular.forEach(ctrl.resources, function(outerValue) {
                            angular.forEach(localCategories, function(innerValue) {
                                let categoryName = innerValue;
                                if (innerValue !== 'certificates') categoryName = contentRepoService.buildCategoryName(innerValue);
                                if (outerValue.resourceCategory && outerValue.resourceCategory.title === categoryName) {
                                    ctrl.filteredResources.unshift({'category': innerValue, 'resource': outerValue});
                                }
                            });
                        });
                    }
                }, (rejection) => {
                    errorService.warn(rejection);
                });
        }
    }

})();
