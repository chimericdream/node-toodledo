'use strict';

const rp = require('request-promise-native');

const BaseCollection = require('./base-collection');
const TaskModel = require('../models/task');

module.exports = class Tasks extends BaseCollection {
    /* eslint-disable no-magic-numbers */

    static get TASK_STATE() {
        return {
            'COMPLETE': 1,
            'INCOMPLETE': 0,
            'ANY': -1
        };
    }

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
            'comp': Tasks.TASK_STATE.INCOMPLETE,
            'start': 0,
            'num': Tasks.FETCH_LIMIT,
            'fields': []
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

        if (this.searchParameters.num !== Tasks.FETCH_LIMIT) {
            url += `&num=${ this.searchParameters.num }`;
        }

        if (this.searchParameters.fields.length > 0) {
            url += this.searchParameters.fields.join(',');
        }

        return url;
    }

    /* eslint-enable complexity, max-statements */

    fetch() {
        // eslint-disable-next-line max-len
        const url = `${ this.api.baseUrl }/tasks/get.php?access_token=${ this.api.accessToken }`;

        this.collection.length = 0;

        return rp.get({
            'uri': this.buildFetchUrl(url),
            'json': true
        })
        .then((tasks) => {
            tasks.forEach((data) => {
                this.collection.push(new TaskModel(this.api).load(data));
            });
            this.emit('collection:loaded');
        })
        .catch((error) => {
            this.emit('error:raw', error);
        });
    }

    create() {
        // eslint-disable-next-line max-len
        const url = `${ this.api.baseUrl }/tasks/add.php?access_token=${ this.api.accessToken }`;

        return rp.post({
            'uri': url,
            'form': {
                'tasks': this.collection.map((task) => {
                    return {
                        'title': task.title,
                        'folder': task.folder,
                        'private': task.private,
                        'added': task.added,
                        'text': task.text
                    };
                })
            },
            'json': true
        })
        .then((tasks) => {
            this.collection.length = 0;

            tasks.forEach((data) => {
                this.collection.push(new TaskModel(this.api).load(data));
            });
            this.emit('collection:created');
        })
        .catch((response) => {
            this.emit('error:raw', response.error);
        });
    }

    save() {
        // eslint-disable-next-line max-len
        const url = `${ this.api.baseUrl }/tasks/edit.php?access_token=${ this.api.accessToken }`;

        return rp.post({
            'uri': url,
            'form': {
                'tasks': this.collection.map((task) => {
                    return {
                        'id': task.id,
                        'title': task.title,
                        'folder': task.folder,
                        'private': task.private,
                        'text': task.text
                    };
                })
            },
            'json': true
        })
        .then((tasks) => {
            this.collection.length = 0;

            tasks.forEach((data) => {
                this.collection.push(new TaskModel(this.api).load(data));
            });
            this.emit('tasks:changed');
        })
        .catch((response) => {
            this.emit('error:raw', response.error);
        });
    }

    destroy() {
        // eslint-disable-next-line max-len
        const url = `${ this.api.baseUrl }/tasks/delete.php?access_token=${ this.api.accessToken }`;

        return rp.post({
            'uri': url,
            'form': {
                'tasks': this.collection.map((task) => {
                    return task.id;
                })
            },
            'json': true
        })
        .then(() => {
            this.emit('tasks:deleted', this);
        })
        .catch((response) => {
            this.emit('error:raw', response.error);
        });
    }
};
