(function() {
    'use strict';
    angular.module('kappGlobal.featureSection')
        .controller('featureSectionSecController', featureSectionSecController);

    function featureSectionSecController(directiveData, ENV, $element, $rootScope, $scope, errorService) {
        let ctrl = this;
        ctrl.env = ENV.locale;
        ctrl.data = {};
        ctrl.$onInit = activate;

        function activate() {
            getData().then(() => {
                if ($rootScope.isReady) $scope.$applyAsync(runScripts);  // Ensure HTML is rendered
                else {
                    let ngRender = $rootScope.$on('ngRender', () => {
                        ngRender();
                        runScripts();
                    });
                }
            });
        }

        function getData() {
            if (ctrl.resource && ctrl.resource.match(/\//)) {
                ctrl.resource = ctrl.resource.replace(/cur-locale/, ctrl.env);
                return directiveData.get(ctrl.resource).then(response => {
                    ctrl.data = response.data.fields;
                }, handleRejection);
            } else {
                return directiveData.getByUrl(ctrl.resource || 'feature-section-sec').then((response) => {
                    ctrl.data = response.data.fields;
                }, handleRejection);
            }
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        function runScripts() {
            $element.find('.tab-title a').on('click', function(e) {
                let $this = $(this),
                    $parent = $this.parent(),
                    current = $parent.closest('.tabs-title-wrapper').attr('data-tab'),
                    tab;
                e.preventDefault();
                // Get the name of tab content that should be controled
                // Remove selected class from all tab titles and add it to the one just clicked
                $element.find('.tabs-title-wrapper[data-tab=\'' + current + '\'] .tab-title').removeClass('selected');
                $parent.addClass('selected');
                // Check clicked link href and show matching tab content
                tab = $this.attr('href');
                $element.find('.tab-content-wrapper[data-tab=\'' + current + '\'] .tab-content-single').not(tab).removeClass('tab-show');
                $(tab).addClass('tab-show');
            });
            let SelectedName = $element.find('.tab-nav').parent().find('ul.tabs li.selected a').first().text();
            $element.find('.tab-nav').append('<div class="tab-label">' + SelectedName + '</div>');
            $element.find('.tab-nav').click(function(e) {
                e.stopPropagation();
                $(this).toggleClass('active');
            });
            // Close it if user clicks outside
            $('body').click(function() {
                $element.find('.tab-nav').removeClass('active');
            });
            $element.find('.tab-nav .tabs').click(function(e) {
                e.stopPropagation();
            });
            // Check when item is clicked and update active tab label
            $element.find('.tab-nav .tabs li').click(function(e) {
                e.preventDefault();
                let $this = $(this);
                $this.parent().siblings().remove();
                $this.closest('.tab-nav').append('<div class=tab-label></div>');
                $this.closest('.tab-nav').find('.tab-label').text($(this).text());
                $this.parent().parent().toggleClass('active');
            });
            $element.find('.toggle-button').click(function(e) {
                let $this = $(this);
                e.preventDefault();

                $this.closest('.toggle-container').find('.toggle-content').slideToggle();
                $this.closest('.toggle-container').toggleClass('open');
            });
        }
    }
})();
