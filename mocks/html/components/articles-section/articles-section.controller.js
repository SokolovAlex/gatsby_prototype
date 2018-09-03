(function() {
    'use strict';
    angular.module('kappGlobal.articlesSection')
        .controller('articlesSectionController', articlesSectionController);

    function articlesSectionController(directiveData, $sce, errorService) {
        let ctrl = this;
        ctrl.data = {};
        ctrl.$onInit = activate;
        ctrl.parseYoutubeUrl = parseYoutubeUrl;

        function activate() {
            getData();
        }

        function getData() {
            return directiveData.getByUrl(ctrl.resource || 'articles').then(response => {
                ctrl.data = response.data.fields;
                setupArticles();
            }, (rejection) => {
                errorService.warn(rejection);
            });
        }

        function setupArticles() {
            if (ctrl.data.block_sections && ctrl.data.block_sections[0].article_item_blocks) {
                ctrl.articles = ctrl.data.block_sections[0].article_item_blocks;
            }
        }

        function parseYoutubeUrl(url) {
            return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + url);
        }
    }
})();
