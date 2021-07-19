const fs = require('fs');
const chalk = require('chalk');

let srcFonts = 'src/assets/scss/_local-fonts.scss';
let appFonts = 'dist/assets/fonts/';
module.exports = function fonts(done) {
    fs.writeFile(srcFonts, '', () => {});
    fs.readdir(appFonts, (err, items) => {
        if (items) {
            let c_fontname;
            for (let i = 0; i < items.length; i++) {
                let fontname = items[i].split('.'),
                    fontExt;
                fontExt = fontname[1];
                fontname = fontname[0];
                if (c_fontname != fontname) {
                    if (fontExt == 'woff' || fontExt == 'woff2' || fontExt == 'ttf') {
                        fs.appendFile(srcFonts, `@include font-face("${fontname}", "${fontname}", 400);\r\n`, () => {});
                        console.log(chalk.yellow( `
                            Added new font: ${fontname}.
                            ----------------------------------------------------------------------------------
                            Please, move mixin call from src/assets/scss/_local-fonts.scss to src/assets/scss/base/_typography.scss and then change it!
                            ----------------------------------------------------------------------------------
                            `));
                    }
                }
                c_fontname = fontname;
            }
        }
    });
    done();
};