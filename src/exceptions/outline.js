'use strict';

const ApiException = require('./api');

module.exports = class OutlineException extends ApiException {
    get TYPE() {
        return {
            'TITLE_REQUIRED': {
                'code': 801,
                'message': 'Outline had no title'
            },
            'REQUEST_OUTLINE_LIMIT_EXCEEDED': {
                'code': 802,
                'message': 'Only 50 outlines can be added/edited/deleted at a time.'
            },
            'MAX_OUTLINES_REACHED': {
                'code': 803,
                'message': 'Max outlines reached'
            },
            'NOTHING_SENT': {
                'code': 804,
                'message': 'Empty id / nothing sent'
            },
            'INVALID_OUTLINE': {
                'code': 805,
                'message': 'Invalid outline'
            },
            'NOTHING_CHANGED': {
                'code': 806,
                'message': 'Nothing was added/edited'
            },
            'INVALID_OUTLINE_ID': {
                'code': 807,
                'message': 'Invalid outline id'
            },
            'MAX_NODES_REACHED': {
                'code': 808,
                'message': 'Max nodes reached'
            },
            'OUTLINE_ALREADY_ADDED': {
                'code': 809,
                'message': 'Outline already added'
            },
            'MALFORMED_REQUEST': {
                'code': 811,
                'message': 'Malformed request'
            },
            'EMPTY_REFERENCE': {
                'code': 812,
                'message': 'Reference was empty'
            },
            'INVALID_OUTLINE_FORMAT': {
                'code': 813,
                'message': 'Invalid outline format'
            },
            'EDITING_WRONG_VERSION': {
                'code': 814,
                'message': 'Editing wrong version'
            }
        };
    };
};
