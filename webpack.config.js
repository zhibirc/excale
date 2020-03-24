'use strict';

const path = require('path');

const TerserWebpackPlugin = require('terser-webpack-plugin');


module.exports = {
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, 'build', 'release'),
        filename: 'index.min.js'
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                terserOptions: {
                    output: {
                        comments: false
                    }
                },
                extractComments: false,
                parallel: true
            })
        ]
    },
    mode: 'production'
};
