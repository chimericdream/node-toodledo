'use strict';

const events = require('events');
const EventEmitter = events.EventEmitter;

module.exports = class BaseCollection extends EventEmitter {
    constructor(api) {
        super();

        this.api = api;
        this.collection = [];
    }
};
