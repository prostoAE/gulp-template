import gulp from "gulp";
import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export const images = () => {
    return gulp.src([
        'src/assets/img/**/*.{jpg,png,svg,gif,ico,webp}',
        '!src/assets/img/svg/*'
    ])
        .pipe(webp({
            quality: 75
        }))
        .pipe(gulp.dest('dist/assets/img/'))
        .pipe(gulp.src([
                'src/assets/img/**/*.{jpg,png,svg,gif,ico,webp}',
                '!src/assets/img/svg/*'
            ])
        )
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({
                quality: 75,
                progressive: true
            }),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('dist/assets/img/'))
};
