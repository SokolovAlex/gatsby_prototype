(function() {
    'use strict';
    angular.module('kappGlobal.siteHeader')
        .controller('searchBarController', searchBarController);

    function searchBarController($state, $element, directiveData, searchService, $document, $rootScope, $window, errorService) {
        let ctrl = this,
            mainNav = angular.element($document[0].querySelector('.main-nav')),
            searchField = $document[0].getElementById('search-main-nav');

        ctrl.active = false;
        ctrl.uiStrings = {};
        ctrl.searchTrigger = searchTrigger;
        ctrl.closeSearchTrigger = closeSearchTrigger;
        ctrl.search = search;
        ctrl.goToSearchPage = goToSearchPage;
        ctrl.$onInit = activate;
        ctrl.$onDestroy = handleDestruction;

        function activate() {
            getData();
        }

        function getData() {
            return directiveData.getLocal('general-translations').then((response) => {
                ctrl.uiStrings = response.data.fields;
            }, (rejection) => {
                errorService.warn(rejection);
            });
        }

        function search() {
            searchService.autocomplete(ctrl.searchBar, $element);
        }

        function goToSearchPage(e) {
            if (e && e.type === 'keypress') {
                let keyCode = e.which || e.keyCode;

                if (keyCode === 13) {
                    $state.go('search', {
                        'query': ctrl.searchBar
                    });
                }
            } else {
                $state.go('search', {
                    'query': ctrl.searchBar
                });
            }
        }

        function searchTrigger($event) {
            $event.stopPropagation();
            $event.preventDefault();
            ctrl.active = true;

            if (angular.isDefined(ctrl.searchBar) && ctrl.searchBar.length) {
                return goToSearchPage();
            }

            mainNav.toggleClass('search-active');
            searchField.focus();
        }

        function closeSearchTrigger($event) {
            $event.stopPropagation();
            $event.preventDefault();
            ctrl.active = false;
            ctrl.searchBar = '';
            mainNav.toggleClass('search-active');
        }

        // Autocomplete functionality starts here

        let autoOff = $rootScope.$on('autocompleteCall', (ev, val) => {
            let reg = new RegExp(val.d[0].Value[0], 'ig'),
                searchString = val.d[0].Value[0];
            ctrl.autocompleteQ = val.d[0].Value;
            ctrl.autocompleteQhtml = ctrl.autocompleteQ.map((item) => {
                return item.replace(reg, `<span>${searchString}</span>`);
            });
        });

        function handleDestruction() {
            autoOff();
            let autocompleteTag =  $window.document.querySelector('#autocompleteElement');
            if (autocompleteTag) $window.document.querySelector('head').removeChild(autocompleteTag);
        }
    }
})();
