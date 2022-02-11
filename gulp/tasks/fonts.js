import fs from "fs";
import path from "path";
import chalk from "chalk";

const allowedFormats = ['woff', 'woff2', 'ttf'];

let srcFonts = 'src/assets/scss/_local-fonts.scss';
let appFonts = 'dist/assets/fonts/';

export const fonts = (done) => {
    fs.readdir(appFonts, (err, items) => {
        if (items) {
            let currentName;

            items.forEach((item) => {
                let ext = path.extname(item);
                let name = path.basename(item, ext);

                if (allowedFormats.includes(ext.substring(1)) && currentName !== name) {
                    fs.appendFile(srcFonts, `@include font-face("${name}", "${name}", 400);\r\n`, () => {
                    });
                    console.log(chalk.yellow(`
                            Added new font: ${name}.
                            ----------------------------------------------------------------------------------
                            Please, move mixin call from src/assets/scss/_local-fonts.scss to src/assets/scss/base/_typography.scss and then change it!
                            ----------------------------------------------------------------------------------
                            `));
                }

                currentName = name;
            });
        }
    });

    done();
};
