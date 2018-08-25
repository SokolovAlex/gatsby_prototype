import React from 'react'
const classSet = React.addons.classSet;

const HomeBannerTemplate = (data) => {
    const isMobile = true;
    return isMobile ? mobileBanner(data) : desktopBanner(data);
}

const desktopBanner = (data) => {
    const locale = 'ru';
    const searchBar = 'searchBar';

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
                <a href="">{ data.bsnsCategory.type }</a>
                <p>{ data.bsnsCategory.text1 }</p>
            </div>
            <div className="gray-overlay"></div>
            <div className="side-screen business" ng-show="$ctrl.onHoverBusiness">
                <h2 data-test="homepage-label--b2b">{ data.bsnsCategory.type}</h2>
                <h3>{data.bsnsCategory.text2}</h3>
                <ul className="cta-list">
                    { data.bsnsCategory.productType.map((type, locale, index)=> (
                             <li data-screen="mid-screen-business-{type.productClassIdentifier}">
                                <a className="cta" href={type.url}
                                    data-test="homepage-cta--{type.productClassIdentifier}">
                                    { getLocale(type, locale, index) }
                                    <div className="cta-title business">
                                        <b>{type.typeShort}</b>
                                        <span>{type.employee}</span>
                                    </div>
                                    <span className="cta-green-text business">{type.buttonText}</span>
                                </a>
                            </li>
                        )
                    )}

                </ul>
                { locale === 'ja-jp' &&
                    <a className="all-products"
                        href={data.homeCategory.buttonUrl}>
                        {data.homeCategory.buttonText}
                    </a>
                }
                <p className="bottom-copy">
                    { data.bsnsCategory.text3 }
                </p>
            </div>
        </div>
        <div className="hero-mid-col">
            <div className="border-left"></div>
            <div className="border-right"></div>
            <div className="top-nav" id="top-nav">
                <form className="top-nav-search-form">
                    <label for="homepage-header-search-input"
                           className="top-nav-search-btn font-icons icon-search">
                    </label>
                    <div className="search-input-wrap">
                        <input type="text"
                            placeholder={data.searchText}
                            id="homepage-header-search-input"
                            value={searchBar}
                            autocomplete="off"/>
                    </div>
                    <div className="search-bar">
                        <span className="font-icons icon-cancel"></span>
                        <ul>
                            <li>
                                <div>
                                    { "autocompleteQhtml" }
                                </div>
                            </li>
                        </ul>
                    </div>
                </form>

                <ul className="top-nav-hideonsearch">
                    { data.topButtons.map((topButton, i) =>
                        renderTopButton(topButton, i)
                    )}
                </ul>
            </div>
            <div className="mid-screen-wrap">
                <div className="mid-screen mid-screen-intro active">
                    <img className="logo" src={ data.klLogo }/>
                    <h2>{ data.middleText }</h2>
                </div>
                
                { data.productCategories.map((category, i) => (
                    <div>
                        { category.productType.map((type) => (
                            <div className={ getScreenClasses(type, i) }>
                                <img className="focus-img" src={type.image}/>
                                <h2 className="business">{type.typeFull}</h2>
                                { type.employee &&
                                    <p className="subtitle">({type.employee})</p>
                                }
                                { type.text1 &&
                                    <p className="desc">({type.text1})</p>
                                }
                            </div>
                        ))}
                    </div>
                ))}

                <div className="mid-small-logo">
                    <span></span>
                    <img src={ data.klLogo }/>
                </div>

            </div>
            <div className="select-product-type">
                <span className="left"></span>
                <span className="right"></span>
                <p>{ data.selectText }</p>
            </div>
        </div>
        <div className="hero-side-col home"
             style={{'background-image': 'url(/' + data.homeCategory.image + ')'}}>
            <div className="green-overlay home" data-test="homepage-banner--b2c"></div>
            <div className="side-cta-box home">
                <a href="">{data.homeCategory.type}</a>
                <p>{data.homeCategory.text1}</p>
            </div>
            <div className="gray-overlay"></div>
            <div className="side-screen home">
                <h2 data-test="homepage-label--b2c">{data.homeCategory.type}</h2>
                <h3>{data.homeCategory.text2}</h3>
                <ul className="cta-list">

                    { data.homeCategory.productType.map((type, i) => (

                    <li data-screen={`mid-screen-${type.productClassIdentifier}`}>
                        <a class="cta" href={type.url}
                        data-test={`homepage-cta--${type.productClassIdentifier}`}>
                            { locale === 'ja-jp' &&
                                <i className={getJpTypeClasses(type, i)}></i>
                            }
                            { locale !== 'ja-jp' &&
                                <i className={getTypeClasses(type, i)}></i>
                            }
                            <div class="cta-title home">
                                <b>{type.typeShort}</b>
                                <span>{type.employee}</span>
                            </div>
                            <span class="cta-green-text business">{type.buttonText}</span>
                        </a>
                    </li>
                    ))}

                </ul>
                { locale !== 'ja-jp' &&
                     <a className="all-products"
                        href={data.homeCategory.buttonUrl}>
                        {data.homeCategory.buttonText}
                    </a>
                }
                <p className="bottom-copy">
                    {data.homeCategory.text3}
                </p>
            </div>
        </div>
    </div>
</header>)
}

