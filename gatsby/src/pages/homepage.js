import React from 'react'
import { withIntl } from '../i18n';
import Layout from '../components/layout';
import footer from '../components/footer/footer';

// import siteBar from '../components/site-bar/site-bar'

const ThirdPage = ({data}) => (
    <Layout>
        { footer(data.footerJson) }
    </Layout>
)

export default withIntl(ThirdPage)

export const pageQuery = graphql`
  query FooterTemplate {
    footerJson {
        ...footerFragment
    }
  }
`
