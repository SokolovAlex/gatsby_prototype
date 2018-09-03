(function() {
    'use strict';
    angular.module('kappGlobal.rss')
        .component('rssFeeds', {
            'templateUrl': '/apps/kapp/modules/_shared/components/rss/templates/rss-feeds.html',
            'controller': 'rssFeedsController'
        });
})();
