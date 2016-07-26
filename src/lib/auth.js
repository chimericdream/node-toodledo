'use strict';

const _ = require('lodash');
const proxy = require('better-es6-proxies');
const uuid = require('node-uuid');

module.exports = class Auth {
    constructor(options) {
        this.options = _.merge({
            client: {
                id: '',
                secret: ''
            },
            baseUrl: 'https://api.toodledo.com/3'
        }, options);

        return proxy(this, ['options'], ['options']);
    }

    authUrl() {
        return `${this.baseUrl}/account/authorize.php?response_type=code&client_id=${this.client.id}&state=${uuid.v4()}&scope=basic%20tasks%20notes%20outlines%20lists%20share%20write`;
    }
};
