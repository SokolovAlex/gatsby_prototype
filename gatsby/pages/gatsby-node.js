const { customWebpackConfig } = require('./utils/webpack');

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig(customWebpackConfig);
};
