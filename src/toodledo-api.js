'use strict';

const _ = require('lodash');
const rp = require('request-promise-native');
const proxy = require('proxy-mate');
const uuid = require('node-uuid');

const events = require('events');
const EventEmitter = events.EventEmitter;

const btoa = require('./lib/btoa');

// Exceptions
const AccountException = require('./exceptions/account');
const ApiException = require('./exceptions/api');
const ContextException = require('./exceptions/context');
const FolderException = require('./exceptions/folder');
const GoalException = require('./exceptions/goal');
const ListException = require('./exceptions/list');
const LocationException = require('./exceptions/location');
const NoteException = require('./exceptions/note');
const OutlineException = require('./exceptions/outline');
const RowException = require('./exceptions/row');
const TaskException = require('./exceptions/task');

// Models
const AccountInfo = require('./models/account-info');
const AttachmentModel = require('./models/attachment');
const BaseModel = require('./models/base-model');
const CollaboratorModel = require('./models/collaborator');
const ContextModel = require('./models/context');
const FolderModel = require('./models/folder');
const GoalModel = require('./models/goal');
const ListModel = require('./models/list');
const LocationModel = require('./models/location');
const NoteModel = require('./models/note');
const OutlineModel = require('./models/outline');
const RowModel = require('./models/row');
const SavedSearchModel = require('./models/saved-search');
const TaskModel = require('./models/task');

// Collections
const BaseCollection = require('./collections/base-collection');
const CollaboratorCollection = require('./collections/collaborators');
const ContextCollection = require('./collections/contexts');
const FolderCollection = require('./collections/folders');
const GoalCollection = require('./collections/goals');
const ListCollection = require('./collections/lists');
const LocationCollection = require('./collections/locations');
const NoteCollection = require('./collections/notes');
const OutlineCollection = require('./collections/outlines');
const RowCollection = require('./collections/rows');
const SavedSearchCollection = require('./collections/saved-searches');
const TaskCollection = require('./collections/tasks');

class ToodledoApi extends EventEmitter {
    constructor(options) {
        super();

        this.options = _.merge({
            'clientId': '',
            'clientSecret': '',
            'baseUrl': 'https://api.toodledo.com/3',
            'scopes': {
                'basic': true,
                'tasks': true,
                'notes': true,
                'outlines': true,
                'lists': true,
                'share': true,
                'write': true
            }
        }, options);

        this.authCode = '';
        this.accessToken = '';
        this.refreshToken = '';

        this.account = null;

        this.on('error:raw', (error, file, line) => {
            let extra;

            if (typeof error.errorDesc !== 'undefined') {
                extra = error.errorDesc;
            }

            const exception = this.getException(
                parseInt(error.errorCode, 10),
                file,
                line,
                extra
            );

            this.emit('error', exception);
        });

        return proxy(this, ['options'], ['options']);
    }

    getException(errorCode, file = '', line = 0, extra = '') {
        /* eslint-disable no-magic-numbers, max-len */

        const exceptionTypes = {
            'AccountException': [101, 102, 103],
            'ApiException': [0, 1, 2, 3, 4],
            'ContextException': [301, 302, 303, 304, 305, 306],
            'FolderException': [201, 202, 203, 204, 205, 206],
            'GoalException': [401, 402, 403, 404, 405, 406],
            'ListException': [901, 902, 903, 904, 905, 906, 909, 911, 912, 913, 914],
            'LocationException': [501, 502, 503, 504, 505, 506],
            'NoteException': [701, 702, 703, 704, 705, 706, 707, 711],
            'OutlineException': [801, 802, 803, 804, 805, 806, 807, 808, 809, 811, 812, 813, 814],
            'RowException': [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1009, 1011, 1012, 1013, 1014],
            'TaskException': [601, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 615, 616, 617]
        };

        const classes = {
            AccountException,
            ApiException,
            ContextException,
            FolderException,
            GoalException,
            ListException,
            LocationException,
            NoteException,
            OutlineException,
            RowException,
            TaskException
        };

        /* eslint-enable no-magic-numbers, max-len */

        let exception;

        Object.keys(exceptionTypes).forEach((key) => {
            if (exceptionTypes[key].includes(errorCode)) {
                exception = new classes[key](errorCode, file, line, extra);
            }
        });

        return exception;
    }

    loadTokens(tokens) {
        this.accessToken = tokens.accessToken;
        this.refreshToken = tokens.refreshToken;

        return this;
    }

    getScope() {
        let str;

        str = '';
        Object.keys(this.scopes).forEach((scope) => {
            if (this.scopes[scope]) {
                str += `${ scope }%20`;
            }
        });

        return str.replace(/^(.+)%20$/, '$1');
    }

    getAuthUrl() {
        // eslint-disable-next-line max-len
        return `${ this.baseUrl }/account/authorize.php?response_type=code&client_id=${ this.clientId }&state=${ uuid.v4() }&scope=${ this.getScope() }`;
    }

    getAccessToken() {
        const header = btoa(`${ this.clientId }:${ this.clientSecret }`);

        return rp.post({
            'uri': `${ this.baseUrl }/account/token.php`,
            'headers': {'Authorization': `Basic ${ header }`},
            'body': {
                'grant_type': 'authorization_code',
                'code': this.authCode
            },
            'json': true
        })
        .then((response) => {
            const tokens = {
                'accessToken': response.access_token,
                'refreshToken': response.refresh_token
            };

            this.loadTokens(tokens);
            this.emit('tokens:loaded', tokens);
        })
        .catch((response) => {
            this.emit('error:raw', response.error);
        });
    }

    refreshAccessToken() {
        const header = btoa(`${ this.clientId }:${ this.clientSecret }`);

        return rp.post({
            'uri': `${ this.baseUrl }/account/token.php`,
            'headers': {'Authorization': `Basic ${ header }`},
            'body': {
                'grant_type': 'refresh_token',
                'refresh_token': this.refreshToken
            },
            'json': true
        })
        .then((response) => {
            const tokens = {
                'accessToken': response.access_token,
                'refreshToken': response.refresh_token
            };

            this.loadTokens(tokens);
            this.emit('tokens:loaded', tokens);
        })
        .catch((response) => {
            this.emit('error:raw', response.error);
        });
    }
}

module.exports = {
    'API': ToodledoApi,

    // Exceptions
    AccountException,
    ApiException,
    ContextException,
    FolderException,
    GoalException,
    ListException,
    LocationException,
    NoteException,
    OutlineException,
    RowException,
    TaskException,

    // Models
    AccountInfo,
    AttachmentModel,
    BaseModel,
    CollaboratorModel,
    ContextModel,
    FolderModel,
    GoalModel,
    ListModel,
    LocationModel,
    NoteModel,
    OutlineModel,
    RowModel,
    SavedSearchModel,
    TaskModel,

    // Collections
    BaseCollection,
    CollaboratorCollection,
    ContextCollection,
    FolderCollection,
    GoalCollection,
    ListCollection,
    LocationCollection,
    NoteCollection,
    OutlineCollection,
    RowCollection,
    SavedSearchCollection,
    TaskCollection
};
