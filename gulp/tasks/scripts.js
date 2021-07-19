const {src, dest} = require('gulp');
const fileinclude = require('gulp-file-include');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

module.exports = function scripts() {
    return src('src/assets/js/script.js')
        .pipe(fileinclude())
        .pipe(babel({
            presets: ['@babel/env'],
            plugins: [
                "@babel/plugin-proposal-class-properties"
            ]
        }))
        .pipe(dest('dist/assets/js/'))
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(dest('dist/assets/js/'))
};
