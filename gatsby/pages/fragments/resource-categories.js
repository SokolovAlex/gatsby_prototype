import { graphql } from 'gatsby';

export const query = graphql`
  fragment resourcesCategoriesFragment on ResourcesCategoriesJson {
    b2c {
      preemptive_safety
      threats
      infographics
      definitions
    }
    smb {
      customers
      insights
      products
      technology
      industry_awards_and_recognition
      webinars
      formations
    }
  }
`;
