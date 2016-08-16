'use strict';

const rp = require('request-promise-native');

const BaseCollection = require('./base-collection');
const NoteModel = require('../models/note');

module.exports = class Notes extends BaseCollection {
    /* eslint-disable no-magic-numbers */

    static get FETCH_LIMIT() {
        return 1000;
    }

    /* eslint-enable no-magic-numbers */

    constructor(api) {
        super(api);

        this.searchParameters = {
            // eslint-disable-next-line no-magic-numbers
            'before': -1,

            // eslint-disable-next-line no-magic-numbers
            'after': -1,
            'start': 0,
            'num': Notes.FETCH_LIMIT
        };
    }

    /* eslint-disable complexity, max-statements */

    buildFetchUrl(base) {
        let url;

        url = base;

        // eslint-disable-next-line no-magic-numbers
        if (this.searchParameters.before !== -1) {
            url += `&before=${ this.searchParameters.before }`;
        }

        // eslint-disable-next-line no-magic-numbers
        if (this.searchParameters.after !== -1) {
            url += `&after=${ this.searchParameters.after }`;
        }

        if (this.searchParameters.start !== 0) {
            url += `&start=${ this.searchParameters.start }`;
        }

        if (this.searchParameters.num !== Notes.FETCH_LIMIT) {
            url += `&num=${ this.searchParameters.num }`;
        }

        return url;
    }

    /* eslint-enable complexity, max-statements */

    fetch() {
        // eslint-disable-next-line max-len
        const url = `${ this.api.baseUrl }/notes/get.php?access_token=${ this.api.accessToken }`;

        this.collection.length = 0;

        return rp.get({
            'uri': this.buildFetchUrl(url),
            'json': true
        })
        .then((notes) => {
            notes.forEach((data) => {
                this.collection.push(new NoteModel(this.api).load(data));
            });
            this.emit('collection:loaded');
        })
        .catch((error) => {
            this.emit('error:raw', error);
        });
    }

    create() {
        // eslint-disable-next-line max-len
        const url = `${ this.api.baseUrl }/notes/add.php?access_token=${ this.api.accessToken }`;

        return rp.post({
            'uri': url,
            'form': {
                'notes': this.collection.map((note) => {
                    return {
                        'title': note.title,
                        'folder': note.folder,
                        'private': note.private,
                        'added': note.added,
                        'text': note.text
                    };
                })
            },
            'json': true
        })
        .then((notes) => {
            this.collection.length = 0;

            notes.forEach((data) => {
                this.collection.push(new NoteModel(this.api).load(data));
            });
            this.emit('collection:created');
        })
        .catch((response) => {
            this.emit('error:raw', response.error);
        });
    }

    save() {
        // eslint-disable-next-line max-len
        const url = `${ this.api.baseUrl }/notes/edit.php?access_token=${ this.api.accessToken }`;

        return rp.post({
            'uri': url,
            'form': {
                'notes': this.collection.map((note) => {
                    return {
                        'id': note.id,
                        'title': note.title,
                        'folder': note.folder,
                        'private': note.private,
                        'text': note.text
                    };
                })
            },
            'json': true
        })
        .then((notes) => {
            this.collection.length = 0;

            notes.forEach((data) => {
                this.collection.push(new NoteModel(this.api).load(data));
            });
            this.emit('notes:changed');
        })
        .catch((response) => {
            this.emit('error:raw', response.error);
        });
    }

    destroy() {
        // eslint-disable-next-line max-len
        const url = `${ this.api.baseUrl }/notes/delete.php?access_token=${ this.api.accessToken }`;

        return rp.post({
            'uri': url,
            'form': {
                'notes': this.collection.map((note) => {
                    return note.id;
                })
            },
            'json': true
        })
        .then(() => {
            this.emit('notes:deleted', this);
        })
        .catch((response) => {
            this.emit('error:raw', response.error);
        });
    }
};
