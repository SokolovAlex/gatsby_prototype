import React from 'react'
import Helmet from 'react-helmet'
import { injectIntl } from 'react-intl'
import Header from './header'

const Layout = ({ children, data, intl }) => (
  <div>
    <Helmet
      title={intl.formatMessage({ id: 'title2.subtitle' })}
      meta={[
        { name: 'description', content: intl.formatMessage({ id: 'welcome' }) },
        {
          name: 'keywords',
          content: 'gatsby, i18n, react-intl, multi language, localization',
        },
      ]}
    />
    <Header siteTitle={intl.formatMessage({ id: 'title2.subtitle' })} />
    <div
      style={{
        margin: '0 auto',
        backgroundColor: 'silver',
        maxWidth: 1060,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 100,
      }}
    >
      {children}
    </div>
  </div>
)

export default injectIntl(Layout)
