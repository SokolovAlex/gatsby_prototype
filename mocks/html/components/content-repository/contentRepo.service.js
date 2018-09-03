(function() {
    'use strict';
    angular.module('kappGlobal.contentRepo')
        .factory('contentRepoService', contentRepoService);

    function contentRepoService($window, $rootScope, $sce, $http, $stateParams, $location, repoMapperService, imageManagerService,
        SUBCATCONFIG, CATEGORYCONFIG, CERTIFICATESCONFIG, AWARDSCONFIG, ENV, appHelperService, windowHelperService) {
        let config = {
            'serverUrl': ENV.apiServer,
            'searchUrl': `${ENV.apiServer}/_svc/contentrepository.svc/docs/query`,
            'headerUrl': `content/${ENV.locale}/repository/headers/`,
            'blogUrl': `content/${ENV.locale}/repository/blogs/`,
            'apiContentRepoPath': `content/${ENV.locale}/repository/`,
            'resourcesB2BUrl': `${ENV.apiServer}/content/${ENV.locale}/repository/resources/b2b-resources.json`,
            'resourcesB2CUrl': `${ENV.apiServer}/content/${ENV.locale}/repository/resources/b2c-resources.json`,
            'resourcesAboutUrl': `${ENV.apiServer}/content/${ENV.locale}/repository/resources/about-resources.json`,
            'defaultOrderBy': 'pub_start desc',
            'defaultYears' : [1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018]
        };

        return {
            'buildCategoryName': buildCategoryName,
            'buildSubCategoryName': buildSubCategoryName,
            'getCategories': getCategories,
            'getCategoryParams': getCategoryParams,
            'getLinkMediaByPath': getLinkMediaByPath,
            'getHeaderByName': getHeaderByName,
            'getPathFromUrl': getPathFromUrl,
            'getUserFriendlyUrl': getUserFriendlyUrl,
            'getStrippedString': getStrippedString,
            'getTrustAsHtml': getTrustAsHtml,
            'getRandomizedImage': getRandomizedImage,
            'getResources': getResources,
            'getCategoriesFromObject': getCategoriesFromObject,
            'getBlogByName': getBlogByName,
            'populateLinkFields': populateLinkFields,
            'populateRepositoryHeaderFields': populateRepositoryHeaderFields,
            'populateBlogFields': populateBlogFields,
            'populateBlogResourceFields': populateBlogResourceFields,
            'populateResourcesFields': populateResourcesFields,
            'setUrlToCorrectCategory': setUrlToCorrectCategory,
            'search': search,
            'getPageNumberFromUrl': getPageNumberFromUrl,
            'getSelectorFromUrl': getSelectorFromUrl,
            'getDateFromUrl': getDateFromUrl,
            'setPaginationUrlValue': setPaginationUrlValue,
            'setSelectorUrlValue': setSelectorUrlValue,
            'setDateUrlValue': setDateUrlValue,
            'formatSelectorForApp': formatSelectorForApp,
            'getDefaultYears': getDefaultYears,
            'setTrackPageView': setTrackPageView
        };

        function buildSubCategoryName(name, subCategories, repoType) {
            let config;
            switch (repoType) {
            case 'awards':
                config = AWARDSCONFIG;
                break;
            case 'certificates':
                config = CERTIFICATESCONFIG;
                break;
            default:
                config = SUBCATCONFIG;
            }

            return buildConfigCategoryName(name, subCategories, config);
        }

        function buildCategoryName(name, categories) {
            return buildConfigCategoryName(name, categories, CATEGORYCONFIG);
        }

        function getCategories() {
            return $http.get(`${config.serverUrl}/content/${ENV.locale}/resources/Categories.json`, {'cache': true});
        }

        function getCategoryParams() {
            return $stateParams.category;
        }

        function getLinkMediaByPath(path) {
            path = decodeURIComponent(`${config.serverUrl}${path}`);
            return $http.get(path, {'cache': true});
        }

        function getHeaderByName(headerName) {
            let path = decodeURIComponent(`${config.headerUrl}${headerName}.json`);
            return $http.get(path, {'cache': true});
        }

        function getPathFromUrl(fileName) {
            fileName = fileName || $stateParams.path.replace(/_/g, '/') + '.json';
            let path = '';
            if (isIscSection()) {
                path = `/${config.apiContentRepoPath}isc/`;
            }
            if (isSmbSection()) {
                path = `/${config.apiContentRepoPath}smb/`;
            }
            if (isPrSection()) {
                path = `/${config.apiContentRepoPath}pr/`;
                fileName = fileName.replace(/_/g, '/');
            }
            if (isAboutSection()) {
                path = `/${config.apiContentRepoPath}about/`;
            }
            return path + fileName;
        }

        function getUserFriendlyUrl(url) {
            let fileName = url.substr(url.lastIndexOf('/') + 1).replace(/.json/g, '').toLowerCase();
            if (isPrSection()) {
                let values = url.split('/'),
                    yearFolder = values[values.length - 2];
                return `${yearFolder}_${fileName}`;
            }
            return fileName;
        }

        function getStrippedString(str, length) {
            return str.substring(0, length);
        }

        function getTrustAsHtml(strHtml) {
            return $sce.trustAsHtml(strHtml);
        }

        function getRandomizedImage(image) {
            return imageManagerService.getRandomizedImage(image);
        }

        function getResources(repoType) {
            let path = '';
            if (repoType === 'smb' || repoType === 'vsb') {
                path = decodeURIComponent(`${config.resourcesB2BUrl}`);
            }
            if (repoType === 'about') {
                path = decodeURIComponent(`${config.resourcesAboutUrl}`);
            }
            else {
                path = decodeURIComponent(`${config.resourcesB2CUrl}`);
            }
            return $http.get(path, {'cache': true});
        }

        function getCategoriesFromObject(obj, array, repoType) {
            let tempArray = [],
                filteredCategories;
            array = array || [];
            let categoriesWithSubCat = {};
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    categoriesWithSubCat[key] = obj[key];
                    tempArray.push(key);
                }
            }

            filteredCategories = removedUnusedCategories(tempArray, repoType);

            if (ENV.locale === 'ja-jp' && repoType === 'pr') filteredCategories = reorderJPCategories(filteredCategories);

            array = array.concat(filteredCategories ? filteredCategories : tempArray);

            return {'categoriesList': array, 'categoriesWithSubCat': categoriesWithSubCat};
        }

        /**
         * Temporary function to reorder JP categories until they're done in Tridion
         * @param  {[Array]} array The categories to sort
         * @return {[Array]}       The sorted categories
         */
        function reorderJPCategories(array) {
            let order = ['製品ニュース', 'ウイルスニュース', 'スパムニュース', '比較テスト', 'ビジネスニュース', 'イベントカレンダー', 'お知らせ'];

            return array.sort(function(a, b) {
                return order.indexOf(a) - order.indexOf(b);
            });
        }

        function getBlogByName(blogName) {
            let path = decodeURIComponent(`${config.blogUrl}${blogName}.json`);
            return $http.get(path, {'cache': true});
        }

        function populateLinkFields(linkResponse, url) {
            return repoMapperService.mapRepositoryLinkFields(linkResponse, url);
        }

        function populateRepositoryHeaderFields(linkResponse) {
            return repoMapperService.mapRepositoryHeaderFields(linkResponse);
        }

        function populateBlogFields(linkResponse) {
            return repoMapperService.mapBlogFields(linkResponse);
        }

        function populateBlogResourceFields(resource) {
            return repoMapperService.mapBlogResourceFields(resource);
        }

        function populateResourcesFields(resource) {
            return repoMapperService.mapResourcesFields(resource);
        }

        function setUrlToCorrectCategory(category) {
            let url = $window.location.href;
            let lm = url.split('/').reverse()[1];
            let path = $window.location.pathname;
            if (lm !== category) {
                if (lm === '') {
                    lm = '//';
                    return $window.location.href = windowHelperService.getDomainName() + path.replace(lm, '/' + category + '/');
                }
                return $window.location.href = windowHelperService.getDomainName() + path.replace(lm, category);
            }
        }

        function search(pageNumber = 1, pageSize = 10, repoType, contentTypes, category, subcategory, startDate) {
            let params = buildSearchParams(pageNumber, pageSize, repoType, contentTypes, category, subcategory, startDate);
            return $http.post(config.searchUrl, params);
        }

        function getPageNumberFromUrl() {
            return $stateParams.rel || 1;
        }

        function getSelectorFromUrl() {
            return formatSelectorForApp($stateParams.sel || '');
        }

        function getDateFromUrl() {
            return formatSelectorForApp($stateParams.date || '');
        }

        function setPaginationUrlValue(value) {
            $location.search('rel', value);
        }

        function setSelectorUrlValue(selector) {
            selector = selector.toLowerCase().indexOf('sort-by') === -1 ? selector.toLowerCase() : '';
            $location.search('sel', selector);
        }

        function setDateUrlValue(date) {
            $location.search('date', date);
        }

        function formatSelectorForApp(value) {
            return value ? value.replace(/-_/g, '**').replace(/-/g, ' ').replace('**', '-') : '';
        }


        // Local helper functions
        function buildSearchParams(pageNumber, pageSize, repoType = '', contentTypes = '', category = '', subcategory = '', startDate) {
            contentTypes = contentTypes === '' ? contentTypes : contentTypes.split(',');

            let optionsObj = {
                'locale': `${ENV.locale}`,
                'page_num': parseInt(pageNumber),
                'page_size': parseInt(pageSize),
                'repository_type': repoType,
                'contenttype': {'select': 0, 'value': contentTypes},
                'category': {'select': 0, 'value': splitAndFormatWithConfigNumbers(category, buildCategoryName)},
                'subcategory': {'select': 0, 'value': splitAndFormatWithConfigNumbers(subcategory, buildSubCategoryName, repoType)},
                'order_by': config.defaultOrderBy
            };

            if (startDate) {
                let dateFrom = new Date(`01/01/${startDate}`).getTime(),
                    dateTo = new Date(`12/31/${startDate}`).getTime();
                optionsObj.publication_start = `\/Date(${dateFrom}+0300)\/`;
                optionsObj.publication_end = `\/Date(${dateTo}+0300)\/`;
            }

            return optionsObj;
        }

        function buildConfigCategoryName(name, array, config) {
            array = array || config[ENV.locale.split('-')[1]]
                || config['global'];
            if (array.length < 1) return name;
            for (let i = 0, length = array.length; i < length; i++) {
                let subCat = array[i],
                    splitByDoubleColon = subCat.split('::');
                if (splitByDoubleColon.length === 1) throw new Error('Array item is not in correct format');
                if (splitByDoubleColon[1] !== name) continue;
                name = subCat;
                break;
            }
            return name;
        }

        function removedUnusedCategories(categoriesArray, repoType) {
            let translatedCategories = [],
                locale = ENV.locale.split('-')[1];

            if (repoType === 'pr') translatedCategories = SUBCATCONFIG;

            if (translatedCategories[locale]) {
                let categoriesWithoutIds = _.map(translatedCategories[locale], function(category) {
                    return category.substr(4);
                });
                return _.intersection(categoriesArray, categoriesWithoutIds);
            }

            return false;
        }

        function splitAndFormatWithConfigNumbers(obj, callback, repoType) {
            obj = obj === '' ? obj : obj.split(',');
            let result = [];
            angular.forEach(obj, value => {
                result.push(callback(value, null, repoType));
            });
            return result;
        }

        function isPrSection() {
            let states = ['press-releases', 'press-releases.details', 'in-the-news', 'in-the-news.details', 'press-center', 'press-center.details', 'rss-feeds', 'rss-feeds.details', 'homepage'];
            return appHelperService.assertStateByName(states);
        }

        function isSmbSection() {
            let states = ['resources-category.details', 'resources-category', 'smb-resources-category.details', 'smb-resources-category'];
            return appHelperService.assertStateByName(states);
        }

        function isIscSection() {
            let states = ['b2c-resource-center.category', 'b2c-resource-center.category-details'];
            return appHelperService.assertStateByName(states);
        }

        function isAboutSection() {
            let states = ['policy-blog', 'policy-blog-category', 'policy-blog-category.details'];
            return appHelperService.assertStateByName(states);
        }

        function getDefaultYears() {
            return config.defaultYears;
        }

        function setTrackPageView() {
            if (angular.isFunction($window.trackPageView)) {
                $window.trackPageView($rootScope.kaspersky.pageName);  // search tracking requirement
            }
        }
    }
})();
