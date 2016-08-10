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
            clientId: '',
            clientSecret: '',
            baseUrl: 'https://api.toodledo.com/3',
            scopes: {
                basic: true,
                tasks: true,
                notes: true,
                outlines: true,
                lists: true,
                share: true,
                write: true
            }
        }, options);

        this.authCode = '';
        this.accessToken = '';
        this.refreshToken = '';

        this.account = null;

        this.on('error:raw', (error, file, line) => {
            let exception = this.getException(
                parseInt(error.errorCode),
                file,
                line
            );

            this.emit('error', exception);
        });

        return proxy(this, ['options'], ['options']);
    }

    getException(errorCode, file = '', line = 0) {
        console.log(errorCode);
        let exceptionTypes = {
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

        let exception;
        Object.keys(exceptionTypes).forEach((key) => {
            if (exceptionTypes[key].includes(errorCode)) {
                switch (key) {
                    case 'AccountException':
                        exception = new AccountException(errorCode, file, line);
                        break;
                    case 'ApiException':
                        exception = new ApiException(errorCode, file, line);
                        break;
                    case 'ContextException':
                        exception = new ContextException(errorCode, file, line);
                        break;
                    case 'FolderException':
                        exception = new FolderException(errorCode, file, line);
                        break;
                    case 'GoalException':
                        exception = new GoalException(errorCode, file, line);
                        break;
                    case 'ListException':
                        exception = new ListException(errorCode, file, line);
                        break;
                    case 'LocationException':
                        exception = new LocationException(errorCode, file, line);
                        break;
                    case 'NoteException':
                        exception = new NoteException(errorCode, file, line);
                        break;
                    case 'OutlineException':
                        exception = new OutlineException(errorCode, file, line);
                        break;
                    case 'RowException':
                        exception = new RowException(errorCode, file, line);
                        break;
                    case 'TaskException':
                        exception = new TaskException(errorCode, file, line);
                        break;
                }
            }
        });
        return exception;
    };

    loadTokens(tokens) {
        this.accessToken = tokens.accessToken;
        this.refreshToken = tokens.refreshToken;
    };

    getScope() {
        let str = '';
        Object.keys(this.scopes).forEach((scope) => {
            if (this.scopes[scope]) {
                str += `${scope}%20`;
            }
        });
        return str.replace(/^(.+)\%20$/, '$1');
    }

    getAuthUrl() {
        return `${this.baseUrl}/account/authorize.php?response_type=code&client_id=${this.clientId}&state=${uuid.v4()}&scope=${this.getScope()}`;
    }

    getAccessToken() {
        return rp({
            uri: `${this.baseUrl}/account/token.php`,
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
            },
            body: {
                grant_type: 'authorization_code',
                code: this.authCode
            },
            json: true
        })
        .then((response) => {
            let tokens = {
                accessToken: response.access_token,
                refreshToken: response.refresh_token
            };
            this.loadTokens(tokens);
            this.emit('tokens:loaded', tokens);
        })
        .catch((error) => {
            this.emit('error:raw', error);
        });
    }

    refreshAccessToken() {
        return rp({
            uri: `${this.baseUrl}/account/token.php`,
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
            },
            body: {
                grant_type: 'refresh_token',
                refresh_token: this.refreshToken
            },
            json: true
        })
        .then((response) => {
            let tokens = {
                accessToken: response.access_token,
                refreshToken: response.refresh_token
            };
            this.loadTokens(tokens);
            this.emit('tokens:loaded', tokens);
        })
        .catch((error) => {
            this.emit('error:raw', error);
        });
    }
};

module.exports = {
    API: ToodledoApi,

    // Exceptions
    AccountException: AccountException,
    ApiException: ApiException,
    ContextException: ContextException,
    FolderException: FolderException,
    GoalException: GoalException,
    ListException: ListException,
    LocationException: LocationException,
    NoteException: NoteException,
    OutlineException: OutlineException,
    RowException: RowException,
    TaskException: TaskException,

    // Models
    AccountInfo: AccountInfo,
    AttachmentModel: AttachmentModel,
    BaseModel: BaseModel,
    CollaboratorModel: CollaboratorModel,
    ContextModel: ContextModel,
    FolderModel: FolderModel,
    GoalModel: GoalModel,
    ListModel: ListModel,
    LocationModel: LocationModel,
    NoteModel: NoteModel,
    OutlineModel: OutlineModel,
    RowModel: RowModel,
    SavedSearchModel: SavedSearchModel,
    TaskModel: TaskModel,

    // Collections
    BaseCollection: BaseCollection,
    CollaboratorCollection: CollaboratorCollection,
    ContextCollection: ContextCollection,
    FolderCollection: FolderCollection,
    GoalCollection: GoalCollection,
    ListCollection: ListCollection,
    LocationCollection: LocationCollection,
    NoteCollection: NoteCollection,
    OutlineCollection: OutlineCollection,
    RowCollection: RowCollection,
    SavedSearchCollection: SavedSearchCollection,
    TaskCollection: TaskCollection
};
