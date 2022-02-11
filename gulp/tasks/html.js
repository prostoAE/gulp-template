import gulp from "gulp";
import plumber from "gulp-plumber";
import fileinclude from "gulp-file-include";
import {htmlValidator} from "gulp-w3c-html-validator";
import webphtml from "gulp-webp-html";

export const html = () => {
    return gulp.src(['src/*.{html,php}', '!src/partials/**/*.{html,php}'])
        .pipe(plumber())
        .pipe(fileinclude())
        .pipe(webphtml())
        .pipe(htmlValidator.analyzer({ignoreLevel: 'warning'}))
        .pipe(htmlValidator.reporter({throwErrors: false}))
        .pipe(gulp.dest('dist/'))
};
