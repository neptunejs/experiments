'use strict';

const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '../build');

fs.readdir(dir, function (err, files) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    files = files.filter(file => fs.statSync(path.join(dir, file)).isDirectory());
    const indexFile = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Index</title>
            </head>
            <body>
            ${files.map(file => `<h4><a href="${file}">${file}</a> (<a target="_blank" href="https://github.com/neptunjs/experiments/blob/master/src/${file}/app.js">Code</a>)</h4><br/>`).join('\n')}
            <script src="./bundle.js"></script>
            </body>
            </html>
        `;

    fs.writeFileSync(path.join(__dirname, '../build/index.html'), indexFile);
});