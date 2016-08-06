'use strict';

const _ = require('lodash');
const proxy = require('proxy-mate');

module.exports = class Attachment {
    constructor(api) {
        this.data = {
            'id': '',
            'kind': '',
            'name': ''
        };

        this.api = api;

        return proxy(this, [], ['data']);
    }
};
