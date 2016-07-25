'use strict';

const Auth = require('./lib/auth');
//const httpServer = require('./http-server');

var temp = new Auth({
    client: {
        id: 'chimericdream',
        secret: 'secret'
    }
});

//console.log(temp.authUrl());
//console.log(temp.client.id);
//console.log(temp.someprop);
//temp.someprop = 'newval';
//console.log(temp.someprop);
//console.log(temp.objprop);
//temp.objprop.c = 'newobjprop';
//console.log(temp.objprop);
//console.log(temp.undefprop);
//temp.undefprop = 'no longer undefined';
//console.log(temp.undefprop);
//
module.exports = {};
