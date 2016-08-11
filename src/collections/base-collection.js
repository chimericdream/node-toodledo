'use strict';

const events = require('events');
const EventEmitter = events.EventEmitter;

module.exports = class BaseCollection extends EventEmitter {
    constructor(api) {
        super();

        this.api = api;

        this.collection = [];
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
    }

    add(item) {
        this.collection.push(item);

        return this;
    }
};
