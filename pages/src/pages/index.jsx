import React from 'react'
import Layout from '~/components/layout'
import { graphql } from 'gatsby'
import { createBanner } from '../ory/banner';

const IndexPage = ({ data }) => {
    const banner = createBanner(data.bannerJson.content);
    return (
        <Layout>
            { banner }
        </Layout>
    );
};

export default IndexPage

export const query = graphql`
  query Banner {
    bannerJson {
      template
      content
    }
  }
`;