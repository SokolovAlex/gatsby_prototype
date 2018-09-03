(function() {
    'use strict';
    angular.module('kappGlobal.tabbedSectionBuyblock')
        .controller('regularSectionTabbedController', regularSectionTabbedController);

    function regularSectionTabbedController(directiveData, errorService, $timeout, $element) {
        let ctrl = this;
        ctrl.data = {};
        ctrl.selected = 0;
        ctrl.$onInit = activate;

        function activate() {
            getData();
        }

        ctrl.selectTab = (tabIndex) => {
            ctrl.selected = tabIndex;
        };

        function getData() {
            return directiveData.getByUrl('regular-section-tabbed').then(response => {
                ctrl.data = response.data.fields;
                runScripts();
            }, (rejection) => {
                errorService.warn(rejection);
            });
        }


        function runScripts() {
            $timeout(() => {
                //////////////////////////////////////////
                // Tabs desktop -> Dropdown mobile
                //////////////////////////////////////////

                // Get the name of currently active tab for mobile list
                let SelectedName = $('ul.tabs li.selected').text();
                $($element).find('.tab-nav').append('<div class="tab-label">' + SelectedName + '</div>');
                $($element).find('.tab-nav').click(function(e) {
                    e.stopPropagation();
                    $(this).toggleClass('active');
                });

                // Close it if user clicks outside
                $('body').click(function() {
                    $('.tab-nav').removeClass('active');
                });

                $($element).find('.tab-nav .tabs').click(function(e) {
                    e.stopPropagation();
                });

                // Check when item is clicked and update active tab label
                $($element).find('.tab-nav .tabs li').click(function(e) {
                    e.preventDefault();
                    let $this = $(this);
                    $this.parent().siblings().remove();
                    $this.closest('.tab-nav').append('<div class=tab-label></div>');
                    $this.closest('.tab-nav').find('.tab-label').text($(this).text());
                    $this.parent().parent().toggleClass('active');
                });

                //////////////////////////////////////////
                // Accordion

                $($element).find('.accordion-section > li > h4, .ent-accordion .accordion-section .accordion-title').click(function() {
                    $(this).parent().toggleClass('open');
                    $(this).siblings().slideToggle();
                });
            });
        }
    }
})();
