const plugins = [
    'src/assets/vendor/css/slick.css',
    'src/assets/vendor/css/slick-theme.css'
];

const {src, dest} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const map = require('gulp-sourcemaps');
const chalk = require('chalk');

module.exports = function libs_style(done) {
    if (plugins.length > 0) {
        return src(plugins)
            .pipe(map.init())
            .pipe(sass({
                outputStyle: 'compressed'
            }).on('error', sass.logError))
            .pipe(concat('libs.min.css'))
            .pipe(map.write())
            .pipe(dest('dist/assets/css/'))
    } else {
        return done(console.log(chalk.yellow('No added CSS/SCSS plugins')));
    }
}
