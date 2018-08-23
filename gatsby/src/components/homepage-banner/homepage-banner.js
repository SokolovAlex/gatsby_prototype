import React from 'react'

const HomeBannerTemplate = (data) => {
    const isMobile = true;
    return isMobile ? mobileBanner(data) : desktopBanner(data);
}

const desktopBanner = (data) => {
    const locale = 'ru';

    return (
    <header className="homepage-hero-header-desktop">
    <div className="hero-header-inner">
        <div className="hero-side-col business"
            style={{
                backgroundImage: 'url(/' + $ctrl.data.bsnsCategory.image + ')'
              }}
            >
            <div className="green-overlay business" data-test="homepage-banner--b2b"></div>
            <div className="side-cta-box business">
                <a href="">{ className.bsnsCategory.type }</a>
                <p>{ className.bsnsCategory.text1 }</p>
            </div>
            <div className="gray-overlay"></div>
            <div className="side-screen business" ng-show="$ctrl.onHoverBusiness">
                <h2 data-test="homepage-label--b2b">{ data.bsnsCategory.type}</h2>
                <h3>{data.bsnsCategory.text2}</h3>
                <ul className="cta-list">
                    { data.bsnsCategory.productType.map((type, locale, index)=> (
                             <li data-screen="mid-screen-business-{type.productClassIdentifier}">
                                <a className="cta" href="{type.url}" 
                                    data-test="homepage-cta--{type.productClassIdentifier}">
                                    { getLocale(type, locale, index) }
                                    <div class="cta-title business">
                                        <b>{type.typeShort}</b>
                                        <span>{type.employee}</span>
                                    </div>
                                    <span class="cta-green-text business">{type.buttonText}</span>
                                </a>
                            </li>
                        )
                    )}

                </ul>
				<a class="all-products" ng-if="$ctrl.locale === 'ja-jp'" ng-href="{{$ctrl.data.homeCategory.buttonUrl}}">
					{{$ctrl.data.homeCategory.buttonText}}
				</a>
                <p class="bottom-copy" ng-bind-html="$ctrl.data.bsnsCategory.text3"></p>
            </div>
        </div>
        <div class="hero-mid-col">
            <div class="border-left"></div>
            <div class="border-right"></div>
            <div class="top-nav" id="top-nav">
                <form ng-submit="$event.preventDefault()" class="top-nav-search-form">
                    <label for="homepage-header-search-input"
                           class="top-nav-search-btn font-icons icon-search"
                           ng-click="$ctrl.displaySearch()"></label>
                    <div class="search-input-wrap">
                        <input ng-model="$ctrl.searchBar" ng-model-options="{ debounce: 200 }"
                               ng-change="$ctrl.search()"
                               ng-keypress='$ctrl.goToSearchPage($event)'
                               type="text"
                               placeholder="{{$ctrl.data.searchText}}"
                               name="s"
                               id="homepage-header-search-input"
                               value=""
                               autocomplete="off">
                    </div>
                    <div ng-if="$ctrl.searchBar && $ctrl.autocompleteQ.length>1" class="search-bar">
                        <span class="font-icons icon-cancel" ng-click="$ctrl.displaySearch()"></span>
                        <ul>
                            <li ng-repeat="item in $ctrl.autocompleteQ | limitTo:9" ng-if="$index>0">
                                <div ng-click="$ctrl.searchBar = item; $ctrl.goToSearchPage()" ng-bind-html="$ctrl.autocompleteQhtml[$index] | html"></div>
                            </li>
                        </ul>
                    </div>
                </form>

                <ul class="top-nav-hideonsearch">
                    <li ng-repeat="topButton in $ctrl.data.topButtons" ng-class="{'top-nav-support': $index==1, 'top-nav-mykaspersky': $index==2}">
                        <a ng-if="topButton.isExternal != 'Yes'" ng-href="{{topButton.link}}" ng-class="{'top-nav-support': $index==1, 'top-nav-mykaspersky': $index==2}">
                            {{topButton.text}} <i ng-if="$index==2" class="font-icons icon-arrow-down"></i>
                        </a>
                        <a ng-if="topButton.isExternal == 'Yes'" ng-href="{{topButton.link}}" ng-class="{'top-nav-support': $index==1, 'top-nav-mykaspersky': $index==2}" target="_blank">
                            {{topButton.text}} <i ng-if="$index==2" class="font-icons icon-arrow-down"></i>
                        </a>
                        <ul ng-if="$index==2">
                            <li ng-repeat="myKaspersky in $ctrl.data.mykasperskyLinks">
                                <a ng-href="{{myKaspersky.link}}" target="_blank" ng-click="$index === 2 && $ctrl.data.myKasperskyBalancer[0] === 'True' ? $ctrl.openLRCDialog($event) : ''">
                                  <i ng-class="{'font-icons icon-devices': $index==0, 'font-icons icon-subscriptions': $index==1, 'font-icons icon-card': $index==2}"></i>
                                    {{myKaspersky.text}}
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="mid-screen-wrap">
                <div class="mid-screen mid-screen-intro active">
                    <img class="logo" ng-src="{{$ctrl.data.klLogo | addLocalRoot}}">
                    <h2 ng-bind-html="$ctrl.data.middleText"></h2>
                </div>
                <div ng-repeat="category in $ctrl.data.productCategories">
                    <div ng-repeat="type in category.productType" class="mid-screen" ng-class="{
                    'mid-screen-business-{{type.productClassIdentifier}}': $parent.$index==0,
                    'mid-screen-{{type.productClassIdentifier}}': $parent.$index==1}">
                        <img class="focus-img" ng-src="{{type.image | addLocalRoot}}">
                        <h2 class="business">{{type.typeFull}}</h2>
                        <p class="subtitle" ng-if="type.employee">({{type.employee}})</p>
                        <p class="desc" ng-if="type.text1">{{type.text1}}</p>
                    </div>
                </div>
                <div class="mid-small-logo">
                    <span></span>
                    <img ng-src="{{$ctrl.data.klLogo | addLocalRoot}}">
                </div>
            </div>
            <div class="select-product-type">
                <span class="left"></span>
                <span class="right"></span>
                <p>{{$ctrl.data.selectText}}</p>
            </div>
        </div>
        <div class="hero-side-col home"
             ng-style="{'background-image': 'url(/' + $ctrl.data.homeCategory.image + ')'}"
             ng-mouseenter="$ctrl.handleHomeHoverIn()"
             ng-mouseleave="$ctrl.handleHomeHoverOut()">
            <div class="green-overlay home" data-test="homepage-banner--b2c"></div>
            <div class="side-cta-box home">
                <a ng-href="">{{$ctrl.data.homeCategory.type}}</a>
                <p>{{$ctrl.data.homeCategory.text1}}</p>
            </div>
            <div class="gray-overlay"></div>
            <div class="side-screen home" ng-show="$ctrl.onHoverHome">
                <h2 data-test="homepage-label--b2c">{{$ctrl.data.homeCategory.type}}</h2>
                <h3>{{$ctrl.data.homeCategory.text2}}</h3>
                <ul class="cta-list">
                    <li ng-repeat="type in $ctrl.data.homeCategory.productType" data-screen="mid-screen-{{type.productClassIdentifier}}">
                        <a class="cta" ng-href="{{type.url}}" data-test="homepage-cta--{{type.productClassIdentifier}}">
							             <i ng-if="$ctrl.locale === 'ja-jp'"
                              class="font-icons business-{{type.productClassIdentifier}}"
							                ng-class="{'icon-{{type.productClassIdentifier}}-business': $index!=2, 'icon-{{type.productClassIdentifier}}': $index==2}"></i>
                            <i ng-if="$ctrl.locale !== 'ja-jp'" class="font-icons {{type.productClassIdentifier}}"
                               ng-class="{'icon-screen': $index==0, 'icon-laptop': $index==1,'icon-mobile':$index==2}"></i>
                            <div class="cta-title home">
                                <b>{{type.typeShort}}</b>
                                <span>{{type.employee}}</span>
                            </div>
                            <span class="cta-green-text business">{{type.buttonText}}</span>
                        </a>
                    </li>
                </ul>
                <a class="all-products" ng-if="$ctrl.locale !== 'ja-jp'" ng-href="{{$ctrl.data.homeCategory.buttonUrl}}">
                    {{$ctrl.data.homeCategory.buttonText}}
                </a>
                <p class="bottom-copy" ng-bind-html="$ctrl.data.homeCategory.text3"></p>
            </div>
        </div>
    </div>
</header>)
}

