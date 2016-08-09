'use strict';

const BaseModel = require('./base-model');

module.exports = class Attachment extends BaseModel {
    get defaults() {
        return {
            'id': '',
            'kind': '',
            'name': ''
        };
    }
};
