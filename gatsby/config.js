const args = require('yargs').argv;
const path = require('path');

const locale = args.l || args.locale || 'com';

const contentPath = `${__dirname}/../content/data`;
const dataPathOrigin = path.normalize(`${contentPath}/origin/com/content/`);
const dataPath = path.normalize(`${contentPath}/new/com/`);

module.exports = {
    dataPathOrigin,
    dataPath,
    clearPath: path.normalize(`${contentPath}/new/**`),
    locale: locale,
};