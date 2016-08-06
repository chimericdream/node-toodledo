'use strict';

const _ = require('lodash');
const proxy = require('proxy-mate');
const rp = require('request-promise-native');

module.exports = class AccountInfo {
    constructor(api) {
        this.data = {
            'userid': '',
            'alias': '',
            'email': '',
            'pro': 0,
            'dateformat': 0,
            'timezone': 0,
            'hidemonths': 0,
            'hotlistpriority': 0,
            'hotlistduedate': '',
            'hotliststar': 0,
            'hotliststatus': 0,
            'showtabnums': '',
            'lastedit_task': '',
            'lastdelete_task': '',
            'lastedit_folder': '',
            'lastedit_context': '',
            'lastedit_goal': '',
            'lastedit_location': '',
            'lastedit_note': '',
            'lastdelete_note': '',
            'lastedit_list': '',
            'lastedit_outline': ''
        };

        this.api = api;

        return proxy(this, [], ['data']);
    }

    fetch() {
        return rp({
            uri: `${this.api.baseUrl}/account/get.php?access_token=${this.api.accessToken}`,
            method: 'GET',
            json: true
        }).then((body) => {
            this.data = _.merge(this.data, body);
            console.log(this.data);
        }).catch((error) => {
            console.log(error);
        });
    }
};
