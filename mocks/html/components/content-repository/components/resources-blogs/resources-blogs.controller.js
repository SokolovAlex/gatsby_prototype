(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .controller('resourcesBlogsController', resourcesBlogsController);

    function resourcesBlogsController(localStorageService, contentRepoService, errorService) {
        let ctrl = this,
            blogsCacheName = 'blogsCache-name',
            blogsResourcesCacheName = 'blogsResourcesCache-name';
        ctrl.blogData = {};
        ctrl.resources = [];
        ctrl.$onInit = activate;

        function activate() {
            ctrl.blogData = getBlogDataFromCache();
            if (ctrl.blogData === null) {
                getBlogByName('resource-center-blog-section');
            }
            else {
                ctrl.resources = getBlogResourcesDataFromCache();
                if (ctrl.resources === null) {
                    getBlogByName('resource-center-blog-section');
                }
            }
        }

        function getBlogDataFromCache() {
            return localStorageService.get(blogsCacheName);
        }

        function getBlogResourcesDataFromCache() {
            return localStorageService.get(blogsResourcesCacheName);
        }

        function getBlogByName(blogName) {
            return contentRepoService.getBlogByName(blogName)
                .then((response) => {
                    ctrl.blogData = contentRepoService.populateBlogFields(response.data);
                    if (ctrl.blogData !== null) {
                        ctrl.blogData['resources'].map((resource) => {
                            ctrl.resources.push(contentRepoService.populateBlogResourceFields(resource));
                        });
                    }
                    localStorageService.set(blogsCacheName, ctrl.blogData);
                    localStorageService.set(blogsResourcesCacheName, ctrl.resources);
                }, (rejection) => {
                    errorService.warn(rejection);
                });
        }
    }
})();
