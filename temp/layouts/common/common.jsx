import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { StaticQuery, graphql } from 'gatsby';

import { fill } from '@services/translations';

import SiteTop from '@mol/site-top/site-top';
import CookieBanner from '@mol/cookie-banner/cookie-banner';
import SiteHeader from '@org/site-header/site-header';
import { Footer } from '@org/Footer/Footer';

import createStore from '~/store/createStore';

import './common.scss';

class Layout extends React.PureComponent {
  showBanner = true;

  onAcceptBanner() {
    this.showBanner = false;
    this.forceUpdate();
  }

  render() {
    const { title, description, children } = this.props;
    return (
      <StaticQuery
        query={graphql`
          query CommonLayout {
            sitetopJson {
              ...sitetopFragment
            }
            homeSecurityMainNavMainNavJson {
              ...homeSecurityMainNavMainNavFragment
            }
            localizationFooterJson {
              ...localizationFooterFragment
            }
            localizationFooterCountrySelectorJson {
              ...localizationFooterCountrySelectorFragment
            }
            generalTranslationsJson {
              ...generalTranslationsFragment
            }
          }
        `}
        render={(data) => {
          // eslint-disable-next-line no-underscore-dangle
          const translations = data.generalTranslationsJson._fields;
          fill(translations);
          return (
            <React.Fragment>
              <Helmet
                title={title}
                meta={[{ name: 'description', content: description }, { name: 'keywords', content: 'antivirus' }]}>
                <html lang="en" />
                <script src="//www.googletagmanager.com/gtm.js?id=GTM-WZ7LJ3" async />
                <script src="//media.kaspersky.com/tracking/omniture/s_code_single_suite.js" async />
                <script src="//service.maxymiser.net/cdn/kasperskyFR/js/mmcore.js" />
              </Helmet>
              <Provider store={createStore()}>
                <div>
                  {/* eslint-disable-next-line no-underscore-dangle */}
                  <SiteTop fields={data.sitetopJson._fields} />
                  {/* eslint-disable-next-line no-underscore-dangle */}
                  <SiteHeader fields={data.homeSecurityMainNavMainNavJson._fields} />

                  {children}

                  <Footer
                    /* eslint-disable-next-line no-underscore-dangle */
                    data={data.localizationFooterJson._fields}
                    /* eslint-disable-next-line no-underscore-dangle */
                    selectorData={data.localizationFooterCountrySelectorJson._fields}
                  />
                  {this.showBanner && (
                    <CookieBanner
                      desc={translations.cookieDesc}
                      btnText={translations.cookieBtn}
                      onAcceptBanner={() => this.onAcceptBanner()}
                    />
                  )}
                </div>
              </Provider>
            </React.Fragment>
          );
        }}
      />
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
