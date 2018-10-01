const config = require('./config');
const autoprefixer = require('autoprefixer');

console.log(` ---- CORP ---->
    Gatsby started on folder: ${config.dataPath} \n
    locale: ${config.locale}`);

module.exports = {
  siteMetadata: {
    title: 'KL corp site',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'KL-corp-site',
        short_name: 'KL-corp-site',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui'
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        includePaths: [`${__dirname}/src/styles`],
      },
    },
    'gatsby-plugin-offline',
    'gatsby-transformer-json',
    {
        resolve: 'gatsby-source-filesystem',
        options: {
            name: 'data',
            path: config.dataPath,
        },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        output: "/sitemap.xml",
          query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              edges {
                node {
                  path
                }
              }
            }
        }`
      }
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          autoprefixer({
            browsers: ['last 2 versions']
          })
        ]
      }
    },
  ],
}
