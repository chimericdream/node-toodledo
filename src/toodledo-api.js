'use strict';

const _ = require('lodash');
const rp = require('request-promise-native');
const proxy = require('proxy-mate');
const uuid = require('node-uuid');

const btoa = require('./lib/btoa');

const AccountInfo = require('./models/account-info');

module.exports = class ToodledoApi {
    constructor(options) {
        this.options = _.merge({
            clientId: '',
            clientSecret: '',
            baseUrl: 'https://api.toodledo.com/3',
            scopes: {
                basic: true,
                tasks: true,
                notes: true,
                outlines: true,
                lists: true,
                share: true,
                write: true
            }
        }, options);

        this.authCode = '';
        this.accessToken = '';
        this.refreshToken = '';

        this.account = null;

        return proxy(this, ['options'], ['options']);
    }

    getScope() {
        let str = '';
        Object.keys(this.scopes).forEach((scope) => {
            if (this.scopes[scope]) {
                str += `${scope}%20`;
            }
        });
        return str.replace(/^(.+)\%20$/, '$1');
    }

    authUrl() {
        return `${this.baseUrl}/account/authorize.php?response_type=code&client_id=${this.clientId}&state=${uuid.v4()}&scope=${this.getScope()}`;
    }

    getAccessToken() {
        return rp({
            uri: `${this.baseUrl}/account/token.php`,
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
            },
            body: {
                grant_type: 'authorization_code',
                code: this.authCode
            },
            json: true
        }).then((body) => {
            this.accessToken = body.access_token;
            this.refreshToken = body.refresh_token;
        }).catch((error) => {
            console.log(error);
        });
    }

    refreshAccessToken() {
        return rp({
            uri: `${this.baseUrl}/account/token.php`,
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
            },
            body: {
                grant_type: 'refresh_token',
                refresh_token: this.refreshToken
            },
            json: true
        }).then((body) => {
            this.accessToken = body.access_token;
            this.refreshToken = body.refresh_token;
            console.dir(body);
        }).catch((error) => {
            console.log(error);
        });
    }

    getAccountInfo() {
        return rp({
            uri: `${this.baseUrl}/account/get.php?access_token=${this.accessToken}`,
            method: 'GET',
            json: true
        }).then((body) => {
            this.account = new AccountInfo(body);
            console.log(this.account);
        }).catch((error) => {
            console.log(error);
        });
    }
};
