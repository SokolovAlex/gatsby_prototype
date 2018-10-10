const gulp = require('gulp');
const globby = require('globby');
const del = require('del');
const path = require('path');
const fs = require('fs');

const { createFolder, saveFile, readJson } = require('./utils/filesystem');
const config = require('./config');
const { mapping, schemas } = require('../content/mapping');
const merge = require('deepmerge')

const internal_field = {
    key: 'fields',
    modified: '_fields'
};

const modify = async () => {
    const paths = await globby([`${config.dataPath}**/*.json`])
    paths.forEach(filepath => {
        let json = readJson(filepath);

        // set defaults
        const dirFields = filepath.split('/');
        dirFields.pop(); // remove region en-global || ru-ru
        const entityKey = dirFields.pop();
        const schema = schemas[entityKey];
        if (schema) {
            const schemaJson = readJson(path.normalize(`${__dirname}/../content/schemas/${schema}`));
            json = merge(json, schemaJson);
        }

        if (internal_field.key in json) {
            json[internal_field.modified] = json[internal_field.key];
            delete json[internal_field.key];
        }
        saveFile(filepath, JSON.stringify(json));
    });
};

const cleanData = async () => {
    await del([config.clearPath], { force: true });
};

const cleanCache = async () => {
    await del(['.cache/'], { force: true });
};

const repack = async () => {
    const paths = await globby([`${config.dataPathOrigin}**/*.json`]);

    createFolder(`${__dirname}/../content/modified`);
    createFolder(`${__dirname}/../content/modified/${config.locale}`);

    paths.forEach(filepath => {
        const normalizePath = path.normalize(filepath)
            .replace(config.dataPathOrigin, '');

        const filename = path.basename(normalizePath, '.json');
        const dirs = path.dirname(normalizePath).split('\\');
        dirs.shift();
        const dirPath = dirs.join('_');
        const entityKey = `${dirPath}_${filename}`;
        const entityName = mapping[entityKey] || entityKey;

        const firstDir = dirs[0];
        createFolder(path.join(config.dataPath, firstDir));

        const newDir = path.join(config.dataPath, firstDir, entityName);
        createFolder(newDir);

        fs.copyFileSync(
            filepath,
            path.join(newDir, `${entityName}.json`)
        );
    });
};

gulp.task('modify', modify);

gulp.task('cleanData', cleanData);

gulp.task('clean', cleanCache);

gulp.task('repack', repack);

gulp.task('default', async () => {
    await cleanData();
    await repack();
    await modify();
});

gulp.task('static', () => {
    const StaticServer = require('static-server');
    const server = new StaticServer({
        rootPath: '../content/data',
        port: 9999,
        cors: '*',
    });
    server.start(function () {
        console.log('Server listening to', server.port);
    });
});