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
api.refreshToken = tokens.refreshToken;
api.accessToken = tokens.accessToken;

let refreshTokens = function() {
    api.refreshAccessToken()
        .then((response) => {
            console.log(response);
            let tokens = {
                accessToken: response.access_token,
                refreshToken: response.refresh_token
            };
            api.loadTokens(tokens);
            fs.writeFile('tokens.json', JSON.stringify(tokens), () => {
                console.log('tokens.json updated successfully');
            });
        })
        .catch((response) => {
            console.log(response);
            let exception = api.getException(parseInt(response.error.errorCode), 'sample.js');
            console.log(exception);
        });
};

//let accountInfo = new TD.AccountInfo(api);
//accountInfo.fetch()
//    .then((body) => {
//        accountInfo.load(body);
//    })
//    .catch((response) => {
//        let exception = api.getException(parseInt(response.error.errorCode), 'sample.js');
//        if (exception.name === 'INVALID_ACCESS_TOKEN') {
//            refreshTokens();
//        } else {
//            console.log(exception);
//        }
//    });

//opn(api.getAuthUrl(), {app: ['chrome']});

//let server = http.createServer();
//server.listen(8081);
//server.on('request', (request, response) => {
//    let qs = url.parse(request.url, true).query;
//    if (qs.code) {
//        api.authCode = qs.code;
//        console.log('qs');
//        console.log(qs);
//        api.getAccessToken()
//            .then((response) => {
//                console.log('success');
//                console.log(response);
//                let tokens = {
//                    accessToken: response.access_token,
//                    refreshToken: response.refresh_token
//                };
//                api.loadTokens(tokens);
//                fs.writeFile('tokens.json', JSON.stringify(tokens), () => {
//                    console.log('tokens.json updated successfully');
//                });
//            }).catch((response) => {
//                console.log('error');
//                console.log(response);
//                console.log(response.error);
//            });
//    }
//    response.end();
//});
