'use strict';

const path = require('path');


module.exports = {
    entry: '/src/main.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.min.js'
    },
    mode: 'production'
};
