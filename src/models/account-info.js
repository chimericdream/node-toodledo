'use strict';

const rp = require('request-promise-native');

const BaseModel = require('./base-model');

module.exports = class AccountInfo extends BaseModel {
    get defaults() {
        return {
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
    }

    fetch() {
        return rp({
            // eslint-disable-next-line max-len
            'uri': `${ this.api.baseUrl }/account/get.php?access_token=${ this.api.accessToken }`,
            'method': 'GET',
            'json': true
        })
        .then((body) => {
            this.load(body);
            this.emit('account-info:loaded');
        })
        .catch((response) => {
            this.emit('error:raw', response.error);
        });
    }
};
