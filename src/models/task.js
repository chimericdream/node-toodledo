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

    static get SHARED() {
        return {
            'NO': 0,
            'YES': 1
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
            'id': '',
            'title': '',
            'modified': '',
            'completed ': 0,
            'folder': 0,
            'context': 0,
            'goal': 0,
            'location': 0,
            'tag': '',
            'startdate': '',
            'duedate': '',
            'duedatemod': Task.DUE_DATE_MODIFIER.DUE_BY,
            'starttime': '',
            'duetime': '',
            'remind': 0,
            'repeat': '',
            'status': Task.STATUS.NONE,
            'star': 0,
            'priority': 0,
            'length': 0,
            'timer': 0,
            'added': '',
            'note': '',
            'parent': 0,
            'children': 0,
            'order': 0,
            'meta': '',
            'previous': 0,
            'attachment': [],
            'shared': Task.SHARED.NO,
            'addedby': 0,
            'via': Task.VIA.API
        };
    }
};
