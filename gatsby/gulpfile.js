const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const globby = require('globby');
const modify = require('gulp-modify');
const config = require('./config');

const internal_field = {
    key: 'fields',
    modified: '_fields'
};

const createFolder = (path) => {
    if (!fs.existsSync(path)){
        fs.mkdirSync(path);
    }
};

gulp.task('modify', () => {
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

gulp.task('clean', () => {
    
});

gulp.task('repack', async () => {
    const paths = await globby([`${config.dataPathOrigin}**/*.json`]);

    createFolder(`${__dirname}/src/data/new`);
    createFolder(`${__dirname}/src/data/new/com`);

    paths.forEach(filepath => {
        const filename = path.basename(filepath, '.json');
        const dirs = path.dirname(filepath).split('/');
        const lastDir = dirs.pop();
        const oneBeforeDir = dirs.pop();
        const entityName = `${oneBeforeDir}_${lastDir}_${filename}`;
        const newDir = path.join(config.dataPath, entityName);
        createFolder(newDir);

        fs.copyFileSync(
            filepath,
            path.join(newDir, `${filename}.json`)
        );
    });
});

gulp.task('prepare', ['clean', 'repack', 'modify']);