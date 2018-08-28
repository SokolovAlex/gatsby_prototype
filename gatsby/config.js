const args = require('yargs').argv;

const locale = args.l || args.locale || 'com';

const dataPathOrigin = `${__dirname}/src/data/origin/com/content/`;
const dataPath = `${__dirname}/src/data/new/com/`;

module.exports = {
    dataPathOrigin,
    dataPath,
    locale: locale,
};