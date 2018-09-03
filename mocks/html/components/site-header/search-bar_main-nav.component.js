(function() {
    angular.module('kappGlobal.siteHeader')
        .component('searchBar', {
            'templateUrl': '/apps/kapp/modules/_shared/components/site-header/templates/search-bar_main-nav.html',
            'controller': 'searchBarController'
        });
})();
