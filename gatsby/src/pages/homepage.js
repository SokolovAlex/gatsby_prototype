import React from 'react'
import { withIntl } from '../i18n';
import Layout from '../components/layout';
import siteBar from '../components/site-bar/site-bar';
import homepageBanner from '../components/homepage-banner/homepage-banner';
import renewAndAbout from '../components/renew-and-about/renew-and-about';
import footer from '../components/footer/footer';

// import siteBar from '../components/site-bar/site-bar'

const HomePage = ({data}) => {
    console.log(data);
    return (
        <Layout>
            { siteBar(data) }
            { homepageBanner(data.homepageBannerJson) }

            <div className="main no-bg">
                { renewAndAbout(data.homepageRenewAndAboutJson) }
                {/*<renew-and-about></renew-and-about>
                <promo-section resource="promo-above-stats"></promo-section>
                <malware-stats></malware-stats>
                <promo-section resource="promo-above-footer"></promo-section> */}
            </div>

            { footer(data.homepageFooterJson) }
        </Layout>
    );
}

export default withIntl(HomePage)

export const pageQuery = graphql`
  query PageTemplate {
    homepageFooterJson {
        ...footerFragment
    }
    homepageBannerJson {
        ...homepageBannerFragment
    }
    homepageRenewAndAboutJson {
        ...renewAndAboutFragment
    }
  }
`