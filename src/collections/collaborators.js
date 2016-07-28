'use strict';

const _ = require('lodash');
const proxy = require('proxy-mate');

module.exports = class Collaborators {
    constructor(api) {
        this.api = api;

        return proxy(this, ['api']);
    }
};
