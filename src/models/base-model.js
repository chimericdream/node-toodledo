'use strict';

const _ = require('lodash');
const proxy = require('proxy-mate');
const winston = require('winston');

const events = require('events');
const EventEmitter = events.EventEmitter;

module.exports = class BaseModel extends EventEmitter {
    constructor(api) {
        super();

        this.data = this.defaults;
        this.api = api;
        this.logger = winston;

        this.on('error:raw', (error, file, line) => {
            let extra;

            if (typeof error.errorDesc !== 'undefined') {
                extra = error.errorDesc;
            }

            const exception = this.api.getException(
                parseInt(error.errorCode, 10),
                file,
                line,
                extra
            );

            this.emit('error', exception);
        });

        return proxy(this, [], ['data']);
    }

    get defaults() {
        return {};
    }

    load(properties) {
        const knownProps = Object.keys(this.defaults);
        const responseProps = Object.keys(properties);
        const unknownProps = _.remove(responseProps, (prop) => {
            return !knownProps.includes(prop);
        });

        unknownProps.forEach((prop) => {
            this.logger.warn(`Ignoring unknown property: "${ prop }"`);
        });

        this.data = _.merge(this.data, _.omit(properties, unknownProps));

        return this;
    }
};
