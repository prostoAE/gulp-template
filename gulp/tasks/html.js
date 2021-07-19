const {src, dest} = require('gulp');
const plumber = require('gulp-plumber');
const fileinclude = require('gulp-file-include');
// const htmlValidator = require('gulp-w3c-html-validator');
const webphtml = require('gulp-webp-html');

module.exports = function html() {
    return src(['src/*.{html,php}', '!src/partials/**/*.{html,php}'])
        .pipe(plumber())
        .pipe(fileinclude())
        // .pipe(webphtml())
        // .pipe(htmlValidator())
        .pipe(dest('dist/'))
};
