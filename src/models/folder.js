'use strict';

const _ = require('lodash');
const proxy = require('proxy-mate');

module.exports = class Folder {
    constructor(api, existingData = {}) {
        this.data = _.merge({
            'id': 0,
            'name': '',
            'private': 0,
            'archived': 0,
            'ord': 0
        }, existingData);

        this.api = api;

        return proxy(this, [], ['data']);
    }
};
