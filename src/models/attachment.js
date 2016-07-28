'use strict';

const _ = require('lodash');
const proxy = require('proxy-mate');

module.exports = class Attachment {
    constructor(data, api) {
        this.data = _.merge({
            'id': '',
            'kind': '',
            'name': ''
        }, data);

        this.api = api;

        return proxy(this, ['api'], ['data']);
    }
};
