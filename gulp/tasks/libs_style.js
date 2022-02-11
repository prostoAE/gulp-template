const plugins = [
    'src/assets/vendor/css/slick.css',
    'src/assets/vendor/css/slick-theme.css'
];

import gulp from "gulp";
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass( dartSass );
import concat from "gulp-concat";
import map from "gulp-sourcemaps";
import chalk from "chalk";

export const libs_style = (done) => {
    if (plugins.length > 0) {
        return gulp.src(plugins)
            .pipe(map.init())
            .pipe(sass({
                outputStyle: 'compressed'
            }).on('error', sass.logError))
            .pipe(concat('libs.min.css'))
            .pipe(map.write())
            .pipe(gulp.dest('dist/assets/css/'))
    } else {
        return done(console.log(chalk.yellow('No added CSS/SCSS plugins')));
    }
}
