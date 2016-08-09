'use strict';

const ApiException = require('./api');

module.exports = class RowException extends ApiException {

    /* eslint-disable no-magic-numbers, max-len */

    get TYPE() {
        return {
            'NO_CELLS_IN_ROW': {
                'code': 1001,
                'message': 'Row had no cells'
            },
            'REQUEST_ROW_LIMIT_EXCEEDED': {
                'code': 1002,
                'message': 'Only 50 rows can be added/edited/deleted at a time.'
            },
            'MAX_ROWS_REACHED': {
                'code': 1003,
                'message': 'Max rows reached'
            },
            'NOTHING_SENT': {
                'code': 1004,
                'message': 'Empty id / nothing sent'
            },
            'INVALID_LIST': {
                'code': 1005,
                'message': 'Invalid list'
            },
            'NOTHING_CHANGED': {
                'code': 1006,
                'message': 'Nothing was added/edited'
            },
            'INVALID_ROW': {
                'code': 1007,
                'message': 'Invalid row'
            },
            'ROW_ALREADY_ADDED': {
                'code': 1009,
                'message': 'Row already added'
            },
            'MALFORMED_REQUEST': {
                'code': 1011,
                'message': 'Malformed request'
            },
            'REFERENCE_WAS_EMPTY': {
                'code': 1012,
                'message': 'Reference was empty'
            },
            'INVALID_CELLS_FORMAT': {
                'code': 1013,
                'message': 'Invalid cells format'
            },
            'EDITING_WRONG_VERSION': {
                'code': 1014,
                'message': 'Editing wrong version'
            }
        };
    }

    /* eslint-enable no-magic-numbers, max-len */
};
