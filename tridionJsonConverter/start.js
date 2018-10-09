const globby = require('globby');
const del = require('del');
const path = require('path');
const fs = require('fs');
const camelCase = require('camelcase');
const makeDir = require('make-dir');
 
const { src, dest } = require('./config');
const { mapping } = require('./mapping');

const internal_field = {
    key: 'fields',
    modified: '_fields'
};

const ignoreToRepack = [
    `!${src}**/home-security/products/**/*.json`,
];

const ignoreToModify = [
    ...ignoreToRepack
];

const cleanData = async () => {
    await del([`${dest}**`], { force: true });
};

const readJson = (path) => {
    const content = fs.readFileSync(path);
    let json;
    try {
        json = JSON.parse(content);
    } catch (ex) {
        console.log(`parse error: \n ${ex} \n File: ${path}`);
        process.exit(1);
    }
    
    if (internal_field.key in json) {
        json[internal_field.modified] = json[internal_field.key];
        delete json[internal_field.key];
    }

    return json;
};

const repack = async () => {
    const paths = await globby([
        `${src}**/*.json`,
        `!${src}**/repository/isc/**.json`,
        ...ignoreToRepack
    ]);
  
    await makeDir(dest);

    paths.forEach(filepath => {
        const normalizePath = path.normalize(filepath).replace(src, '');
        const filename = path.basename(normalizePath, '.json');
        const dirs = path.dirname(normalizePath).split(path.sep);

        dirs.shift();

        const dirPath = dirs.join('-');
        const entityKey = camelCase(`${dirPath}-${filename}`);
        const entityName = mapping[entityKey] || entityKey;
        const firstDir = dirs[0];
        
        makeDir.sync(path.join(dest, firstDir));

        fs.copyFileSync(
            filepath,
            path.join(dest, firstDir, `${entityName}.json`)
        );
    });
};

const repackPagesIsc = async () => {
    const paths = await globby([`${src}**/repository/isc/**.json`]);
    const contentArray = [];

    paths.forEach(filepath => {
        const filename = path.basename(filepath, '.json');
        const json = readJson(filepath);
        json.filename = filename;
        contentArray.push(json);
    });

    if (!contentArray.length) {
        return;
    }
    const schemaName = camelCase(contentArray[0].schemaName);
    const dirName = path.join(dest, 'repository', schemaName);
    const fileName = path.join(dirName, `${schemaName}.json`);
    await makeDir(dirName);
    fs.writeFileSync(fileName, JSON.stringify(contentArray), 'utf8');

    ignoreToModify.push(`!${fileName}`);
};

const modify = async () => {
    const paths = await globby([
        `${dest}**/*.json`,
        ...ignoreToModify
    ]);
    paths.forEach(filepath => {
        const json = readJson(filepath);
        fs.writeFileSync(filepath, JSON.stringify([json]), 'utf8');
    });
};

(async () => {
    await cleanData();
    await repack();
    await repackPagesIsc();
    await modify();
})();