const getTypeClasses = (type, i) => {
    return classSet({
        'font-icons': true,
        [type.productClassIdentifier]: true,
        'icon-screen': i === 0,
        'icon-laptop': i === 1,
        'icon-mobile': i === 2,
    });
}

const getJpTypeClasses = (type, i) => {
    return classSet({
        'font-icons': true,
        [`business-${type.productClassIdentifier}`]: true,
        [`icon-${type.productClassIdentifier}-business`]: i !== 2,
        [`icon-${type.productClassIdentifier}`]: i === 2,
    });
}

const getScreenClasses = (type, i) => {
    return classSet({
        'mid-screen': true,
        [`mid-screen-business-${type.productClassIdentifier}`]: i == 0,
        [`mid-screen-${type.productClassIdentifier}`]: i == 1,
    });
}

const renderTopButton = (btn, i) => {
    const classes = classSet({
        'top-nav-support': i==1,
        'top-nav-mykaspersky': i==2
    });

    const linkClasses = classSet({
        'font-icons icon-devices': i==0,
        'font-icons icon-subscriptions': i==1,
        'font-icons icon-card': i==2
    });

    (<li className={classes}>
        { btn.isExternal != 'Yes' &&
            <a href={btn.link} className={classes}>
                {btn.text}
                { i === 2 &&
                    <i className="font-icons icon-arrow-down"></i>
                }
            </a>
        }

        { btn.isExternal != 'Yes' &&
            <a href={btn.link} className={classes} target="_blank">
                {btn.text}
                { i === 2 &&
                    <i className="font-icons icon-arrow-down"></i>
                }
            </a>
        }

         { i = 2 &&
            <ul>
                { data.mykasperskyLinks.map((link) =>
                    <li>
                        <a href={ link.link } target="_blank">
                        <i className={linkClasses}></i>
                            { link.text }
                        </a>
                    </li>
                )}
            </ul>
        }
    </li>)
}

const getLocale = (type, locale, index) => {
    if (locale !== 'ja-jp') {
        return (<i className="font-icons business-{type.productClassIdentifier} {'icon-{type.productClassIdentifier}-business': index!=2, 'icon-{type.productClassIdentifier}': $index==2}"></i>);
    }

    if (locale === 'ja-jp') {
        return (<i className="font-icons {type.productClassIdentifier} {'icon-screen': index==0, 'icon-laptop': index==1,'icon-mobile':index==2}"></i>)
    }
}

export default HomeBannerTemplate

//https://www.gatsbyjs.org/docs/querying-with-graphql/
export const query = graphql`
  fragment homepageBannerFragment on homepageJson {
    title
    pubdate
    _fields {
        klLogo
        searchText
        topButtons{
            text
            link
            class
            isExternal
        }
        mykasperskyLinks {
            text
            link
            isExternal
        }
        myKasperskyBalancer
        middleText
        mobileImage
        productCategories {
            type
            typeMobile
            image
            text1
            imageMobile
            text2
            text3
            productType {
            typeShort
            typeFull
            image
            employee
            text1
            url
            buttonText
            productClassIdentifier
            }
            buttonText
            buttonUrl
        }
        awardText
        awardsImages {
            image
            imageLink
            imageCaption
        }
        stats{
            statNumber
            protectedText
            byText
            textBlock
        }
        promotions {
            sectionClass
            backgroundImage
            textBlock
            ctaButton {
            text
            link
            class
            }
            backgroundImageForMobile
            backgroundImageForTablet
        }
        title
        description
        breadcrumbs {
            title
            link
        }
        aboutButtons {
            text
            link
            class
        }
        aboutQuoteImageMobile
        aboutQuoteImage
        aboutQuoteAuthorTitle
        aboutQuoteAuthor
        aboutQuoteText
        protectMobileButtons {
            text
            link
            class
        }
        protectMobileTextBlock
        protectMobileImage
        protectMobileTitle
        renewButtons {
            text
            link
            class
        }
        renewTextBlock
        renewTitle
        hmcImg
        hmcDesc
        hmcSubTitle
        hmcTitle
        linkedComponents{
            id
            title
            pubdate
            schemaName
        }
    }
}
`;
