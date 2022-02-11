import gulp from "gulp";
import changed from "gulp-changed";
import ttf2woff2 from "gulp-ttftowoff2";

export const ttf_to_woff2 = () => {
    return gulp.src('src/assets/fonts/**/*.ttf')
        .pipe(changed('dist/assets/fonts', {
            extension: '.woff2',
            hasChanged: changed.compareLastModifiedTime
        }))
        .pipe(ttf2woff2())
        .pipe(gulp.dest('dist/assets/fonts'));
};
