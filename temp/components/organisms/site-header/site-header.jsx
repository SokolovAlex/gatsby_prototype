/* eslint-disable */
import React from 'react';
import classSet from 'classnames';

import MainNav from '@mol/main-nav/main-nav';

import './site-header.scss';

class SiteHeader extends React.PureComponent {
  getNavClass() {
    const rightMenuItem = this.props.fields.rightMenuItem;
    return classSet({
      'my-kaspersky': true,
      dropdown: rightMenuItem && rightMenuItem.menuItems.length > 0,
    });
  }

  navigateUserTo() {
    const rightMenuItem = this.props.fields.rightMenuItem;
    const link = rightMenuItem && rightMenuItem.ctaLink;
  }

  hasCrimeStopperLogo() {
    const states = ['home-security', 'product-kss'];
    const ENV = { locale: 'en-au' }; // todo
    const currentState = 'home-security'; // todo
    return states.indexOf(currentState) !== -1 && ENV.locale === 'en-au';
  }

  render() {
    const { fields, megaMenu, megaMenuBlog } = this.props;
    return (
      <section>
        <header id="site-header" className="site-header">
          <div className="container">
            <a className="menu-toggle">
              <span />
              <span />
              <span />
            </a>

            <div className="site-title">
              <a href="/" title="Kaspersky Lab" rel="home">
                Kaspersky
                <i className="kaspersky-logo" />
              </a>
            </div>

            {this.hasCrimeStopperLogo() &&
              fields.crimeStopperLogoUrl && (
                <div className="crime-stopper-logo">
                  <figure>
                    <a href={fields.crimeStopperLogoUrl}>
                      <img src={fields.crimeStopperLogo} alt={fields.crimeStopperLogoAlt} />
                    </a>
                  </figure>
                  <h5>
                    <span>{fields.crimeStopperLogoAlt}</span>
                  </h5>
                </div>
              )}

            {true && (
              <ul className="menu-utility">
                {/* <site-header-scroll-nav ng-if="$ctrl.scrollNavItems" items="$ctrl.scrollNavItems">
                            </site-header-scroll-nav> */}

                {fields.rightMenuItem &&
                  fields.rightMenuItem.cartLink && (
                    <li className="cart">
                      <a href={fields.rightMenuItem.cartLink}>
                        <i className="font-icons icon-cart" />
                      </a>
                    </li>
                  )}

                {/* <currency-selector></currency-selector> */}

                {fields.rightMenuItem &&
                  fields.rightMenuItem.menuText && (
                    <li className={this.getNavClass()}>
                      <a href={fields.rightMenuItem.menuLink} target="_blank">
                        >{fields.rightMenuItem.menuText}
                      </a>

                      {fields.rightMenuItem.menuItems.length > 0 && (
                        <ul>
                          {fields.rightMenuItem.menuItems.map((item, i) => (
                            <li key={i}>
                              <a href={item.link} target={item.isExternal === 'Yes' ? '_blank' : ''}>
                                <i className={`font-icons ${item.class}`} />
                                {item.text}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  )}
              </ul>
            )}
            <div className="clear" />
            {true && <MainNav fields={fields} />}
          </div>
        </header>
        {/* <mobile-nav ng-if="$ctrl.isMobile"></mobile-nav> */}
      </section>
    );
  }
}

export default SiteHeader;
