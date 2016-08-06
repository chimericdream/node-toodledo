'use strict';

const _ = require('lodash');
const proxy = require('proxy-mate');

module.exports = class Location {
    constructor(api) {
        this.data = {
        };

        this.api = api;

        return proxy(this, [], ['data']);
    }
};
