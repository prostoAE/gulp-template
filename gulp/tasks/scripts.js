import gulp from "gulp";
import fileinclude from "gulp-file-include";
import babel from "gulp-babel";
import uglify from "gulp-uglify";
import rename from "gulp-rename";

export const scripts = () => {
    return gulp.src('src/assets/js/script.js')
        .pipe(fileinclude())
        .pipe(babel({
            presets: ['@babel/env'],
            plugins: [
                "@babel/plugin-proposal-class-properties"
            ]
        }))
        .pipe(gulp.dest('dist/assets/js/'))
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('dist/assets/js/'))
};
