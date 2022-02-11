import gulp from "gulp";

export const copyJquery = () => {
    return gulp.src('src/assets/vendor/jQuery_v3.6.0.js')
        .pipe(gulp.dest('dist/assets/js/'));
};
