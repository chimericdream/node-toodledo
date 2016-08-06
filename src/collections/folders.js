'use strict';

const rp = require('request-promise-native');

const FolderException = require('../exceptions/folder');
const FolderModel = require('../models/folder');

module.exports = class Folders {
    constructor(api) {
        this.api = api;
        this.folders = [];
    }

    fetch() {
        let url = `${this.api.baseUrl}/folders/get.php?access_token=${this.api.accessToken}`;
        this.folders.length = 0;
        return rp({
            uri: url,
            method: 'GET',
            json: true
        }).then((folders) => {
            folders.forEach((data) => {
                this.folders.push(new FolderModel(this.api, data));
            });
            console.dir(this.folders);
        }).catch((error) => {
            console.log(error);
        });
    };
};
