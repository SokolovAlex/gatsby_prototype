import { graphql } from 'gatsby';

export const query = graphql`
  fragment localizationFooterFragment on LocalizationFooterJson {
    _fields {
      leftSetOfBlocks {
        title
        description
      }
      contactUsBlock {
        title
        description
      }
      footerRightSideBlock {
        title
        description
      }
      socialBlockHeading
      socialIcons {
        link
        icon
      }
      copyright
      copyright_smb
      copyright_vsb
      copyright_ent
      shortViewLinks {
        text
        link
      }
      rssLink {
        hide
      }
    }
  }
`;
