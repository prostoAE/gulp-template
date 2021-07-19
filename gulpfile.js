const {parallel, series} = require('gulp');
const serve = require('./gulp/tasks/serve');
const html = require('./gulp/tasks/html');
const styles = require('./gulp/tasks/styles');
const libs_styles = require('./gulp/tasks/libs_style');
const copy_jquery = require('./gulp/tasks/copy_jquery');
const scripts = require('./gulp/tasks/scripts');
const libs_js = require('./gulp/tasks/libs_js');
const ttf2woff = require('./gulp/tasks/ttf2woff');
const ttf2woff2 = require('./gulp/tasks/ttf2woff2');
const fonts = require('./gulp/tasks/fonts');
const images = require('./gulp/tasks/images');
const svg_sprite = require('./gulp/tasks/svg_sprite');
const clean = require('./gulp/tasks/clean');

function setMode(isProduction = false) {
    return cb => {
        process.env.NODE_ENV = isProduction ? 'production' : 'development';
        cb()
    }
}

// const dev = parallel(html, styles, scripts, fonts, images, vendor);
const dev = parallel(html, styles, libs_styles, copy_jquery, scripts, libs_js, series(ttf2woff, ttf2woff2, fonts), images, svg_sprite);
const build = series(clean, dev);

module.exports.start = series(setMode(), build, serve);
module.exports.build = series(setMode(true), build);
module.exports.default = series(setMode(), build, serve);
