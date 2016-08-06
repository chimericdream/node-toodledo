'use strict';

const _ = require('lodash');
const proxy = require('proxy-mate');

module.exports = class ApiException extends Error {
    constructor(errorCode, file = '', line = 0) {
        super();

        this.code = errorCode;
        this.file = file;
        this.line = line;

        this.name = _.invertBy(this.TYPE, (value) => {
            return value.code;
        })[this.code][0];

        this.message = this.TYPE[this.name].message;

        return proxy(this, ['code', 'file', 'line', 'message', 'name']);
    }

    get TYPE() {
        return {
            'UNKNOWN_ERROR': {
                'code': 0,
                'message': 'Unknown Error'
            },
            'NO_ACCESS_TOKEN': {
                'code': 1,
                'message': 'No access token was given.'
            },
            'INVALID_ACCESS_TOKEN': {
                'code': 2,
                'message': 'The access token was invalid or had the wrong scope.'
            },
            'TOO_MANY_REQUESTS': {
                'code': 3,
                'message': 'Too many API requests.'
            },
            'API_OFFLINE': {
                'code': 4,
                'message': 'The API is offline for maintenance.'
            }
        };
    };
};
