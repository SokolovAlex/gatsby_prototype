import { graphql } from 'gatsby';

export const query = graphql`
  fragment repositoryResourcesB2BFragment on RepositoryResourcesB2BJson {
    _fields {
      resourceCenterItems {
        resourceCategory {
          id
          key
          title
          description
        }
        resourceTitle
        resourceSummary
        resourceImage
        resourceLink
      }
    }
  }
`;
