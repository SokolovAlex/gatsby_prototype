import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import createStore from '~/store/createStore';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

// import '../../../styles/_critical.scss';

class Layout extends React.PureComponent {
  render() {
    const { title, description, children } = this.props;
    return (
      <StaticQuery
        query={graphql`
          query Layout {
            localizationFooterJson {
              ...localizationFooterFragment
            }
            localizationFooterCountrySelectorJson {
              ...localizationFooterCountrySelectorFragment
            }
          }
        `}
        render={(data) => (
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
                <Header />

                {children}

                <Footer
                  /* eslint-disable-next-line no-underscore-dangle */
                  data={data.localizationFooterJson._fields}
                  /* eslint-disable-next-line no-underscore-dangle */
                  selectorData={data.localizationFooterCountrySelectorJson._fields}
                />
              </div>
            </Provider>
          </React.Fragment>
        )}
      />
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
