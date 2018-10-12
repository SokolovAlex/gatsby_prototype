import { graphql } from 'gatsby';

export const query = graphql`
  fragment homeSecurityResourceCenterMetaFragment on HomeSecurityResourceCenterMetaJson {
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
