const {src, dest} = require('gulp');
const changed = require('gulp-changed');
const ttf2woff = require('gulp-ttf2woff');

module.exports = function ttf() {
    return src('src/assets/fonts/**/*.ttf')
        .pipe(dest('dist/assets/fonts'))
        .pipe(changed('dist/assets/fonts', {
            extension: '.woff',
            hasChanged: changed.compareLastModifiedTime
        }))
        .pipe(ttf2woff())
        .pipe(dest('dist/assets/fonts'));
};
