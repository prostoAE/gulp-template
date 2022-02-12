import gulp from "gulp";
import {serve} from "./gulp/tasks/serve.js";
import {html} from "./gulp/tasks/html.js";
import {styles} from "./gulp/tasks/styles.js";
import {libs_style} from "./gulp/tasks/libs_style.js";
import {copyJquery} from "./gulp/tasks/copy_jquery.js";
import {scripts} from "./gulp/tasks/scripts.js";
import {libs_js} from "./gulp/tasks/libs_js.js";
import {ttf_to_woff} from "./gulp/tasks/ttf2woff.js";
import {ttf_to_woff2} from "./gulp/tasks/ttf2woff2.js";
import {fontStyle} from "./gulp/tasks/fonts.js";
import {images} from "./gulp/tasks/images.js";
import {svg_sprite} from "./gulp/tasks/svg_sprite.js";
import {clean} from "./gulp/tasks/clean.js";

function setMode(isProduction = false) {
    return cb => {
        process.env.NODE_ENV = isProduction ? 'production' : 'development';
        cb()
    }
}

const dev = gulp.parallel(html, libs_style, copyJquery, scripts, libs_js, gulp.series(ttf_to_woff, ttf_to_woff2, fontStyle, styles), images, svg_sprite);
const build = gulp.series(clean, dev);

gulp.task('start', gulp.series(setMode(), build, serve));
gulp.task('build', gulp.series(setMode(true), build));
gulp.task('default', gulp.series(setMode(), build, serve));
