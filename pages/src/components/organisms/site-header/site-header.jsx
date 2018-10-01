import React from 'react'
import { graphql } from 'gatsby';
import classSet from 'classnames';

import MainNav from '@mol/main-nav/main-nav';

import './site-header.scss';

class SiteHeader extends React.PureComponent {
    showMenuUtility = true;
    utm = 'utm'; // todo
    hideMainNav = false;

    constructor(props) {
      super(props);
      this.fields = this.props.fields;
      this.megaMenu = this.props.megaMenu;
      this.megaMenuBlog = this.props.megaMenuBlog;
    }

    getNavClass() {
        return classSet({
            'my-kaspersky': true,
            'dropdown': this.fields.rightMenuItem.menuItems.length > 0,
        });
    }

    navigateUserTo() {
        const link = this.fields.rightMenuItem.ctaLink;
        alert(link);
    }

    hideGetInTouchCta() {
        return true;
    }

    hasCrimeStopperLogo() {
        const states = ['home-security', 'product-kss'];
        const ENV = { locale: 'en-au' }; // todo
        const currentState = 'home-security'; // todo
        return states.indexOf(currentState) != -1 && ENV.locale === 'en-au';
    }
    render() {
        const fields = this.fields;
        return (
        <section>
            <header id="site-header" className="site-header">
                <div className="container">
                    <a className="menu-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </a>
    
                    <div className="site-title">
                        <a href="/" title="Kaspersky Lab" rel="home">
                            Kaspersky
                            <i className="kaspersky-logo"></i>
                        </a>
                    </div>
    
                    { this.hasCrimeStopperLogo() && fields.crimeStopperLogoUrl &&
                        <div className="crime-stopper-logo">
                            <figure>
                                <a href={ fields.crimeStopperLogoUrl }>
                                    <img src={ fields.crimeStopperLogo }
                                        alt={ fields.crimeStopperLogoAlt } />
                                </a>
                            </figure>
                            <h5>
                                <span>{ fields.crimeStopperLogoAlt }</span>
                            </h5>
                        </div>
                    }

                    { this.showMenuUtility &&
                        <ul className="menu-utility">
                            { /*<site-header-scroll-nav ng-if="$ctrl.scrollNavItems" items="$ctrl.scrollNavItems">
                            </site-header-scroll-nav> */}
                            
                            { fields.rightMenuItem && fields.rightMenuItem.cartLink &&
                                <li className="cart">
                                    <a href={ fields.rightMenuItem.cartLink }>
                                        <i className="font-icons icon-cart"></i>
                                    </a>
                                </li>
                            }

                            { /*<currency-selector></currency-selector>*/}

                            { fields.rightMenuItem && fields.rightMenuItem.menuText &&
                                <li className={ this.getNavClass() }>
                                    <a href={fields.rightMenuItem.menuLink}
                                        target="_blank">
                                        {fields.rightMenuItem.menuText}
                                    </a>

                                    { fields.rightMenuItem.menuItems.length > 0 &&
                                        <ul>
                                            { fields.rightMenuItem.menuItems.map((item, i) => (
                                                <li key={i}>
                                                    <a href={item.link} target={ item.isExternal === "Yes" ? '_blank' : '' }>
                                                        <i className={ `font-icons ${item.class}`}></i>
                                                        {item.text}
                                                    </a>
                                                </li>
                                            ))
                                            }
                                        </ul>
                                    }
                                </li>
                            }

                            { this.hideGetInTouchCta() &&
                                <li>
                                    <span className="red-item">
                                        { !this.utm ? (
                                            <a href=""
                                                onClick={this.navigateUserTo}
                                                className="button red">
                                            {fields.rightMenuItem.ctaText}</a>
                                        ) : (
                                            <a href={ `${fields.rightMenuItem.ctaLink || 'todo'}${this.utm}`}
                                                className="button red">
                                            { fields.rightMenuItem.ctaText }</a>
                                        )}
                                    </span>
                                </li>
                            }
                        </ul>
                    }
                    <div className="clear"></div>
                    { !this.hideMainNav &&
                        <MainNav
                            fields={fields}
                            megaMenu={this.megaMenu}
                            megaMenuBlog={this.megaMenuBlog}
                        />
                    }
                </div>
            </header>
            { /*<mobile-nav ng-if="$ctrl.isMobile"></mobile-nav>*/}
        </section>
        );
    };
}

export default SiteHeader

export const query = graphql`
  fragment siteHeaderMainNavFragment on SiteHeaderMainNavJson {
    _fields {
      mainNavItem {
        text
        link
        megaMenuItem
      }
      rightMenuItem {
        cartLink
        menuText
        menuLink
        menuItems {
          text
          link
          class
          isExternal
        }
      }
    }
  }
`;

export const megaMenuQuery = graphql`
  fragment homeSecurityMegaMenuFragment on HomeSecurityMegaMenuJson {
    _fields {
        menuType
        mega_menu_secondary_nav {
            secondary_nav_side_title
            secondary_nav_side_links {
                text
                link
                class
            }
        }
        product
        megaSideBlock2
    }
  }
`;

export const megaMenuBlogQuery = graphql`
  fragment homeSecurityMegaMenuBlogFragment on HomeSecurityMegaMenuBlogJson {
    _fields {
        menuType
        mega_menu_secondary_nav {
            secondary_nav_side_title
            secondary_nav_side_links {
                text
            }
        }
        customLinks{
            text
            link
            class
        }
    }
  }
`;


