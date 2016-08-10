'use strict';

const rp = require('request-promise-native');

const BaseModel = require('./base-model');

module.exports = class Goal extends BaseModel {
    /* eslint-disable no-magic-numbers */

    static get LEVEL() {
        return {
            'LIFETIME': 0,
            'LONG_TERM': 1,
            'SHORT_TERM': 2
        };
    }

    static get VISIBILITY() {
        return {
            'SHARABLE': 0,
            'PRIVATE': 1
        };
    }

    static get STATE() {
        return {
            'ACTIVE': 0,
            'ARCHIVED': 1
        };
    }

    /* eslint-enable no-magic-numbers */

    get defaults() {
        return {
            'id': 0,
            'name': '',
            'level': 0,
            'contributes': 0,
            'archived': 0,
            'private': 0,
            'note': ''
        };
    }

    create() {
        // eslint-disable-next-line max-len
        const url = `${ this.api.baseUrl }/goals/add.php?access_token=${ this.api.accessToken }`;

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
            this.emit('folder:created');
        })
        .catch((response) => {
            this.emit('error:raw', response.error);
        });
    }

    save() {
        // eslint-disable-next-line max-len
        const url = `${ this.api.baseUrl }/goals/edit.php?access_token=${ this.api.accessToken }`;

        return rp({
            'uri': url,
            'method': 'POST',
            'form': {
                'id': this.id,
                'name': this.name,
                'private': this.private,
                'archived': this.archived
            },
            'json': true
        })
        .then((body) => {
            this.load(body[0]);
            this.emit('folder:changed');
        })
        .catch((response) => {
            this.emit('error:raw', response.error);
        });
    }

    destroy() {
        // eslint-disable-next-line max-len
        const url = `${ this.api.baseUrl }/goals/delete.php?access_token=${ this.api.accessToken }`;

        return rp({
            'uri': url,
            'method': 'POST',
            'form': {'id': this.id},
            'json': true
        })
        .then(() => {
            this.emit('folder:deleted', this);
        })
        .catch((response) => {
            this.emit('error:raw', response.error);
        });
    }
};
