const config = require('./config');

module.exports = {
  siteMetadata: {
    title: `Gatsby Typescript Starter`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    // Add typescript stack into webpack
    `gatsby-plugin-typescript`,
    'gatsby-transformer-json',
    {
        resolve: 'gatsby-source-filesystem',
        options: {
            name: 'data',
            path: config.dataPath,
        },
    },
  ],
}
