const args = require('yargs').argv;
const path = require('path');

const locale = args.l || args.locale || 'com';

const contentPath = path.normalize(`${__dirname}/../content`);
const dataPathOrigin = path.normalize(`${contentPath}/data/com/content/`);
const dataPath = path.normalize(`${contentPath}/modified/com/`);

module.exports = {
    dataPathOrigin,
    dataPath,
    clearPath: path.normalize(`${contentPath}/modified/**`),
    locale: locale,
};