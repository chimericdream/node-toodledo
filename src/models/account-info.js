'use strict';

const _ = require('lodash');
const proxy = require('proxy-mate');

module.exports = class AccountInfo {
    constructor(data) {
        this.data = _.merge({
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
        }, data);

        return proxy(this, ['data'], ['data']);
    }
};
