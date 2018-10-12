const path = require('path');

// to set in win ~export domain=ru || domain=ru gulp~
const domain = process.env.domain || 'fr';
const region = process.env.region || 'fr-fr';
const isProd = process.env.mode === 'prod';

const mainSiteUrl = `https://www.kaspersky.${domain}/resource-center`;

const relativeUrl = isProd ? 'new-resource-center' : '';

const rootUrl = isProd ? '/new-resource-center' : '';

const staticUrl = isProd ? `https://www.kaspersky.${domain}` : `http://localhost:9999/${domain}`;

const apiUrl = isProd ? `https://www.kaspersky.${domain}/_svc` : 'http://ngdev-www.kaspersky.com/_svc';

const contentPath = path.normalize(`${__dirname}/../content`);
const dataPathOrigin = path.normalize(`${contentPath}/data/${domain}/content/`);
const dataPath = path.normalize(`${contentPath}/modified/${domain}/`);

module.exports = {
  dataPathOrigin,
  dataPath,
  relativeUrl,
  rootUrl,
  staticUrl,
  mainSiteUrl,
  domain,
  isProd,
  region,
  apiUrl,
  clearPath: path.normalize(`${contentPath}/modified/${domain}/**`),
};
