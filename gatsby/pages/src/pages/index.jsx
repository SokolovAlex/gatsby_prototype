import React from 'react'
import Layout from '../shared/layouts/Layout/Layout'
import { graphql } from 'gatsby'
import { createPage } from '../ory/page';

const IndexPage = ({ data }) => {
    const page = createPage(data.articleJson.content);
    return (
      <div>!!</div>
    );
};

export default IndexPage

export const query = graphql`
  query Page {
    articleJson {
      template
      content
    }
  }
`;