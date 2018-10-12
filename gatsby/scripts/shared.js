const ncp = require('ncp');
const mkdir = require('mkdirp');

const rootPath = `${__dirname}/../`;
const src = `${rootPath}/shared`
const pagesPath = `${rootPath}/pages/src/shared`;
const editorPath = `${rootPath}/editor/src/shared`;

mkdir(pagesPath);
mkdir(editorPath);

ncp(src, pagesPath);
ncp(src, editorPath);