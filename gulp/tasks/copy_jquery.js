const {src, dest} = require('gulp');

module.exports = function copyJquery() {
    return src('src/assets/vendor/jQuery_v3.6.0.js')
        .pipe(dest('dist/assets/js/'));
};
