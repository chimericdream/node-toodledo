'use strict';

const rp = require('request-promise-native');

const BaseModel = require('./base-model');

module.exports = class Folder extends BaseModel {
    /* eslint-disable no-magic-numbers */

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
            'private': Folder.VISIBILITY.SHARABLE,
            'archived': Folder.STATE.ACTIVE,
            'ord': 0
        };
    }

    create() {
        // eslint-disable-next-line max-len
        const url = `${ this.api.baseUrl }/folders/add.php?access_token=${ this.api.accessToken }`;

        return rp.post({
            'uri': url,
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
        const url = `${ this.api.baseUrl }/folders/edit.php?access_token=${ this.api.accessToken }`;

        return rp.post({
            'uri': url,
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
        const url = `${ this.api.baseUrl }/folders/delete.php?access_token=${ this.api.accessToken }`;

        return rp.post({
            'uri': url,
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
