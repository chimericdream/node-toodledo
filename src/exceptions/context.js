'use strict';

const ApiException = require('./api');

module.exports = class ContextException extends ApiException {
    get TYPE() {
        return {
            'NAME_REQUIRED': {
                'code': 301,
                'message': 'Your context must have a name.'
            },
            'DUPLICATE_CONTEXT_NAME': {
                'code': 302,
                'message': 'A context with that name already exists.'
            },
            'MAX_CONTEXTS_REACHED': {
                'code': 303,
                'message': 'Max contexts reached.'
            },
            'EMPTY_ID': {
                'code': 304,
                'message': 'Empty id.'
            },
            'INVALID_CONTEXT': {
                'code': 305,
                'message': 'Invalid context.'
            },
            'NOTHING_EDITED': {
                'code': 306,
                'message': 'Nothing was edited.'
            }
        };
    };
};
