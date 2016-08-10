'use strict';

const BaseModel = require('./base-model');

module.exports = class Task extends BaseModel {
    /* eslint-disable no-magic-numbers */

    static get DUE_DATE_MODIFIER() {
        return {
            'DUE_BY': 0,
            'DUE_ON': 1,
            'DUE_AFTER': 2,
            'DUE_OPTIONALLY': 3
        };
    }

    static get STATUS() {
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
    }

    static get PRIORITY() {
        return {
            'NEGATIVE': -1,
            'LOW': 0,
            'MEDIUM': 1,
            'HIGH': 2,
            'TOP': 3
        };
    }

    static get VIA() {
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
    }

    /* eslint-enable no-magic-numbers */

    get defaults() {
        return {
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
    }

    fetch() {
        if (!this.id) {
            // TODO
        }
    }
};
