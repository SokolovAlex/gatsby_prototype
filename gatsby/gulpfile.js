const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const globby = require('globby');
const modify = require('gulp-modify');
const config = require('./config');
const del = require('del');
const mapping = require('./src/data/mapping');

const internal_field = {
    key: 'fields',
    modified: '_fields'
};

const createFolder = (path) => {
    if (!fs.existsSync(path)){
        fs.mkdirSync(path);
    }
};

gulp.task('modify', async () => {
    gulp.src(`${config.dataPath}/**/*.json`)
        .pipe(modify({
            fileModifier: (file, contents) => {
                const json = JSON.parse(contents);
                if (internal_field.key in json) {
                    json[internal_field.modified] = json[internal_field.key];
                    delete json[internal_field.key];
                }
                return JSON.stringify(json);
            }
        }))
        .pipe(gulp.dest(config.dataPath));
});

gulp.task('clean', async () => {
    await del([config.clearPath]);
    console.log('clean');
});

gulp.task('repack', async () => {
    console.log('repack1');
    const paths = await globby([`${config.dataPathOrigin}**/*.json`]);
    console.log('repack2');
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

        console.log('------->', entityKey);
        const newDir = path.join(config.dataPath, entityName);
        createFolder(newDir);

        fs.copyFileSync(
            filepath,
            path.join(newDir, `${filename}.json`)
        );
        console.log(000000000);
    });
});

gulp.task('prepare', async () => {
    console.log(1);
    await gulp.start('clean');
    console.log(2);
    await gulp.start('repack');
    console.log(3);
    //await gulp.start('modify');
});