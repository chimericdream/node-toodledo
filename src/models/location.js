'use strict';

const rp = require('request-promise-native');

const BaseModel = require('./base-model');

module.exports = class Location extends BaseModel {
    get defaults() {
        return {
            'id': 0,
            'name': '',
            'description': '',
            'lat': 0.00,
            'long': 0.00
        };
    }

    create() {
        // eslint-disable-next-line max-len
        const url = `${ this.api.baseUrl }/locations/add.php?access_token=${ this.api.accessToken }`;

        return rp({
            'uri': url,
            'method': 'POST',
            'form': {
                'name': this.name,
                'description': this.description,
                'lat': this.lat,
                'long': this.long
            },
            'json': true
        })
        .then((body) => {
            this.load(body[0]);
            this.emit('location:created');
        })
        .catch((response) => {
            this.emit('error:raw', response.error);
        });
    }

    save() {
        // eslint-disable-next-line max-len
        const url = `${ this.api.baseUrl }/locations/edit.php?access_token=${ this.api.accessToken }`;

        return rp({
            'uri': url,
            'method': 'POST',
            'form': {
                'id': this.id,
                'name': this.name,
                'description': this.description,
                'lat': this.lat,
                'long': this.long
            },
            'json': true
        })
        .then((body) => {
            this.load(body[0]);
            this.emit('location:changed');
        })
        .catch((response) => {
            this.emit('error:raw', response.error);
        });
    }

    destroy() {
        // eslint-disable-next-line max-len
        const url = `${ this.api.baseUrl }/locations/delete.php?access_token=${ this.api.accessToken }`;

        return rp({
            'uri': url,
            'method': 'POST',
            'form': {'id': this.id},
            'json': true
        })
        .then(() => {
            this.emit('location:deleted', this);
        })
        .catch((response) => {
            this.emit('error:raw', response.error);
        });
    }
};
