import gulp from "gulp";
import plumber from "gulp-plumber";
import sourcemaps from "gulp-sourcemaps";
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const scss = gulpSass( dartSass );
import groupMedia from "gulp-group-css-media-queries";
import autoprefixer from "gulp-autoprefixer";
import cleanCss from "gulp-clean-css";
import rename from "gulp-rename";
import webpcss from "gulp-webp-css";

export const styles = () => {
    return gulp.src('src/assets/scss/style.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(
            scss({
                outputStyle: 'expanded'
            }).on('error', scss.logError)
        )
        .pipe(groupMedia())
        .pipe(
            autoprefixer({
                overrideBrowsersList: ['last 5 versions'],
                cascade: true
            })
        )
        /*Раскоментировать если есть BG с картинкой*/
        // .pipe(webpcss())
        .pipe(gulp.dest('dist/assets/css/'))
        .pipe(cleanCss())
        .pipe(sourcemaps.write())
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('dist/assets/css/'))
};
