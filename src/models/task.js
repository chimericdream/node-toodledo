'use strict';

const _ = require('lodash');
const proxy = require('proxy-mate');

module.exports = class Task {
    get DUE_DATE_MODIFIER() {
        return {
            'DUE_BY': 0,
            'DUE_ON': 1,
            'DUE_AFTER': 2,
            'DUE_OPTIONALLY': 3
        };
    };

    get STATUS() {
        return {
            'NONE': 0,
            'NEXT_ACTION': 1,
            'ACTIVE': 2,
            'PLANNING': 3,
            'DELEGATED': 4,
            'WAITING': 5,
            'HOLD': 6,
            'POSTPONED': 7,
            'SOMEDAY': 8,
            'CANCELED': 9,
            'REFERENCE': 10
        };
    };

    get PRIORITY() {
        return {
            'NEGATIVE': -1,
            'LOW': 0,
            'MEDIUM': 1,
            'HIGH': 2,
            'TOP': 3
        };
    };

    get VIA() {
        return {
            'WEBSITE': 0,
            'EMAIL': 1,
            'FIREFOX_ADDON': 2,
            'API': 3,
            'WIDGETS': 4,
            'NOT_USED': 5,
            'MOBILE_PHONE': 6,
            'IPHONE': 7,
            'IMPORT_TOOLS': 8,
            'TWITTER': 9
        };
    };

    constructor(api) {
        this.data = {
            'id': null,
            'title': null,
            'modified': null,
            'completed ': null,
            'folder': null,
            'context': null,
            'goal': null,
            'location': null,
            'tag': null,
            'startdate': null,
            'duedate': null,
            'duedatemod': null,
            'starttime': null,
            'duetime': null,
            'remind': null,
            'repeat': null,
            'status': null,
            'star': null,
            'priority': null,
            'length': null,
            'timer': null,
            'added': null,
            'note': null,
            'parent': null,
            'children': null,
            'order': null,
            'meta': null,
            'previous': null,
            'attachment': null,
            'shared': null,
            'addedby': null,
            'via': null,
            'attachments': null
        };

        this.api = api;

        return proxy(this, [], ['data']);
    }

    fetch() {
        if (!this.id) {
        }
    }
};
