'use strict';

const rp = require('request-promise-native');

const BaseCollection = require('./base-collection');
const GoalModel = require('../models/goal');

module.exports = class Goals extends BaseCollection {
    fetch() {
        // eslint-disable-next-line max-len
        const url = `${ this.api.baseUrl }/goals/get.php?access_token=${ this.api.accessToken }`;

        this.collection.length = 0;

        return rp({
            'uri': url,
            'method': 'GET',
            'json': true
        })
        .then((goals) => {
            goals.forEach((data) => {
                this.collection.push(new GoalModel(this.api).load(data));
            });
            this.emit('collection:loaded');
        })
        .catch((error) => {
            this.emit('error:raw', error);
        });
    }
};
