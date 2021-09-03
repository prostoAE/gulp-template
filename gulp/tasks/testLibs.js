const fs = require('fs');

let files = [];

let appLibs = 'src/assets/vendor/css/';
module.exports = function testLibs(done) {
    fs.readdir(appLibs, (err, items) => {
        if (items) {
            let c_fontname;
            for (let i = 0; i < items.length; i++) {
                let item = `src/assets/vendor/js/${items[i]}`;
                files.push(item);
                console.log(files);
            }
        }
    });

    done();
};
