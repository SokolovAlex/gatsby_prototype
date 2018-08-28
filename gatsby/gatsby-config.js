const config = require('./config');

module.exports = {
    siteMetadata: {
        title: 'KL corp',
    },
    plugins: [
        'gatsby-plugin-react-helmet',
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