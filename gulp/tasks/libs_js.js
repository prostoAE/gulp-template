const plugins = [
    'src/assets/vendor/js/slick.min.js'
];

import gulp from "gulp";
import uglify from "gulp-uglify";
import concat from "gulp-concat";
import map from "gulp-sourcemaps";
import chalk from "chalk";

export const libs_js = (done) => {
    if (plugins.length > 0)
        return gulp.src(plugins)
            .pipe(map.init())
            .pipe(uglify())
            .pipe(concat('libs.min.js'))
            .pipe(map.write())
            .pipe(gulp.dest('dist/assets/js/'));
    else {
        return done(console.log(chalk.yellow('No added JS plugins')));
    }
};
