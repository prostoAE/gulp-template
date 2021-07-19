const {src, dest} = require('gulp');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const scss = require('gulp-sass')(require('sass'));
const groupMedia = require('gulp-group-css-media-queries');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const webpcss = require('gulp-webp-css');

module.exports = function styles() {
    return src('src/assets/scss/style.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(
            scss({
                outputStyle: 'expanded'
            }).on('error', scss.logError)
        )
        .pipe(groupMedia())
        .pipe(
            autoprefixer({
                overrideBrowsersList: ['last 5 versions'],
                cascade: true
            })
        )
        /*Раскоментировать если есть BG с картинкой*/
        // .pipe(webpcss())
        .pipe(dest('dist/assets/css/'))
        .pipe(cleanCss())
        .pipe(sourcemaps.write())
        .pipe(rename({extname: '.min.css'}))
        .pipe(dest('dist/assets/css/'))
};
