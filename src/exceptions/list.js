'use strict';

const ApiException = require('./api');

module.exports = class ListException extends ApiException {
    get TYPE() {
        return {
            'TITLE_REQUIRED': {
                'code': 901,
                'message': 'List had no title'
            },
            'REQUEST_LIST_LIMIT_EXCEEDED': {
                'code': 902,
                'message': 'Only 50 lists can be added/edited/deleted at a time.'
            },
            'MAX_LISTS_REACHED': {
                'code': 903,
                'message': 'Max lists reached'
            },
            'NOTHING_SENT': {
                'code': 904,
                'message': 'Empty id / nothing sent'
            },
            'INVALID_LIST': {
                'code': 905,
                'message': 'Invalid list'
            },
            'NOTHING_CHANGED': {
                'code': 906,
                'message': 'Nothing was added/edited'
            },
            'LIST_ALREADY_ADDED': {
                'code': 909,
                'message': 'List already added'
            },
            'MALFORMED_REQUEST': {
                'code': 911,
                'message': 'Malformed request'
            },
            'REFERENCE_WAS_EMPTY': {
                'code': 912,
                'message': 'Reference was empty'
            },
            'INVALID_COLS_FORMAT': {
                'code': 913,
                'message': 'Invalid cols format'
            },
            'EDITING_WRONG_VERSION': {
                'code': 914,
                'message': 'Editing wrong version'
            }
        };
    };
};
