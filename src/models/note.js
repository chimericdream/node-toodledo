'use strict';

const rp = require('request-promise-native');

const BaseModel = require('./base-model');

module.exports = class Note extends BaseModel {
    /* eslint-disable no-magic-numbers */

    static get VISIBILITY() {
        return {
            'SHARABLE': 0,
            'PRIVATE': 1
        };
    }

    /* eslint-enable no-magic-numbers */

    get defaults() {
        return {
            'id': 0,
            'title': '',
            'folder': 0,
            'modified': 0,
            'added': 0,
            'private': Note.VISIBILITY.SHARABLE,
            'text': ''
        };
    }

    fetch() {
        // eslint-disable-next-line max-len
        const url = `${ this.api.baseUrl }/notes/get.php?access_token=${ this.api.accessToken }`;

        return rp({
            'uri': url,
            'method': 'POST',
            'form': {'id': this.id},
            'json': true
        })
        .then((body) => {
            this.load(body[0]);
            this.emit('note:loaded');
        })
        .catch((response) => {
            this.emit('error:raw', response.error);
        });
    }

    create() {
        // eslint-disable-next-line max-len
        const url = `${ this.api.baseUrl }/notes/add.php?access_token=${ this.api.accessToken }`;

        return rp({
            'uri': url,
            'method': 'POST',
            'form': {
                'title': this.title,
                'folder': this.folder,
                'private': this.private,
                'added': this.added,
                'text': this.text
            },
            'json': true
        })
        .then((body) => {
            this.load(body[0]);
            this.emit('note:created');
        })
        .catch((response) => {
            this.emit('error:raw', response.error);
        });
    }

    save() {
        // eslint-disable-next-line max-len
        const url = `${ this.api.baseUrl }/notes/edit.php?access_token=${ this.api.accessToken }`;

        return rp({
            'uri': url,
            'method': 'POST',
            'form': {
                'id': this.id,
                'title': this.title,
                'folder': this.folder,
                'private': this.private,
                'text': this.text
            },
            'json': true
        })
        .then((body) => {
            this.load(body[0]);
            this.emit('note:changed');
        })
        .catch((response) => {
            this.emit('error:raw', response.error);
        });
    }

    destroy() {
        // eslint-disable-next-line max-len
        const url = `${ this.api.baseUrl }/notes/delete.php?access_token=${ this.api.accessToken }`;

        return rp({
            'uri': url,
            'method': 'POST',
            'form': {'notes': [this.id]},
            'json': true
        })
        .then(() => {
            this.emit('note:deleted', this);
        })
        .catch((response) => {
            this.emit('error:raw', response.error);
        });
    }
};
