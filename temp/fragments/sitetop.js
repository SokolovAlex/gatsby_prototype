import { graphql } from 'gatsby';

export const query = graphql`
  fragment sitetopFragment on SitetopJson {
    _fields {
      label
      sections {
        link
        css
        text
      }
    }
  }
`;
