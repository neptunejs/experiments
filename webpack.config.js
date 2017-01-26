'use strict';

const path = require('path');

module.exports = {
    entry: {
        'build/molecule_table/bundle': './src/molecule_table/app'
    },
    output: {
        path: './',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'env']
                }
            }
        ]
    },
    devServer: {
        contentBase: './src'
    }
};
