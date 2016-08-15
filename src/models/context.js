'use strict';

const rp = require('request-promise-native');

const BaseModel = require('./base-model');

module.exports = class Context extends BaseModel {
    static get VISIBILITY() {
        return {
            'SHARABLE': 0,
            'PRIVATE': 1
        };
    }

    get defaults() {
        return {
            'id': 0,
            'name': '',
            'private': Context.VISIBILITY.PRIVATE
        };
    }

    create() {
        // eslint-disable-next-line max-len
        const url = `${ this.api.baseUrl }/contexts/add.php?access_token=${ this.api.accessToken }`;

        return rp({
            'uri': url,
            'method': 'POST',
            'form': {
                'name': this.name,
                'private': this.private
            },
            'json': true
        })
        .then((body) => {
            this.load(body[0]);
            this.emit('context:created');
        })
        .catch((response) => {
            this.emit('error:raw', response.error);
        });
    }

    save() {
        // eslint-disable-next-line max-len
        const url = `${ this.api.baseUrl }/contexts/edit.php?access_token=${ this.api.accessToken }`;

        return rp({
            'uri': url,
            'method': 'POST',
            'form': {
                'id': this.id,
                'name': this.name,
                'private': this.private
            },
            'json': true
        })
        .then((body) => {
            this.load(body[0]);
            this.emit('context:changed');
        })
        .catch((response) => {
            this.emit('error:raw', response.error);
        });
    }

    destroy() {
        // eslint-disable-next-line max-len
        const url = `${ this.api.baseUrl }/contexts/delete.php?access_token=${ this.api.accessToken }`;

        return rp({
            'uri': url,
            'method': 'POST',
            'form': {'id': this.id},
            'json': true
        })
        .then(() => {
            this.emit('context:deleted', this);
        })
        .catch((response) => {
            this.emit('error:raw', response.error);
        });
    }
};
