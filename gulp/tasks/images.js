const {src, dest} = require('gulp');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');

module.exports = function images() {
    return src([
        'src/assets/img/**/*.{jpg,png,svg,gif,ico,webp}',
        '!src/assets/img/svg/*'
    ])
        .pipe(webp({
            quality: 75
        }))
        .pipe(dest('dist/assets/img/'))
        .pipe(src([
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
        .pipe(dest('dist/assets/img/'))
};
