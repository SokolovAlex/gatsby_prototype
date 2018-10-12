const { customWebpackConfig } = require('./utils/webpack');
const { createSchema } = require('./utils/schemas');
const { getRepositoryArticleContent } = require('./utils/createPagesContent');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig(customWebpackConfig);
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const articles = await getRepositoryArticleContent(graphql);
  articles.forEach((article) => {
    console.log(`Page created --> ${article.path}`);
    createPage(article);
  });
};

exports.setFieldsOnGraphQLNodeType = ({ type }) => {
  const { nodes } = type;
  const node = nodes && nodes[0];
  if (node.internal.owner !== 'gatsby-transformer-json') {
    return;
  }
  // eslint-disable-next-line
  return createSchema(node);
};
