const config = require('./config');

console.log(` ---- CORP ---->
    Gatsby started on folder: ${config.dataPath} \n
    domain: ${config.domain} \n
    mode: ${config.isProd ? 'production' : 'development'} \n
    --------`);

module.exports = {
  pathPrefix: '/new-resource-center',
  siteMetadata: {
    title: 'KL corp site',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-eslint',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /Icon/,
        },
        svgo: {
          plugins: [{ removeTitle: false }],
          floatPrecision: 2,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'KL-corp-site',
        short_name: 'KL-corp-site',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        includePaths: [`${__dirname}/src/styles`],
      },
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: config.dataPath,
      },
    },
  ],
};
