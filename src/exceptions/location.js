'use strict';

const ApiException = require('./api');

module.exports = class LocationException extends ApiException {

    /* eslint-disable no-magic-numbers, max-len */

    get TYPE() {
        return {
            'NAME_REQUIRED': {
                'code': 501,
                'message': 'Your location must have a name.'
            },
            'DUPLICATE_LOCATION_NAME': {
                'code': 502,
                'message': 'A location with that name already exists.'
            },
            'MAX_LOCATIONS_REACHED': {
                'code': 503,
                'message': 'Max locations reached.'
            },
            'EMPTY_ID': {
                'code': 504,
                'message': 'Empty id.'
            },
            'INVALID_LOCATION': {
                'code': 505,
                'message': 'Invalid location.'
            },
            'NOTHING_EDITED': {
                'code': 506,
                'message': 'Nothing was edited.'
            }
        };
    }

    /* eslint-enable no-magic-numbers, max-len */
};
