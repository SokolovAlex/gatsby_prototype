import React from 'react'

const renewAndAbout = (data) => {
    const fields = data._fields;

    return (
    <section class="homepage-main" v-if="data">
        <section class="hmc-section variant-2 no-margin">
            <div class="container">
                <div class="row">
                    <div class="hmc-desc col-l-5">
                        <h4>{fields.hmcTitle}</h4>
                        <div class="row">
                            <div class="col-l-5">
                                <img class="thumbnail" 
                                    src="`/${fields.hmcImg}`" alt="{fields.hmcImg}"/>
                            </div>
                            <div class="col-l-7">
                                <h5 class="text-green">{fields.hmcSubTitle}</h5>
                                <p>{fields.hmcDesc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <div class="renew-license mobile">
            <div class="container">
                <h4>{fields.protectMobileTitle}</h4>
                <img class="photo" src="`/${fields.protectMobileImage}`"/>
                <div>{ fields.protectMobileTextBlock }</div>
                {
                    fields.protectMobileButtons.map((protectMobileButton, i) => (
                        <a href={protectMobileButton.link}
                           key={i}
                           target="_blank"
                           className={protectMobileButton.class}>
                           { protectMobileButton.text }
                        </a>
                    ))
                }
            </div>
        </div>
    </section>
    )
}

export default renewAndAbout;

export const query = graphql`
  fragment renewAndAboutFragment on HomepageRenewAndAboutJson {
    _fields {
      hmcTitle
      hmcSubTitle
      hmcDesc
      hmcImg
      renewTitle
      renewTextBlock
      renewButtons{
        text
        link
        class
      }
      protectMobileTitle
      protectMobileImage
      protectMobileTextBlock
      aboutButtons {
        text
        link
        class
      }
      aboutQuoteImageMobile
      aboutQuoteImage
      aboutQuoteAuthorTitle
      aboutQuoteAuthor
      aboutQuoteText
      protectMobileButtons {
        text
        link
        class
      }
    }
  }
`;
