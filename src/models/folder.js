'use strict';

const _ = require('lodash');
const proxy = require('proxy-mate');

const BaseModel = require('./base-model');

module.exports = class Folder extends BaseModel {
    get defaults() {
        return {
            'id': 0,
            'name': '',
            'private': 0,
            'archived': 0,
            'ord': 0
        };
    };
};
