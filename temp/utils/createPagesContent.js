const path = require('path');
const { readJson } = require('./filesystem');

const getRepositoryArticleContent = async (graphql) => {
  const articleTemplate = path.resolve('./src/templates/article.jsx');
  return new Promise((resolve) => {
    graphql(`
      query allArticle {
        allRepositoryArticleJson {
          edges {
            node {
              filename
              _fields {
                metaTitle
                metaDesc
                title
                repository_type
                subtitle
                summary
                body
                thumbnail_image
                image
              }
            }
          }
        }
      }
    `).then((result) => {
      resolve(
        result.data.allRepositoryArticleJson.edges.map((edge) => {
          const data = edge.node;
          return {
            path: `threats/${data.filename}`,
            component: articleTemplate,
            context: data._fields,
          };
        })
      );
    });
  });
};

const getRepositoryArticleContentFS = async () => {
  // eslint-disable-next-line no-undef
  const articlesData = readJson(`${config.dataPath}/repository/repositoryArticle/repositoryArticle.json`);
  const articleTemplate = path.resolve('./src/templates/article.jsx');
  return articlesData.map((data) => ({
    path: `threats/${data.filename}`,
    component: articleTemplate,
    context: data._fields,
  }));
};

module.exports = {
  getRepositoryArticleContentFS,
  getRepositoryArticleContent,
};
