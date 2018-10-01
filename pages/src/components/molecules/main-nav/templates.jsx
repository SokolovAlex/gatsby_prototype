import React from 'react'
import classSet from 'classnames';

const listB2CTemplate = (megaNav, rootClass) => {
    const hasCustomSideBlok = megaNav.hasCustomHtmlSideBlock && megaNav.hasCustomHtmlSideBlock[0];
    return (
        <ul className={ rootClass }>
            <li className="first">
                <ul className="featured featured-b2c section-col-l-3 no-gutter">
                    { megaNav.productData && megaNav.productData.map((productData, i) => {
                        const product = productData.fields;
                        return (
                            <li key={i}
                                className={ classSet({'promo-menu-item': product.promoM == 'True'}) }>
                                { product.promoM == 'True' && this.generalData.new &&
                                    <span className="label red">{ this.generalData.new }</span>
                                }
                                <a href={product.prodPageLink}>
                                    <span className="surtitle">
                                        { product.prodKasperskyTitle }
                                    </span>
                                    {product.prodMainTitle}
                                    <span className="subtitle">{product.prodAddTitle}</span>
                                </a>

                                <div className="desc">
                                    <p>{ product.overrideProdDescNav || product.shortDesc }</p>
                                    <p><a href={ product.learnMoreLink }>{ product.learnMoreText }</a> / <a href={product.freeTrialLink}>{product.freeTrialText}</a></p>
                                </div>
                            </li>
                            );
                        })
                    }
                </ul>
            </li>
            { hasCustomSideBlok !== 'true' &&
                <li>
                    <ul className="regular">
                        { megaNav.mega_menu_secondary_nav.secondary_nav_side_title &&
                            <li className="title">
                                <h6>{ megaNav.mega_menu_secondary_nav.secondary_nav_side_title}</h6>
                                { megaNav.mega_menu_secondary_nav.secondary_nav_side_subtitle &&
                                    <p>
                                        {item.megaMenuItem.mega_menu_secondary_nav.secondary_nav_side_subtitle}
                                    </p>
                                }
                            </li>
                        }
                        { megaNav.mega_menu_secondary_nav.secondary_nav_side_links.map((item, i) => (
                            <li key={i}>
                                <a href={item.link}>
                                    {item.text}
                                    { item.new && <small className="tag">{item.new}</small> }
                                </a>
                            </li>
                        ))
                        }
                    </ul>
                </li>
            }
            { hasCustomSideBlok === 'true' &&
                <li>{ item.megaMenuItem.megaSideBlock1 }</li>
            }
        </ul>
    );
}

const listResTemplate = (megaNav, rootClass) => {
    return (
        <ul className={ rootClass }>
            { megaNav.customLinks && megaNav.customLinks.map((item, i) => (
                <li key={i}>
                    <a href={item.link} 
                        target={ item.isExternal === "Yes" ? '_blank' : '' }>
                        {item.text}
                    </a>
                </li>
            ))
            }
        </ul>
    );
}

export { listB2CTemplate, listResTemplate };