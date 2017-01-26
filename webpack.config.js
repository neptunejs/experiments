'use strict';

const path = require('path');

module.exports = {
    entry: {
        'build/molecule_table/bundle': './src/molecule_table/app',
        'build/molecule_table_fetch/bundle': './src/molecule_table_fetch/app'
    },
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
