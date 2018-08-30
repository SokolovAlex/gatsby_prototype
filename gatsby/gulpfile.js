const gulp = require('gulp');
const path = require('path');
const { createFolder, saveFile } = require('./src/utils/filesystem');
const fs = require('fs');
const globby = require('globby');
const config = require('./config');
const del = require('del');
const mapping = require('./src/data/mapping');

const internal_field = {
    key: 'fields',
    modified: '_fields'
};

const modify = async () => {
    const paths = await globby([`${config.dataPath}**/*.json`])
    paths.forEach(filepath => {
        const content = fs.readFileSync(filepath);
        const json = JSON.parse(content);
        if (internal_field.key in json) {
            json[internal_field.modified] = json[internal_field.key];
            delete json[internal_field.key];
        }
        saveFile(filepath, JSON.stringify(json));
    });
};

const clean = async () => {
    await del([config.clearPath]);
};

const repack = async () => {
    const paths = await globby([`${config.dataPathOrigin}**/*.json`]);
    createFolder(`${__dirname}/src/data/new`);
    createFolder(`${__dirname}/src/data/new/com`);

    paths.forEach(filepath => {
        const normalizePath = path.normalize(filepath)
            .replace(config.dataPathOrigin, '');
        const filename = path.basename(normalizePath, '.json');
        const dirs = path.dirname(normalizePath).split('\\');
        const lastDir = dirs.pop();
        const oneBeforeDir = dirs.pop();
        const oneBeforeDirName = oneBeforeDir && oneBeforeDir !== 'en-global'
            ? `${oneBeforeDir}_` : '';

        const entityKey = `${oneBeforeDirName}${lastDir}_${filename}`;
        const entityName = mapping[entityKey] || entityKey;

        const newDir = path.join(config.dataPath, entityName);
        createFolder(newDir);

        fs.copyFileSync(
            filepath,
            path.join(newDir, `${filename}.json`)
        );
    });
};

gulp.task('modify', modify);

gulp.task('clean', clean);

gulp.task('repack', repack);

gulp.task('default', async () => {
    await clean();
    await repack();
    await modify();
});