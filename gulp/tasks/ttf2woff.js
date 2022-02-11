import gulp from "gulp";
import changed from "gulp-changed";
import ttf2woff from "gulp-ttf2woff";

export const ttf_to_woff = () => {
    return gulp.src('src/assets/fonts/**/*.ttf')
        .pipe(gulp.dest('dist/assets/fonts'))
        .pipe(changed('dist/assets/fonts', {
            extension: '.woff',
            hasChanged: changed.compareLastModifiedTime
        }))
        .pipe(ttf2woff())
        .pipe(gulp.dest('dist/assets/fonts'));
};
