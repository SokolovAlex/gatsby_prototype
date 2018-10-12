import { graphql } from 'gatsby';

export const query = graphql`
  fragment localizationFooterCountrySelectorFragment on LocalizationFooterCountrySelectorJson {
    _fields {
      Body
    }
  }
`;
