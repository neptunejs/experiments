'use strict';

const path = require('path');
const fs = require('fs');

const examples = fs.readdirSync(path.join(__dirname, 'src')).filter(dir => {
    return fs.statSync(path.join(__dirname, 'src', dir)).isDirectory();
});
const entry = {};
for (const example of examples) {
    const key = `./build/${example}/bundle`;
    entry[key] = `./src/${example}/app`;
}

module.exports = {
    entry,
    output: {
        path: '/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'es2017']
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    },
    devServer: {
        inline: true
    }
};
