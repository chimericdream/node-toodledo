'use strict';

const _ = require('lodash');
const proxy = require('proxy-mate');

module.exports = class Row {
    constructor(data, api) {
        this.data = _.merge({
        }, data);

        this.api = api;

        return proxy(this, ['api'], ['data']);
    }
};
