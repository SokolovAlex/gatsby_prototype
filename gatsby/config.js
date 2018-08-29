const args = require('yargs').argv;
const path = require('path');

const locale = args.l || args.locale || 'com';

const dataPathOrigin = path.normalize(`${__dirname}/src/data/origin/com/content/`);
const dataPath = path.normalize(`${__dirname}/src/data/new/com/`);

module.exports = {
    dataPathOrigin,
    dataPath,
    clearPath: path.normalize(`${__dirname}/src/data/new/**`),
    locale: locale,
};