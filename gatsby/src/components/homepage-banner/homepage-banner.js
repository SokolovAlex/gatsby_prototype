import React from 'react'
// const classSet = React.addons.classSet;
const classSet = require('classnames');

const HomeBannerTemplate = (data) => {
    if (!data) {
        return;
    }
    const isMobile = true;
    return isMobile ? mobileBanner(data) : desktopBanner(data);
}

const desktopBanner = (data) => {
    const locale = 'ru';
    const searchBar = 'searchBar';
    const fields = data._fields;

    return (
    <header className="homepage-hero-header-desktop">
    <div className="hero-header-inner">
        <div className="hero-side-col business"
            style={{
                backgroundImage: 'url(/' + data.bsnsCategory.image + ')'
              }}
            >
            <div className="green-overlay business" data-test="homepage-banner--b2b"></div>
            <div className="side-cta-box business">
                <a href="">{ data.bsnsCategory.type }</a>
                <p>{ data.bsnsCategory.text1 }</p>
            </div>
            <div className="gray-overlay"></div>
            <div className="side-screen business">
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
                    ))}

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
                            <div className={ getMidScreenClasses(type, i) }>
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
             styles={{'background-image': 'url(/' + data.homeCategory.image + ')'}}>
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

const mobileBanner = (data) => {
    const fields = data._fields;

    return (
    <header className="homepage-hero-header-mobile">
        <site-header>!</site-header>
        <div className="screen screen-intro" 
            styles={{'background-image': 'url(' + data.mobileImage + ')'}}>
            <div className="container">
                <h2>{data.middleText}</h2>
                <span className="solutions-for">{data.mobileText}</span>

                <ul className="cta-list">
                     { fields.productCategories.map((category, i) => (
                        <li>
                            <a className={ getCtaClasses(caegory, i) } href="#">
                                {category.typeMobile}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        { fields.productCategories.map((category, i) => (
            <div className={getScreenClasses(category, i)} styles={{'background-image': 'url(' + category.imageMobile + ')'}}>
                <i className="back-btn"></i>
                <div className="container">
                    <h2>{category.type}</h2>
                    <h3>{category.text2}</h3>
                    <ul className="cta-list">

                        { category.productType.map((type) => (
                            <li className={ TypeClasses(i) }>
                                <a className={ TypeLinkClasses(i)} href={type.url}>
                                    { getTabsOrder(i) === 0 &&
                                        <i className={ getJpTypeClasses(type, i)}></i>
                                    }
                                    { getTabsOrder(i) === 1 &&
                                        <i className={ getTypeClasses(type, i)}></i>
                                    }
                                    <div className={TitleClasses(i)}>
                                        <b>{type.typeShort}</b>
                                        <span>{type.employee}</span>
                                    </div>
                                    <span className={btnClasses(i)}>{type.buttonText}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                    { getTabsOrder(i) === 1 &&
                        <a className="all-products" href={category.buttonUrl}>
                            {category.buttonText}
                        </a>
                    }
                    <p className="bottom-copy">
                        { category.text3 }
                    </p>
                </div>
            </div>
        ))}
    </header>);
}

const btnClasses = (i) => {
    return classSet({
        'cta-green-text': true,
        'business': getTabsOrder(i) === 0,
        'home': getTabsOrder(i) === 1
    });
}

const TitleClasses = (i) => {
    return classSet({
        'cta-title': true,
        'cta-title busines': getTabsOrder(i) === 0,
        'cta-title home': getTabsOrder(i) === 1
    });
}

const TypeLinkClasses = (i) => {
    return classSet({
        cta: getTabsOrder(i) === 0,
        'cta home': getTabsOrder(i) === 1
    });
}

const TypeClasses = (i) => {
    return classSet({
        business: getTabsOrder(i) === 0,
        home: getTabsOrder(i) === 1
    });
}

const getScreenClasses = (data, i) => {
    return classSet({
        screen: true,
        'screen-business': getTabsOrder($index) === 0,
        'screen-home': getTabsOrder(i) === 1
    });
}

const getCtaClasses = (data, i) => {
    return classSet({
        'cta business': getTabsOrder(i) === 0,
        'cta home': getTabsOrder(i) === 1 
    });
}

function getTabsOrder(order) {
    if (ctrl.locale === 'ja-jp') return Math.abs(order - 1);
    return order;
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

const getMidScreenClasses = (type, i) => {
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

// https://www.gatsbyjs.org/docs/querying-with-graphql/
// export const query = graphql`
//   fragment homepageBannerFragment on HomepageBanner {
//     title
//     pubdate
//     _fields {
//         klLogo
//         searchText
//         topButtons{
//             text
//             link
//             class
//             isExternal
//         }
//         mykasperskyLinks {
//             text
//             link
//             isExternal
//         }
//         myKasperskyBalancer
//         middleText
//         mobileImage
//         productCategories {
//             type
//             typeMobile
//             image
//             text1
//             imageMobile
//             text2
//             text3
//             productType {
//             typeShort
//             typeFull
//             image
//             employee
//             text1
//             url
//             buttonText
//             productClassIdentifier
//             }
//             buttonText
//             buttonUrl
//         }
//         awardText
//         awardsImages {
//             image
//             imageLink
//             imageCaption
//         }
//         stats{
//             statNumber
//             protectedText
//             byText
//             textBlock
//         }
//         promotions {
//             sectionClass
//             backgroundImage
//             textBlock
//             ctaButton {
//             text
//             link
//             class
//             }
//             backgroundImageForMobile
//             backgroundImageForTablet
//         }
//         title
//         description
//         breadcrumbs {
//             title
//             link
//         }
//         aboutButtons {
//             text
//             link
//             class
//         }
//         aboutQuoteImageMobile
//         aboutQuoteImage
//         aboutQuoteAuthorTitle
//         aboutQuoteAuthor
//         aboutQuoteText
//         protectMobileButtons {
//             text
//             link
//             class
//         }
//         protectMobileTextBlock
//         protectMobileImage
//         protectMobileTitle
//         renewButtons {
//             text
//             link
//             class
//         }
//         renewTextBlock
//         renewTitle
//         hmcImg
//         hmcDesc
//         hmcSubTitle
//         hmcTitle
//         linkedComponents{
//             id
//             title
//             pubdate
//             schemaName
//         }
//     }
// }
// `;
