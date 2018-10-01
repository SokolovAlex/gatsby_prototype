import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Provider } from 'react-redux'
import { StaticQuery, graphql } from 'gatsby'

import createStore from '../store/createStore'
import Header from './atoms/header/header'

const Layout = ({ children }) => {
  const store = createStore();
  return (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render = { data =>
      (
        <>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              { name: 'description', content: 'Sample' },
              { name: 'keywords', content: 'sample, something' },
            ]}
          >
            <html lang="en" />
          </Helmet>
          <Header siteTitle={data.site.siteMetadata.title} />
          <Provider store={store}>
            <div
              style={{
                margin: '0 auto',
                maxWidth: 960,
                padding: '0px 1.0875rem 1.45rem',
                paddingTop: 0,
              }}
            >
              {children}
            </div>
          </Provider>
        </>
      )}
  />
)}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
