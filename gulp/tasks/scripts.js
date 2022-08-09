import gulp from "gulp";
import webpack from "webpack-stream";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import fileinclude from "gulp-file-include";
import babel from "gulp-babel";
import sourcemaps from "gulp-sourcemaps";
import uglify from "gulp-uglify";
import rename from "gulp-rename";

export const scripts = () => {
    return gulp.src('src/assets/js/script.js')
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(fileinclude())
        // .pipe(sourcemaps.init())
        /*.pipe(babel({
            presets: ['@babel/env'],
            plugins: [
                "@babel/plugin-proposal-class-properties"
            ]
        }))*/
        .pipe(webpack({
            mode:'production',
            cache: {
                type: 'filesystem'
            },
            devtool: 'inline-source-map',
            output: {
                filename: 'script.js',
            },
        }))
        .pipe(gulp.dest('dist/assets/js/'))
        // .pipe(uglify())
        // .pipe(sourcemaps.write())
        // .pipe(rename({extname: '.min.js'}))
        // .pipe(gulp.dest('dist/assets/js/'))
};
