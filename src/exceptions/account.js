'use strict';

const ApiException = require('./api');

module.exports = class AccountException extends ApiException {

    /* eslint-disable no-magic-numbers, max-len */

    get TYPE() {
        return {
            'SSL_REQUIRED': {
                'code': 101,
                'message': 'SSL connection is required when requesting a token.'
            },
            'TOKEN_REQUEST_ERROR': {
                'code': 102,
                'message': 'There was an error requesting a token.'
            },
            'TOO_MANY_TOKEN_REQUESTS': {
                'code': 103,
                'message': 'Too many token requests.'
            }
        };
    }

    /* eslint-enable no-magic-numbers, max-len */
};
