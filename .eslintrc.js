'use strict';


module.exports = {
    extends: require.resolve('cjs-eslint'),

    env: {
        es6:     true,
        browser: true,
        mocha:   true
    },

    rules: {
        'one-var': 0,
        'padding-line-between-statements': [
            'error',
            {blankLine: 'always', prev: '*', next: ['directive', 'return', 'export', 'cjs-export', 'try', 'function']},
            {blankLine: 'always', prev: ['directive', 'export', 'cjs-export', 'try', 'function'], next: '*'},
            {blankLine: 'any',    prev: 'directive', next: 'directive'}
        ],
        quotes: ['error', 'single', {allowTemplateLiterals: true, avoidEscape: true}]
    }
};
