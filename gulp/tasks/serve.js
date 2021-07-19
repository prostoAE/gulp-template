const {watch, series} = require('gulp');
const server = require('browser-sync').create();
const html = require('./html');
const styles = require('./styles');
const scripts = require('./scripts');
const images = require('./images');
const svg_sprite = require('./svg_sprite');

function readyReload(cb) {
    server.reload();
    cb()
}

module.exports = function serve(cb) {
    server.init({
        server: 'dist',
        port: 3000,
        notify: false,
        open: true,
        cors: true
    });

    watch('src/**/*.{html, php}', series(html, readyReload));
    watch('src/assets/scss/**/*.scss', series(styles, readyReload));
    watch('src/assets/js/**/*.js', series(scripts, readyReload));
    watch('src/assets/img/**/*.{jpg,png,svg,gif,ico,webp}', series(images, readyReload));
    watch('src/assets/img/svg/*.svg', series(svg_sprite, readyReload));

    return cb();
};
