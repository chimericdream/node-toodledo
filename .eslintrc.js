'use strict';

let jsdoc;

if (process.argv.includes('--dev')) {
    jsdoc = ['off'];
} else {
    jsdoc = ['warn'];
}

module.exports = {
    'extends': 'chimericdream',
    'rules': {
        'require-jsdoc': jsdoc
    }
};
