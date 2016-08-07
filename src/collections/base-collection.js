'use strict';

const _ = require('lodash');
const proxy = require('proxy-mate');

const events = require('events');
const EventEmitter = events.EventEmitter;

module.exports = class BaseCollection extends EventEmitter {
    constructor(api) {
        super();

        this.api = api;
        this.collection = [];
    }
};
