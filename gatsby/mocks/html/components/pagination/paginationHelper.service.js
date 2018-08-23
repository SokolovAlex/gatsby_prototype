(function() {
    'use strict';
    angular.module('kappGlobal.paginationModule')
        .factory('paginationHelper', paginationHelper);

    function paginationHelper() {
        return {
            'getPaginationNumbering': getPaginationNumbering,
            'isCurrentPaginationNumber': isCurrentPaginationNumber
        };

        function getPaginationNumbering(count, totalItemsOnPage = 10) {
            var pageCount = angular.copy(count),
                paginationNumbers = [];
            while ((pageCount / totalItemsOnPage) > 0) {
                paginationNumbers.push((pageCount / totalItemsOnPage).toFixed());
                pageCount -= totalItemsOnPage;
            }
            return paginationNumbers.reverse();
        }

        function isCurrentPaginationNumber(currentPaginationNumber, number) {
            return currentPaginationNumber === +number;
        }

    }
})();
