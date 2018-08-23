const gulp = require('gulp');
const modify = require('gulp-modify');

const dataPath = './src/data';
const dataOutPath = './src/data2';

const internal_field = {
    key: 'fields',
    modified: '_fields'
};

gulp.task('default', () => {
    gulp.src(`${dataPath}/**/*.json`)
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
        .pipe(gulp.dest(dataOutPath));
});