const path = require('path');

// to set in win ~export locale=ru || locale=ru gulp~
const locale = process.env.locale || 'fr';

const contentPath = path.normalize(`${__dirname}/../../source/corp-static/content`);
const src = path.normalize(`${contentPath}/data/${locale}/content/`);
const dest = path.normalize(`${contentPath}/modified/${locale}/`);

module.exports = {
    src,
    dest,
    locale 
};