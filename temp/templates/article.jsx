import React from 'react';
import { graphql } from 'gatsby';
import Layout from '~/layouts/common/common';

import RepoHeader from '@mol/repo-header/repo-header';
import RepositoryArticle from '@org/repository-article/repository-article';

const ArticleTemplate = ({ pageContext, data }) => {
  const { metaTitle, metaDesc, title, body, image } = pageContext;
  const meta = data.homeSecurityResourceCenterThreatsMetaJson._fields;
  const imageSrc = image.length ? image[0] : '';
  return (
    <Layout title={metaTitle} description={metaDesc}>
      <article className="main post">
        <RepoHeader meta={meta} headerTitle={title} />
        <RepositoryArticle title={title} body={body} image={imageSrc} />
      </article>
    </Layout>
  );
};

export default ArticleTemplate;

export const query = graphql`
  query ArticlePage {
    homeSecurityResourceCenterThreatsMetaJson {
      ...homeSecurityThreatsMetaFragment
    }
  }
`;
