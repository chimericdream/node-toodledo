'use strict';

const fs = require('fs');
const http = require('http');
const opn = require('opn');
const url = require('url');
const util = require('util');

const credentials = require('./credentials');
const tokens = require('./tokens');
const TD = require('./src/toodledo-api');

let api = new TD.API(credentials);
let accountInfo = new TD.AccountInfo(api);

api.refreshToken = tokens.refreshToken;
api.accessToken = tokens.accessToken;

api.on('error', (exception) => {
    console.dir(exception);
});

api.on('tokens:loaded', (tokens) => {
    fs.writeFile('tokens.json', JSON.stringify(tokens), () => {
        console.log('tokens.json updated successfully');
    });
});

accountInfo.on('error', (exception) => {
    if (exception.name === 'INVALID_ACCESS_TOKEN') {
        api.refreshAccessToken();
    }
});

accountInfo.fetch();

//opn(api.getAuthUrl(), {app: ['chrome']});

//let server = http.createServer();
//server.listen(8081);
//server.on('request', (request, response) => {
//    let qs = url.parse(request.url, true).query;
//    if (qs.code) {
//        api.authCode = qs.code;
//        api.getAccessToken();
//    }
//    response.end();
//});
