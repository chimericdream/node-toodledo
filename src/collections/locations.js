'use strict';

const rp = require('request-promise-native');

const BaseCollection = require('./base-collection');
const LocationModel = require('../models/location');

module.exports = class Locations extends BaseCollection {
    fetch() {
        // eslint-disable-next-line max-len
        const url = `${ this.api.baseUrl }/locations/get.php?access_token=${ this.api.accessToken }`;

        this.collection.length = 0;

        return rp({
            'uri': url,
            'method': 'GET',
            'json': true
        })
        .then((locations) => {
            locations.forEach((data) => {
                this.collection.push(new LocationModel(this.api).load(data));
            });
            this.emit('collection:loaded');
        })
        .catch((error) => {
            this.emit('error:raw', error);
        });
    }
};
