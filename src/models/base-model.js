'use strict';

const _ = require('lodash');
const proxy = require('proxy-mate');

const events = require('events');
const EventEmitter = events.EventEmitter;

module.exports = class BaseModel extends EventEmitter {
    constructor(api) {
        super();

        this.data = this.defaults;
        this.api = api;

        return proxy(this, [], ['data']);
    }

    get defaults() {
        return {};
    }

    load(properties) {
        this.data = _.merge(this.data, properties);

        return this;
    }
};
