'use strict';

const path = require('path');
const fs = require('fs');

const examples = fs.readdirSync(path.join(__dirname, 'src')).filter(dir => {
    return fs.statSync(path.join(__dirname, 'src', dir)).isDirectory();
});
const entry = {};
for (const example of examples) {
    const key = `./build/${example}/bundle`;
    const value = `./src/${example}/app`;
    entry[key] = value;
}

module.exports = {
    entry,
    output: {
        path: './',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'es2017']
                }
            }
        ]
    },
    devServer: {
        contentBase: './src'
    }
};
