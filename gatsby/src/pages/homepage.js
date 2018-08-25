import React from 'react'
import { withIntl } from '../i18n';
import Layout from '../components/layout';
import siteBar from '../components/site-bar/site-bar';
import homepageBanner from '../components/homepage-banner/homepage-banner';
import footer from '../components/footer/footer';

// import siteBar from '../components/site-bar/site-bar'

const ThirdPage = ({data}) => (
    <Layout>
        { siteBar(data) }
        { homepageBanner(data.homepageBannerJson) }

        <div class="main no-bg">
            {/* <promo-section resource="promo-above-hmc"></promo-section>
            <renew-and-about></renew-and-about>
            <promo-section resource="promo-above-stats"></promo-section>
            <malware-stats></malware-stats>
            <promo-section resource="promo-above-footer"></promo-section> */}
        </div>

        { footer(data.footerJson) }
    </Layout>
)

export default withIntl(ThirdPage)

export const pageQuery = graphql`
  query FooterTemplate {
    footerJson {
        ...footerFragment
    }
    homepageBannerJson {
        ...homepageBannerFragment
    }
  }
`
