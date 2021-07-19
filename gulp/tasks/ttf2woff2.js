const {src, dest} = require('gulp');
const changed = require('gulp-changed');
const ttf2woff2 = require('gulp-ttftowoff2');

module.exports = function ttf() {
    return src('src/assets/fonts/**/*.ttf')
        .pipe(changed('dist/assets/fonts', {
            extension: '.woff2',
            hasChanged: changed.compareLastModifiedTime
        }))
        .pipe(ttf2woff2())
        .pipe(dest('dist/assets/fonts'));
};
