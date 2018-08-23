(function() {
    'use strict';
    angular.module('kappGlobal.compareTable')
        .controller('compareTableController', compareTableController);

    function compareTableController($http, $element, $scope, directiveData, osDetectService, appHelperService, $rootScope, errorService, ENV, rootScopeHelper) {
        let ctrl = this;
        ctrl.bbData = {};
        ctrl.locale = ENV.locale;
        ctrl.setBuyblockValueByProduct = setBuyblockValueByProduct;
        ctrl.$onInit = activate;
        ctrl.checkForHomeSecurityState = checkForHomeSecurityState;
        ctrl.term = ctrl.locale === 'en-us' && appHelperService.stateIncludes('lrc-b2c') ? 2 : '';

        let ngRender = $rootScope.$on('ngRender', () => ctrl.data ? runScripts() : ngRender());

        rootScopeHelper.on($scope, 'buyblockBundleChange', handleBundleChange);

        function handleBundleChange(event, data) {
            ctrl.isBundleActive = data.isActive;
            ctrl.bundleProductName = data.productName;
        }

        function activate() {
            getData();
            setPromoline();
        }

        function setBuyblockValueByProduct(product, term, pack, autorenew) {
            ctrl.bbData[product] = {'term': term, 'pack': pack, 'autorenew': autorenew};
        }

        function checkForHomeSecurityState() {
            return appHelperService.assertStateByName(['home-security', 'home-product']);
        }

        function setPromoline() {
            directiveData
                .getLocal('buyblock/buyblock-texts')
                .then(response => {
                    ctrl.buyblockData = response.data.fields;
                }, (rejection) => {
                    errorService.warn(rejection);
                });
        }

        // Helper Methods
        function getData() {
            let featuredProducts = getFeaturedProducts();
            return directiveData.getByUrl(featuredProducts).then(response => {
                ctrl.featureSet = [];  //Contains objects of every unique feature
                if (!response.data.fields) return false;
                ctrl.header = response.data.fields;
                ctrl.data = response.data.fields.products;
                ctrl.featuresResponse = response.data.fields.featuresOverride;
                let uniqueFeaturedArray = [];
                let counter = 0;
                ctrl.data.forEach((item, index) => {
                    if (item.match(/\.json/)) {
                        return $http.get(item, {'cache': true}).then((response) => {
                            let featuresArray = Object.keys(response.data.fields.productFeatures).map(function(key) {
                                return response.data.fields.productFeatures[key];
                            });
                            ctrl.data[index] = response.data.fields;
                            for (let i in featuresArray) {
                                let featured = featuresArray[i];
                                if (angular.isDefined(featured.name) && featured.name !== '' && uniqueFeaturedArray.indexOf(featured.name) === -1) {
                                    uniqueFeaturedArray.push(featured.name);
                                    ctrl.featureSet.push(featured);
                                }
                            }

                            if (ctrl.featuresResponse && counter === 0) {
                                counter++;
                                return $http.get(ctrl.featuresResponse, {'cache': true}).then((response) => {
                                    ctrl.data.features = response.data.fields.Body;
                                }, (rejection) => {
                                    errorService.warn(rejection);
                                });
                            }
                        }, (rejection) => {
                            errorService.warn(rejection);
                        });
                    }
                });
            }, (rejection) => {
                errorService.warn(rejection);
                $element.hide();
            });
        }

        function getFeaturedProducts() {
            let osList = getOsList(),
                featuredProducts = osList[0].data,
                hash = appHelperService.getLocationHash(),
                osDetected = osDetectService.getCurrentOs(hash),
                osProducts = [];
            if (appHelperService.assertStateByName('home-security')) {
                if (osDetected.device !== 'undefined') {
                    osProducts = osList.filter(function(obj) {
                        return JSON.stringify(obj.os) === JSON.stringify(osDetected.device.type);
                    })[0];
                }
                if (osProducts) {
                    featuredProducts = osProducts.data;
                    return featuredProducts;
                }
            }
            return featuredProducts;
        }

        function getOsList() {
            return [{'os': 'pc', 'data': ctrl.resource || 'comparison-table'}, {'os': 'mac', 'data': 'comparison-table-mac'}, {
                'os': 'mobile', 'data': 'comparison-table-mobile'
            }];
        }

        function runScripts() {
            ngRender();
            angular.element(document).ready(function() {
                let mobileDefault;
                // Check if current page has comparison charts on it
                if ($element.find('.comparison-chart').length) {
                    // Loop through each comparison chart and set the default column
                    mobileDefault = $element.find('.comparison-chart').data('comparison-default');
                    $element.find('.comparison-chart .' + mobileDefault).addClass('currently-active');
                }
                $element.find('.comparison-nav li a').on('click', function(e) {
                    e.preventDefault();
                    let $this = $(this),
                        // Get navigation direction
                        direction = $this.data('comparison-nav-direction'),
                        // Get chart ID from the data attribute
                        chartID = $this.closest('.comparison-nav').data('comparison-chart'),
                        // Get comparison chart using that ID
                        $comparisonChart = $('.comparison-chart[data-comparison-chart="' + chartID + '"]'),
                        // Get comparison chart mobile nav
                        $comparisonChartNav = $('.comparison-nav[data-comparison-chart="' + chartID + '"]'),
                        // Get current column
                        $currentColumn = $comparisonChart.find('.row-header .column-product.currently-active'),
                        currentTitle = $currentColumn.find('h2.product-title a').clone(),
                        currentID = parseInt($currentColumn.data('column')),
                        nextID = parseInt(currentID + 1),
                        prevID = parseInt(currentID - 1),
                        nextNavID = parseInt(currentID + 2),
                        prevNavID = parseInt(currentID - 2);

                    // Remove featured style from the comparison chart mobile nav
                    $comparisonChartNav.find('li a.feat').removeClass('feat');
                    $comparisonChart.find('.row-header .column-product.column-' + ($scope.$ctrl.data.length + 1) + ' h2.product-title a').addClass('feat');

                    // Check direction and if prev/next column exists
                    if (direction === 'prev' && $comparisonChart.find('.column-product.column-' + prevID).length) {
                        $comparisonChart.find('.column-' + currentID).removeClass('currently-active');
                        $comparisonChart.find('.column-' + prevID).addClass('currently-active');
                        let newPrevTitle = $comparisonChart.find('.row-header .column-product.column-' + prevNavID + ' h2.product-title a').clone();

                        if ($comparisonChart.find('.row-header .column-product.column-' + prevNavID + ' h2.product-title a').hasClass('feat')) {
                            $comparisonChartNav.find('li.nav-prev a').addClass('feat');
                        }

                        if ($comparisonChart.find('.row-header .column-product.column-' + currentID + ' h2.product-title a').hasClass('feat')) {
                            $comparisonChartNav.find('li.nav-next a').addClass('feat');
                        }

                        $comparisonChartNav.find('li.nav-prev a').html(newPrevTitle.children());
                        $comparisonChartNav.find('li.nav-next a').html(currentTitle.children());

                    } else if (direction === 'next' && $comparisonChart.find('.column-product.column-' + nextID).length) {
                        $comparisonChart.find('.column-' + currentID).removeClass('currently-active');
                        $comparisonChart.find('.column-' + nextID).addClass('currently-active');
                        let newNextTitle = $comparisonChart.find('.row-header .column-product.column-' + nextNavID + ' h2.product-title a').clone();

                        if ($comparisonChart.find('.row-header .column-product.column-' + nextNavID + ' h2.product-title a').hasClass('feat')) {
                            $comparisonChartNav.find('li.nav-next a').addClass('feat');
                        }

                        if ($comparisonChart.find('.row-header .column-product.column-' + currentID + ' h2.product-title a').hasClass('feat')) {
                            $comparisonChartNav.find('li.nav-prev a').addClass('feat');
                        }
                        $comparisonChartNav.find('li.nav-next a').html(newNextTitle.children());
                        $comparisonChartNav.find('li.nav-prev a').html(currentTitle.children());
                    }
                });
            });
        }
    }
})();
