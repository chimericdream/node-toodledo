'use strict';

const _ = require('lodash');
const http = require('http');
const opn = require('opn');
const proxy = require('better-es6-proxies');
const url = require('url');
const uuid = require('node-uuid');

class API {
    constructor(options) {
        this.options = _.merge({
            clientID: '',
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
        return `${this.baseUrl}/account/authorize.php?response_type=code&client_id=${this.clientID}&state=${uuid.v4()}&scope=${this.getScope()}`;
    }
};

let api = new API({
    clientID: 'chimericdream'
});

//opn(api.authUrl(), {app: ['chrome']});

var server = http.createServer((request, response) => {
    var qs = url.parse(request.url, true).query;
    console.log("REQUEST\n\n");
    console.log(request);
    console.log("----------------------------\n\n");
    console.log("QS\n\n");
    console.log(qs);
    console.log('----------------------------');
    response.end();
});

server.listen(8081);
