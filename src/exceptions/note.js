'use strict';

const ApiException = require('./api');

module.exports = class NoteException extends ApiException {

    /* eslint-disable no-magic-numbers, max-len */

    get TYPE() {
        return {
            'NAME_REQUIRED': {
                'code': 701,
                'message': 'Your note must have a name.'
            },
            'REQUEST_NOTE_LIMIT_EXCEEDED': {
                'code': 702,
                'message': 'Only 50 notes can be added/edited/deleted at a time.'
            },
            'MAX_NOTES_REACHED': {
                'code': 703,
                'message': 'Max notes reached'
            },
            'EMPTY_ID': {
                'code': 704,
                'message': 'Empty id'
            },
            'INVALID_NOTE': {
                'code': 705,
                'message': 'Invalid note'
            },
            'NOTHING_CHANGED': {
                'code': 706,
                'message': 'Nothing was added/edited'
            },
            'INVALID_FOLDER_ID': {
                'code': 707,
                'message': 'Invalid folder id'
            },
            'MALFORMED_REQUEST': {
                'code': 711,
                'message': 'Malformed request'
            }
        };
    }

    /* eslint-enable no-magic-numbers, max-len */
};
