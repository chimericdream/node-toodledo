'use strict';

const ApiException = require('./api');

module.exports = class FolderException extends ApiException {

    /* eslint-disable no-magic-numbers, max-len */

    get TYPE() {
        return {
            'NAME_REQUIRED': {
                'code': 201,
                'message': 'Your folder must have a name.'
            },
            'DUPLICATE_FOLDER_NAME': {
                'code': 202,
                'message': 'A folder with that name already exists.'
            },
            'MAX_FOLDERS_REACHED': {
                'code': 203,
                'message': 'Max folders reached.'
            },
            'EMPTY_ID': {
                'code': 204,
                'message': 'Empty id.'
            },
            'INVALID_FOLDER': {
                'code': 205,
                'message': 'Invalid folder.'
            },
            'NOTHING_EDITED': {
                'code': 206,
                'message': 'Nothing was edited.'
            }
        };
    }

    /* eslint-enable no-magic-numbers, max-len */
};
