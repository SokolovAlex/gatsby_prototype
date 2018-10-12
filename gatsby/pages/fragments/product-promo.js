/* eslint-disable */
import { graphql } from 'gatsby';

export const query = graphql`
  fragment productPromoFragment on ProductPromoJson {
    _fields {
      bgImg
      class
      bgColor
      promoTitle
      promoDesc
      learnMore {
        text
        link
        class
      }
      freeTrial {
        text
        link
        class
      }
      product {
        fields {
          title
          prodKasperskyTitle
          prodMainTitle
          prodPageLink
          shortName
          description
          shortDesc
          fullSizeImage
        }
      }
    }
  }
`;