'use strict';

/* eslint-disable id-length */

const fs = require('fs');
const http = require('http');
const opn = require('opn');
const url = require('url');

const credentials = require('./credentials');
const tokens = require('./tokens');
const TD = require('./src/toodledo-api');

const HTTP_PORT = 8081;

/* eslint-enable id-length */

const api = new TD.API(credentials).loadTokens(tokens);
const server = http.createServer();

function generateAuthToken() {
    server.listen(HTTP_PORT);
    server.on('request', (request, response) => {
        // eslint-disable-next-line id-length
        const qs = url.parse(request.url, true).query;

        if (qs.code) {
            api.authCode = qs.code;
            api.getAccessToken();
        }
        response.end();
    });

    opn(api.getAuthUrl(), {'app': ['chrome']});
}

api.on('error', (exception) => {
    if (exception.extra === 'Invalid refresh token') {
        generateAuthToken();
    }
});

api.on('tokens:loaded', (newTokens) => {
    fs.writeFile('tokens.json', JSON.stringify(newTokens), (error) => {
        // TODO: handle error processing
    });
    server.close();
});

const accountInfo = new TD.AccountInfo(api);

accountInfo.on('error', (exception) => {
    if (exception.name === 'INVALID_ACCESS_TOKEN') {
        api.refreshAccessToken();
    }
});

accountInfo.fetch();

const folders = new TD.FolderCollection(api);
const contexts = new TD.ContextCollection(api);

folders.on('collection:loaded', () => {
    console.log('folders loaded');
    console.dir(folders.collection);
});

contexts.on('collection:loaded', () => {
    console.log('contexts loaded');
    console.dir(contexts.collection);
});

folders.fetch();
contexts.fetch();
