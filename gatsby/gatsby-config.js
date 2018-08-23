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
                path: `${__dirname}/src/data2/com/content/`,
                // path: `${__dirname}/src/data/tv/`,
                //path: `${__dirname}/src/data/example`,
            },
        },
    ],
};