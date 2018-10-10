import React from 'react'
import Layout from '~/components/layout'
import { graphql } from 'gatsby'
import { createPage } from '../ory/page';

const IndexPage = ({ data }) => {
    const page = createPage(data.pageJson.content);
    return (
        <Layout>
            { page }
        </Layout>
    );
};

export default IndexPage

export const query = graphql`
  query Page {
    pageJson {
      template
      content
    }
  }
`;