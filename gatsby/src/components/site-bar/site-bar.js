import React from 'react'

const FooterTemplate = (data) => {
    const isCompact = true;
    return isCompact ? compactFooter(data) : bigFooter(data);
}

const compactFooter = (data) => {
    const now = new Date();
    const year = now.getFullYear();
    const fields = data._fields;

    return (<section id="site-footer" className="site-footer compact">
            <div className="container">
                <div>
                    { data.footerTop }
                </div>

            <div className="footer-links">
                <footer>
                    <links>
                        <content>
                            <p className="copy">
                                { year }
                                { getCopyLink(data) }
                            </p>
                        </content>
                    </links>
                </footer>
                <ul className="featured-pages">
                    { fields.shortViewLinks.map(link => (
                            <li>
                                <a href={link.link}>{ link.text }</a>
                            </li>
                        ))}
                    <li>
                        <a href={fields.rssLink.link}>
                            { fields.rssLink.text || 'RSS Feeds'}
                        </a>
                    </li>
                </ul>
            </div>
            <div className="footer-secondary">
                <div className="social-links">
                    {
                        fields.socialIcons.map(item => (
                            <a href={item.link} target="_blank" className="social">
                                <i className="font-icons {item.icon}"></i>
                            </a>
                        ))
                    }
                </div>
                <form action="#">
                    <p className="mobile-label">{fields.mobileLabel}</p>
                    <div className="country-selector-button font-icons">
                        <p>$SETUP.country</p>
                        <span className="arrow"></span>
                    </div>
                </form>
            </div>
        </div>
    </section>)
}

const bigFooter = (data) => {
    return (
    <section className="footer-selector">
        <div className="container">
            <a href="#" class="close-selector"><i className="font-icons icon-cancel"></i></a>
            <div className="section-col-l-4 reset-l country-list">
                { fields.Body }
            </div>
        </div>
    </section>
    )
}

const getCopyLink = (data) => {
    const isB2B = true;
    return isB2B
        ? <span>{ data.copyright }</span>
        : <span>{ data.fields.copyright }</span>;
}

export default FooterTemplate

//https://www.gatsbyjs.org/docs/querying-with-graphql/
export const query = graphql`
  fragment sitebarFragment on FooterJson {
    title
    pubdate
    schemaName
    _fields {
      footerTop
      leftSetOfBlocks {
        title
        description
      }
      contactUsBlock {
        title
        description
      }
      socialBlockHeading
      socialIcons {
        link
        icon
      }
      copyright
      mobileLabel
      shortViewLinks {
        text
        link
      }
      rssLink {
        hide
      }
      countrySelector
      Body
      footerRightSideBlock {
        title
        description
      }
      copyright_smb
      copyright_vsb
      copyright_ent
    }
  }
`;
