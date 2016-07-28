'use strict';

module.exports = class AccountException extends Error {
    constructor(error, file = '', line = 0) {
        this.error = error;
        this.file = file;
        this.line = line;
    }

    get TYPE() {
        '': {
            'code': '',
            'message': ''
        }
    };
};
