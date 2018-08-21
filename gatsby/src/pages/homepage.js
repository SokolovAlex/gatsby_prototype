import React from 'react'
import { FormattedMessage } from 'react-intl'
import { withIntl, Link } from '../i18n'
import HpLayout from '../components/homepage'

const ThirdPage = () => (
  <HpLayout>
    <h1>
      <FormattedMessage id="title2.subtitle" />
    </h1>
    <p>
      <FormattedMessage id="welcome2" />
    </p>
    <Link to="/">
      <FormattedMessage id="goback" />
    </Link>
  </HpLayout>
)

export default withIntl(ThirdPage)
