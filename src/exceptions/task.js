'use strict';

const ApiException = require('./api');

module.exports = class TaskException extends ApiException {

    /* eslint-disable no-magic-numbers, max-len */

    get TYPE() {
        return {
            'MISSING_TITLE': {
                'code': 601,
                'message': 'Your task must have a title.'
            },
            'REQUEST_TASK_LIMIT_EXCEEDED': {
                'code': 602,
                'message': 'Only 50 tasks can be added/edited/deleted at a time.'
            },
            'TASK_LIMIT_REACHED': {
                'code': 603,
                'message': 'The maximum number of tasks allowed per account (20000) has been reached'
            },
            'EMPTY_ID': {
                'code': 604,
                'message': 'Empty id'
            },
            'INVALID_TASK': {
                'code': 605,
                'message': 'Invalid task'
            },
            'NOTHING_MODIFIED': {
                'code': 606,
                'message': 'Nothing was added/edited.'
            },
            'INVALID_FOLDER_ID': {
                'code': 607,
                'message': 'Invalid folder id'
            },
            'INVALID_CONTEXT_ID': {
                'code': 608,
                'message': 'Invalid context id'
            },
            'INVALID_GOAL_ID': {
                'code': 609,
                'message': 'Invalid goal id'
            },
            'INVALID_LOCATION_ID': {
                'code': 610,
                'message': 'Invalid location id'
            },
            'MALFORMED_REQUEST': {
                'code': 611,
                'message': 'Malformed request'
            },
            'INVALID_PARENT_ID': {
                'code': 612,
                'message': 'Invalid parent id'
            },
            'INCORRECT_PARAMETERS': {
                'code': 613,
                'message': 'Incorrect field parameters'
            },
            'PARENT_DELETED': {
                'code': 614,
                'message': 'Parent was deleted'
            },
            'INVALID_COLLABORATOR': {
                'code': 615,
                'message': 'Invalid collaborator'
            },
            'UNABLE_TO_REASSIGN': {
                'code': 616,
                'message': 'Unable to reassign or share task'
            },
            'SUBSCRIPTION_REQUIRED': {
                'code': 617,
                'message': 'Requires Toodledo subscription'
            }
        };
    }

    /* eslint-disable no-magic-numbers, max-len */
};
