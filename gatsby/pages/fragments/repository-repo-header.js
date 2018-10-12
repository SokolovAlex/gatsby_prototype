import { graphql } from 'gatsby';

export const query = graphql`
  fragment repositoryRepoHeaderFragment on RepositoryRepoHeaderJson {
    _fields {
      headerTitle
      headerSubTitle
      headerDescription
      headerBgImg
    }
  }
`;
