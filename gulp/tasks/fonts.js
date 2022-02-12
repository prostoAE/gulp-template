import fs from "fs";
import gulp from "gulp";
import chalk from "chalk";

let appFonts = 'dist/assets/fonts/';

export const fontStyle = () => {
    let fontsFile = 'src/assets/scss/base/_typography.scss';

    fs.readdir(appFonts, (err, fontsFiles) => {
        if (fontsFiles) {
            if (!fs.existsSync(fontsFile)) {
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                for (let i = 0; i < fontsFiles.length; i++) {
                    let fontFileName = fontsFiles[i].split('.')[0];
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                        let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                        if (fontWeight.toLowerCase() === 'thin') {
                            fontWeight = 100;
                        } else if (fontWeight.toLowerCase() === 'extralight') {
                            fontWeight = 200;
                        } else if (fontWeight.toLowerCase() === 'light') {
                            fontWeight = 300;
                        } else if (fontWeight.toLowerCase() === 'medium') {
                            fontWeight = 500;
                        } else if (fontWeight.toLowerCase() === 'semibold') {
                            fontWeight = 600;
                        } else if (fontWeight.toLowerCase() === 'bold') {
                            fontWeight = 700;
                        } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                            fontWeight = 800;
                        } else if (fontWeight.toLowerCase() === 'black') {
                            fontWeight = 900;
                        } else {
                            fontWeight = 400;
                        }
                        fs.appendFile(fontsFile,
                            `@font-face {
    font-family: ${fontName};
    font-display: swap;
    src: url('../fonts/${fontFileName}.woff2') format('woff2'),url('../fonts/${fontFileName}.woff') format('woff'), url('../fonts/${fontFileName}.ttf') format("truetype");
    font-weight: ${fontWeight};
    font-style: normal;
}\r\n`, cb);
                        newFileOnly = fontFileName;
                    }
                }
            } else {
                console.log(chalk.yellow(`Файл scss/base/_typography.scss уже существует. Для обновления шрифтов его нужно удалить!`));
            }
        }
    });

    return gulp.src('src/assets/');

    function cb() {}
};
