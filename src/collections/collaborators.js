'use strict';

const rp = require('request-promise-native');

const BaseCollection = require('./base-collection');
const CollaboratorModel = require('../models/collaborator');

module.exports = class Collaborators extends BaseCollection {
    fetch() {
        // eslint-disable-next-line max-len
        const url = `${ this.api.baseUrl }/collaborators/get.php?access_token=${ this.api.accessToken }`;

        this.collection.length = 0;

        return rp({
            'uri': url,
            'method': 'GET',
            'json': true
        })
        .then((collaborators) => {
            collaborators.forEach((data) => {
                // eslint-disable-next-line max-len
                this.collection.push(new CollaboratorModel(this.api).load(data));
            });
            this.emit('collection:loaded');
        })
        .catch((error) => {
            this.emit('error:raw', error);
        });
    }

    shareTask(task, collaborators) {
        // eslint-disable-next-line max-len
        const url = `${ this.api.baseUrl }/tasks/reassign.php?access_token=${ this.api.accessToken }`;

        return rp({
            'uri': url,
            'method': 'POST',
            'form': {
                'id': task.id,
                'share': collaborators.map((collaborator) => {
                    return collaborator.id;
                })
            },
            'json': true
        })
        .then(() => {
            this.emit('task:shared', task.id);
        })
        .catch((response) => {
            this.emit('error:raw', response.error);
        });
    }
};