const bigFooter = (data) => {
   <header class="homepage-hero-header-mobile" ng-if="$ctrl.isMobile">
   <site-header></site-header>
   <div class="screen screen-intro" ng-style="{'background-image': 'url(' + $ctrl.data.mobileImage + ')'}">
       <div class="container">
           <h2 ng-bind-html="$ctrl.data.middleText"></h2>
           <span class="solutions-for">{{$ctrl.data.mobileText}}</span>
           <ul class="cta-list">
               <li ng-repeat="category in $ctrl.data.productCategories">
                   <a ng-class="{'cta business': $ctrl.getTabsOrder($index) === 0, 'cta home': $ctrl.getTabsOrder($index) === 1 }" href="#">
                       {{category.typeMobile}}
                   </a>
               </li>
           </ul>
       </div>
   </div>
   <div ng-repeat="category in $ctrl.data.productCategories" class="screen" ng-class="{'screen-business': $ctrl.getTabsOrder($index) === 0, 'screen-home': $ctrl.getTabsOrder($index) === 1}" ng-style="{'background-image': 'url(' + category.imageMobile + ')'}">
       <i class="back-btn"></i>
       <div class="container">
           <h2>{{category.type}}</h2>
           <h3>{{category.text2}}</h3>
           <ul class="cta-list">
               <li ng-repeat="type in category.productType" ng-class="{'business': $ctrl.getTabsOrder($parent.$index === 0), 'home': $ctrl.getTabsOrder($parent.$index) === 1}">
                   <a ng-class="{'cta': $ctrl.getTabsOrder($parent.$index) === 0, 'cta home': $ctrl.getTabsOrder($parent.$index) === 1}" href="{{type.url}}">
                                   <i ng-if="$ctrl.getTabsOrder($parent.$index) === 0" class="font-icons business-{{type.productClassIdentifier}}"
                                      ng-class="{'icon-{{type.productClassIdentifier}}-business': $index!=2, 'icon-{{type.productClassIdentifier}}': $index==2}"></i>
                                   <i ng-if="$ctrl.getTabsOrder($parent.$index) === 1" class="font-icons {{type.productClassIdentifier}}"
                                      ng-class="{'icon-screen': $index==0, 'icon-laptop': $index==1,'icon-mobile':$index==2}"></i>
                       <div class="cta-title" ng-class="{'cta-title business': $ctrl.getTabsOrder($parent.$index) === 0, 'cta-title home': $ctrl.getTabsOrder($parent.$index) === 1}">
                           <b>{{type.typeShort}}</b>
                           <span>{{type.employee}}</span>
                       </div>
                       <span ng-class="{'cta-green-text business': $ctrl.getTabsOrder($parent.$index) === 0, 'cta-green-text home': $ctrl.getTabsOrder($parent.$index) === 1}">{{type.buttonText}}</span>
                   </a>
               </li>
           </ul>
           <a ng-if="$ctrl.getTabsOrder($index) === 1" class="all-products" href="{{category.buttonUrl}}">
               {{category.buttonText}}
           </a>
           <p class="bottom-copy" ng-bind-html="category.text3">
               {{category.text3 | html}}
           </p>
       </div>
   </div>
</header>
}


const getLocale = (type, locale, index) => {
    if (locale !== 'ja-jp') {
        return (<i className="font-icons business-{type.productClassIdentifier} {'icon-{type.productClassIdentifier}-business': index!=2, 'icon-{type.productClassIdentifier}': $index==2}"></i>);
    }

    if (locale === 'ja-jp') {
        return (<i className="font-icons {type.productClassIdentifier} {'icon-screen': index==0, 'icon-laptop': index==1,'icon-mobile':index==2}"></i>)
    }
}
</div>

export default HomeBannerTemplate

//https://www.gatsbyjs.org/docs/querying-with-graphql/
export const query = graphql`
  fragment HomepageBannerFragment on FooterJson {
    title
    pubdate
    schemaName
    _fields {
      footerTop
      leftSetOfBlocks {
        title
        description
      }
      contactUsBlock {
        title
        description
      }
      socialBlockHeading
      socialIcons {
        link
        icon
      }
      copyright
      mobileLabel
      shortViewLinks {
        text
        link
      }
      rssLink {
        hide
      }
      countrySelector
      Body
      footerRightSideBlock {
        title
        description
      }
      copyright_smb
      copyright_vsb
      copyright_ent
    }
  }
`;
