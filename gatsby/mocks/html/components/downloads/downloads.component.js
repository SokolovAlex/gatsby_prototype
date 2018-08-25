(function() {
    'use strict';
    angular.module('kappGlobal.downloadBlock')
        .component('downloadBlock', {
            'bindings': {
                'productName': '@',
                'productInfo': '<',
                'productData': '<'
            },
            // 'templateUrl': '/apps/kapp/modules/_shared/components/downloads/templates/downloads.html',
            // The change is intentionally made to enable proper children (download-block) appearence detection
            'template': `<div class="product-item product-small">
    <header class="divider">
        <figure>
            <a ng-href="{{::$ctrl.productInfo.prodPageLink}}">
                <img ng-src="{{$ctrl.productInfo.fullSizeImage | addLocalRoot}}" alt="{{::$ctrl.productInfo.title}}" title="{{::$ctrl.productInfo.title}}" />
            </a>
        </figure>
        <div class="tagline"><p>{{::$ctrl.productInfo.summary}}</p></div>
        <h2 class="product-title">
            <a ng-href="{{::$ctrl.productInfo.prodPageLink}}">
                <span class="surtitle" ng-bind-html="$ctrl.productInfo.prodKasperskyTitle"></span>
                <span>{{::$ctrl.productInfo.prodMainTitle}}</span>
                <span class="subtitle">{{::$ctrl.productInfo.prodAddTitle || '&nbsp;'}}</span>
            </a>
        </h2>
    </header>
    <footer>
        <div class="desc">
            <p ng-bind-html="$ctrl.productInfo.shortDesc | html"></p>
            <bazaarvoice ng-if="$ctrl.productInfo.bvId" product-id="{{::$ctrl.productInfo.bvId}}"></bazaarvoice>
            <div class="blank reviews" ng-if="!$ctrl.productInfo.bvId"></div>
        </div>
    </footer>
        <div class="cta">
          <a ng-show="$ctrl.objProductData.showBuyButton == 'Yes'" ng-href="{{::$ctrl.productInfo.prodPageLink}}" target="{{::$ctrl.objProductData.buyButtonTarget}}"
  		   class="button {{::$ctrl.objProductData.buyButtonColour}} full-width">{{::$ctrl.productInfo.buyText || $ctrl.buyblockTranslations.buyText}}</a>
          <a ng-show="$ctrl.objProductData.showTrialButton == 'Yes'" ng-href="{{::$ctrl.productInfo.freeTrialLink}}" target="{{::$ctrl.objProductData.trialButtonTarget}}"
  		   class="button {{::$ctrl.objProductData.trialButtonColour}} full-width">{{::$ctrl.productInfo.freeTrialText}}</a>
          <a ng-show="$ctrl.objProductData.showUpdateButton == 'Yes'" ng-href="{{::$ctrl.productInfo.updateLink}}" target="{{::$ctrl.objProductData.updateButtonTarget}}"
  		   class="button {{::$ctrl.objProductData.updateButtonColour}} full-width">{{::$ctrl.productInfo.updateText}}</a>
          <a ng-repeat="badge in $ctrl.objProductData.badges" target="_blank" class="button" style="min-width:11em;padding:0!important;"
  		   ng-href="{{::badge.link}}"><img ng-src="{{::badge.img}}" alt="{{::badge.type}}" title="{{::badge.type}}" /></a>
       </div>
</div>`,
            'controller': 'downloadBlockController'
        });
})();