const path = require('path');
const webpack = require('webpack');
const { locale } = require('../config');

const basePath = `${__dirname}/../src`;

module.exports = {
    customWebpackConfig: {
        resolve: {
            alias: {
                '~': path.normalize(basePath),
                '@config': path.normalize(`${__dirname}/../config`),
                '@at': path.normalize(`${basePath}/components/atoms`),
                '@mol': path.normalize(`${basePath}/components/molecules`),
                '@org': path.normalize(`${basePath}/components/organisms`),
                '@services': path.normalize(`${basePath}/services`),
                '@actions': path.normalize(`${basePath}/store/actions`)
            }
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    locale: JSON.stringify(locale)
                 }
            })
        ]
    }
};
