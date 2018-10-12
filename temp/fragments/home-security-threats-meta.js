import { graphql } from 'gatsby';

export const query = graphql`
  fragment homeSecurityThreatsMetaFragment on HomeSecurityResourceCenterThreatsMetaJson {
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
