'use strict';

const ApiException = require('./api');

module.exports = class GoalException extends ApiException {
    get TYPE() {
        return {
            'NAME_REQUIRED': {
                'code': 401,
                'message': 'Your goal must have a name.'
            },
            'DUPLICATE_GOAL_NAME': {
                'code': 402,
                'message': 'A goal with that name already exists.'
            },
            'MAX_GOALS_REACHED': {
                'code': 403,
                'message': 'Max goals reached.'
            },
            'EMPTY_ID': {
                'code': 404,
                'message': 'Empty id.'
            },
            'INVALID_GOAL': {
                'code': 405,
                'message': 'Invalid goal.'
            },
            'NOTHING_EDITED': {
                'code': 406,
                'message': 'Nothing was edited.'
            }
        };
    };
};
