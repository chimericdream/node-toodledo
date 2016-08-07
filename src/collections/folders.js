'use strict';

const rp = require('request-promise-native');

const BaseCollection = require('./base-collection');
const FolderException = require('../exceptions/folder');
const FolderModel = require('../models/folder');

module.exports = class Folders extends BaseCollection {
    fetch() {
        let url = `${this.api.baseUrl}/folders/get.php?access_token=${this.api.accessToken}`;
        this.collection.length = 0;
        return rp({
            uri: url,
            method: 'GET',
            json: true
        })
        .then((folders) => {
            folders.forEach((data) => {
                this.collection.push(new FolderModel(this.api).load(data));
            });
            this.emit('collection:loaded');
        });
    };
};
