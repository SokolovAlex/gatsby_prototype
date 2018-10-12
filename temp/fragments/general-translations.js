import { graphql } from 'gatsby';

export const query = graphql`
  fragment generalTranslationsFragment on GeneralTranslationsJson {
    _fields {
      pageTitleAppendix
      bvLocReviews
      bvLocReviewsFor
      bvLocRating
      bvLocSortedBy
      bvLocDate
      bvLocBy
      bvLocFrom
      socialShareLikeThis
      socialShareRecommendText
      XSPMSP
      XSPMSP_BESTBUY
      ECOMM
      ECOMM_MYKASPERSKY
      NO_PRICING_OPTIONS
      KSC_FAM_UNKNOWN
      KFA_ACTIVE
      searchResultsText
      searchTypeEnterText
      searchPressEnterText
      searchResultsForText
      searchOfText
      searchRelevanceText
      lrcAnchorText
      lrcUsingText
      lrcFieldCannotBeEmpty
      lrcInvalidFormat
      lrcInvalidSerial
      dlDocsText
      dlApplicationControlPluginsText
      dlAdditionalDistributives
      dlReleaseNotesText
      dlLatestVersionsText
      dlTrialText
      dlForText
      prSortBy
      prDate
      prReadMore
      readMore
      filterCertificates
      certificatesAllTypes
      certificatesAllDates
      certificatesTotal
      resouceNotAvailable
      relatedArticles
      latestArticles
      featuredArticles
      cookieDesc
      cookieBtn
    }
  }
`;
