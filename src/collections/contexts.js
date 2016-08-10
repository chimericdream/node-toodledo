'use strict';

const rp = require('request-promise-native');

const BaseCollection = require('./base-collection');
const ContextModel = require('../models/context');

module.exports = class Contexts extends BaseCollection {
    fetch() {
        // eslint-disable-next-line max-len
        const url = `${ this.api.baseUrl }/contexts/get.php?access_token=${ this.api.accessToken }`;

        this.collection.length = 0;

        return rp({
            'uri': url,
            'method': 'GET',
            'json': true
        })
        .then((contexts) => {
            contexts.forEach((data) => {
                this.collection.push(new ContextModel(this.api).load(data));
            });
            this.emit('collection:loaded');
        })
        .catch((error) => {
            this.emit('error:raw', error);
        });
    }
};
