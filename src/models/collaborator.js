'use strict';

const rp = require('request-promise-native');

const BaseModel = require('./base-model');

module.exports = class Collaborator extends BaseModel {
    /* eslint-disable no-magic-numbers */

    static get REASSIGNMENT() {
        return {
            'NOT_GRANTED': 0,
            'GRANTED': 1
        };
    }

    static get SHARED_TASKS() {
        return {
            'NOT_GRANTED': 0,
            'GRANTED': 1
        };
    }

    /* eslint-enable no-magic-numbers */

    get defaults() {
        return {
            'id': 0,
            'name': '',
            'reassignable': Collaborator.REASSIGNMENT.NOT_GRANTED,
            'sharable': Collaborator.SHARED_TASKS.NOT_GRANTED
        };
    }

    reassignTask(task) {
        // eslint-disable-next-line max-len
        const url = `${ this.api.baseUrl }/tasks/reassign.php?access_token=${ this.api.accessToken }`;

        return rp({
            'uri': url,
            'method': 'POST',
            'form': {
                'id': task.id,
                'assign': this.id
            },
            'json': true
        })
        .then(() => {
            this.emit('task:reassigned', task.id);
        })
        .catch((response) => {
            this.emit('error:raw', response.error);
        });
    }
};
