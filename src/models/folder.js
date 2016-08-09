'use strict';

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
    }
};
