'use strict';

const _ = require('lodash');
const uuid = require('node-uuid');

const proxy = require('./util/proxy');

module.exports = class Auth {
    constructor(options) {
        this.options = _.merge({
            client: {
                id: '',
                secret: ''
            },
            baseUrl: 'https://api.toodledo.com/3'
        }, options);

        return proxy(this);
    }

    authUrl() {
        return `${this.baseUrl}/account/authorize.php?response_type=code&client_id=${this.client.id}&state=${uuid.v4()}&scope=basic%20tasks%20notes%20outlines%20lists%20share%20write`;
    }
};
