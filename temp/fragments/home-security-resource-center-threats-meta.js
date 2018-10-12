import { graphql } from 'gatsby';

export const query = graphql`
  fragment homeSecurityResourceCenterThreatsMetaFragment on HomeSecurityResourceCenterThreatsMetaJson {
    _fields {
      title
      description
      breadcrumbs {
        title
        link
      }
    }
  }
`;
