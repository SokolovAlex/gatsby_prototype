(function() {
    'use strict';
    var DEFAULT_ID = '__default';

    angular.module('kappGlobal.paginationModule')
        .filter('itemsPerPage', itemsPerPageFilter);

    itemsPerPageFilter.$inject = ['paginationService'];

    function itemsPerPageFilter(paginationService) {
        return function(collection, itemsPerPage, paginationId) {
            if (angular.isUndefined(paginationId)) paginationId = DEFAULT_ID;
            if (!paginationService.isRegistered(paginationId)) {
                throw 'pagination directive: the itemsPerPage id argument (id: ' + paginationId + ') does not match a registered pagination-id.';
            }
            var end;
            var start;
            if (angular.isObject(collection)) {
                itemsPerPage = parseInt(itemsPerPage) || 9999999999;
                if (paginationService.isAsyncMode(paginationId)) {
                    start = 0;
                } else {
                    start = (paginationService.getCurrentPage(paginationId) - 1) * itemsPerPage;
                }
                end = start + itemsPerPage;
                paginationService.setItemsPerPage(paginationId, itemsPerPage);

                if (collection instanceof Array) {
                    return collection.slice(start, end);
                } else {
                    var slicedObject = {};
                    angular.forEach(keys(collection).slice(start, end), function(key) {
                        slicedObject[key] = collection[key];
                    });
                    return slicedObject;
                }
            }
            return collection;
        };
    }

    function keys(obj) {
        if (!Object.keys) {
            var objKeys = [];
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    objKeys.push(i);
                }
            }
            return objKeys;
        } else {
            return Object.keys(obj);
        }
    }

})();
