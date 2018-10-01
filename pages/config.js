const path = require('path');

// to set in win ~export locale=ru || locale=ru gulp~
const locale = process.env.locale || 'com';
const region = process.env.region || 'global-en';

const contentPath = path.normalize(`${__dirname}/../content`);
const dataPathOrigin = path.normalize(`${contentPath}/data/${locale}/content/`);
const dataPath = path.normalize(`${contentPath}/modified/${locale}/`);

module.exports = {
    dataPathOrigin,
    dataPath,
    locale,
    region,
    clearPath: path.normalize(`${contentPath}/modified/${locale}/**`),
};