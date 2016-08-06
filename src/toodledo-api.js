'use strict';

const _ = require('lodash');
const rp = require('request-promise-native');
const proxy = require('proxy-mate');
const uuid = require('node-uuid');

const btoa = require('./lib/btoa');

// Exceptions
const AccountException = require('./exceptions/account');
const ApiException = require('./exceptions/api');
const ContextException = require('./exceptions/context');
const FolderException = require('./exceptions/folder');
const GoalException = require('./exceptions/goal');
const LocationException = require('./exceptions/location');
const TaskException = require('./exceptions/task');

// Models
const AccountInfo = require('./models/account-info');
const AttachmentModel = require('./models/attachment');
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

class ToodledoApi {
    constructor(options) {
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

        return proxy(this, ['options'], ['options']);
    }

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
        }).then((body) => {
            this.accessToken = body.access_token;
            this.refreshToken = body.refresh_token;
        }).catch((error) => {
            console.log(error);
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
        }).then((body) => {
            this.accessToken = body.access_token;
            this.refreshToken = body.refresh_token;
            console.dir(body);
        }).catch((error) => {
            console.log(error);
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
    LocationException: LocationException,
    TaskException: TaskException,

    // Models
    AccountInfo: AccountInfo,
    AttachmentModel: AttachmentModel,
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
