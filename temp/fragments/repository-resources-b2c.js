import { graphql } from 'gatsby';

export const query = graphql`
  fragment repositoryResourcesB2CFragment on RepositoryResourcesB2CJson {
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
