'use strict';

const _ = require('lodash');
const proxy = require('proxy-mate');

const BaseModel = require('./base-model');

module.exports = class List extends BaseModel {
    get defaults() {
        return {};
    };
};
