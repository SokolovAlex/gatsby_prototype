const path = require('path');
const webpack = require('webpack');

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
        '@actions': path.normalize(`${basePath}/store/actions`),
        '@static': path.normalize(`${basePath}/../static`),
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          domain: JSON.stringify(process.env.domain),
          mode: JSON.stringify(process.env.mode),
          region: JSON.stringify(process.env.region),
        },
      }),
    ],
  },
};
