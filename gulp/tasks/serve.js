import gulp from "gulp";
import server from "browser-sync";
import {html} from "./html.js";
import {styles} from "./styles.js";
import {scripts} from "./scripts.js";
import {images} from "./images.js";
import {svg_sprite} from "./svg_sprite.js";

function readyReload(cb) {
    server.reload();
    cb()
}

export const serve = (cb) => {
    server.init({
        server: 'dist',
        port: 3000,
        notify: false,
        open: true,
        cors: true
    });

    gulp.watch('src/**/*.{html, php}', gulp.series(html, readyReload));
    gulp.watch('src/assets/scss/**/*.scss', gulp.series(styles, readyReload));
    gulp.watch('src/assets/js/**/*.js', gulp.series(scripts, readyReload));
    gulp.watch('src/assets/img/**/*.{jpg,png,svg,gif,ico,webp}', gulp.series(images, readyReload));
    gulp.watch('src/assets/img/svg/*.svg', gulp.series(svg_sprite, readyReload));

    return cb();
};
