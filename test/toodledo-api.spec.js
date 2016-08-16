'use strict';

const Toodledo = require('../src/toodledo-api');

const chai = require('chai');
const sinon = require('sinon');

const should = chai.should;
const expect = chai.expect;
const assert = chai.assert;

describe('Main API', () => {
    let api;

    beforeEach(() => {
        api = new Toodledo.API({});
    });

    describe('constructor()', () => {
        xit('is not implemented', () => {
            expect(true).to.be.false;
        });
    });

    describe('getException()', () => {
        const errorCodes = {
            'ApiException': [
                {'errorCode': 0, 'errorDesc': 'Unknown Error'},
                {'errorCode': 1, 'errorDesc': 'No access token was given.'},
                {'errorCode': 2, 'errorDesc': 'The access token was invalid or had the wrong scope.'},
                {'errorCode': 3, 'errorDesc': 'Too many API requests.'},
                {'errorCode': 4, 'errorDesc': 'The API is offline for maintenance.'}
            ],
            'AccountException': [
                {'errorCode': 101, 'errorDesc': 'SSL connection is required when requesting a token.'},
                {'errorCode': 102, 'errorDesc': 'There was an error requesting a token.'},
                {'errorCode': 103, 'errorDesc': 'Too many token requests.'}
            ],
            'FolderException': [
                {'errorCode': 201, 'errorDesc': 'Your folder must have a name.'},
                {'errorCode': 202, 'errorDesc': 'A folder with that name already exists.'},
                {'errorCode': 203, 'errorDesc': 'Max folders reached.'},
                {'errorCode': 204, 'errorDesc': 'Empty id.'},
                {'errorCode': 205, 'errorDesc': 'Invalid folder.'},
                {'errorCode': 206, 'errorDesc': 'Nothing was edited.'}
            ],
            'ContextException': [
                {'errorCode': 301, 'errorDesc': 'Your context must have a name.'},
                {'errorCode': 302, 'errorDesc': 'A context with that name already exists.'},
                {'errorCode': 303, 'errorDesc': 'Max contexts reached.'},
                {'errorCode': 304, 'errorDesc': 'Empty id.'},
                {'errorCode': 305, 'errorDesc': 'Invalid context.'},
                {'errorCode': 306, 'errorDesc': 'Nothing was edited.'}
            ],
            'GoalException': [
                {'errorCode': 401, 'errorDesc': 'Your goal must have a name.'},
                {'errorCode': 402, 'errorDesc': 'A goal with that name already exists.'},
                {'errorCode': 403, 'errorDesc': 'Max goals reached.'},
                {'errorCode': 404, 'errorDesc': 'Empty id.'},
                {'errorCode': 405, 'errorDesc': 'Invalid goal.'},
                {'errorCode': 406, 'errorDesc': 'Nothing was edited.'}
            ],
            'LocationException': [
                {'errorCode': 501, 'errorDesc': 'Your location must have a name.'},
                {'errorCode': 502, 'errorDesc': 'A location with that name already exists.'},
                {'errorCode': 503, 'errorDesc': 'Max locations reached.'},
                {'errorCode': 504, 'errorDesc': 'Empty id.'},
                {'errorCode': 505, 'errorDesc': 'Invalid location.'},
                {'errorCode': 506, 'errorDesc': 'Nothing was edited.'}
            ],
            'TaskException': [
                {'errorCode': 601, 'errorDesc': 'Your task must have a title.'},
                {'errorCode': 602, 'errorDesc': 'Only 50 tasks can be added/edited/deleted at a time.'},
                {'errorCode': 603, 'errorDesc': 'Max tasks reached'},
                {'errorCode': 604, 'errorDesc': 'Empty id'},
                {'errorCode': 605, 'errorDesc': 'Invalid task'},
                {'errorCode': 606, 'errorDesc': 'Nothing was added/edited'},
                {'errorCode': 607, 'errorDesc': 'Invalid folder id'},
                {'errorCode': 608, 'errorDesc': 'Invalid context id'},
                {'errorCode': 609, 'errorDesc': 'Invalid goal id'},
                {'errorCode': 610, 'errorDesc': 'Invalid location id'},
                {'errorCode': 611, 'errorDesc': 'Malformed request'},
                {'errorCode': 612, 'errorDesc': 'Invalid parent id'},
                {'errorCode': 613, 'errorDesc': 'Incorrect field parameters'},
                {'errorCode': 614, 'errorDesc': 'Parent was deleted'},
                {'errorCode': 615, 'errorDesc': 'Invalid collaborator'},
                {'errorCode': 616, 'errorDesc': 'Unable to reassign or share task'},
                {'errorCode': 617, 'errorDesc': 'Requires Toodledo subscription'}
            ],
            'NoteException': [
                {'errorCode': 701, 'errorDesc': 'Your note must have a name.'},
                {'errorCode': 702, 'errorDesc': 'Only 50 notes can be added/edited/deleted at a time.'},
                {'errorCode': 703, 'errorDesc': 'Max notes reached'},
                {'errorCode': 704, 'errorDesc': 'Empty id'},
                {'errorCode': 705, 'errorDesc': 'Invalid note'},
                {'errorCode': 706, 'errorDesc': 'Nothing was added/edited'},
                {'errorCode': 707, 'errorDesc': 'Invalid folder id'},
                {'errorCode': 711, 'errorDesc': 'Malformed request'}
            ],
            'OutlineException': [
                {'errorCode': 801, 'errorDesc': 'Outline had no title'},
                {'errorCode': 802, 'errorDesc': 'Only 50 outlines can be added/edited/deleted at a time.'},
                {'errorCode': 803, 'errorDesc': 'Max outlines reached'},
                {'errorCode': 804, 'errorDesc': 'Empty id / nothing sent'},
                {'errorCode': 805, 'errorDesc': 'Invalid outline'},
                {'errorCode': 806, 'errorDesc': 'Nothing was added/edited'},
                {'errorCode': 807, 'errorDesc': 'Invalid outline id'},
                {'errorCode': 808, 'errorDesc': 'Max nodes reached'},
                {'errorCode': 809, 'errorDesc': 'Outline already added'},
                {'errorCode': 811, 'errorDesc': 'Malformed request'},
                {'errorCode': 812, 'errorDesc': 'Reference was empty'},
                {'errorCode': 813, 'errorDesc': 'Invalid outline format'},
                {'errorCode': 814, 'errorDesc': 'Editing wrong version'}
            ],
            'ListException': [
                {'errorCode': 901, 'errorDesc': 'List had no title'},
                {'errorCode': 902, 'errorDesc': 'Only 50 lists can be added/edited/deleted at a time.'},
                {'errorCode': 903, 'errorDesc': 'Max lists reached'},
                {'errorCode': 904, 'errorDesc': 'Empty id / nothing sent'},
                {'errorCode': 905, 'errorDesc': 'Invalid list'},
                {'errorCode': 906, 'errorDesc': 'Nothing was added/edited'},
                {'errorCode': 909, 'errorDesc': 'List already added'},
                {'errorCode': 911, 'errorDesc': 'Malformed request'},
                {'errorCode': 912, 'errorDesc': 'Reference was empty'},
                {'errorCode': 913, 'errorDesc': 'Invalid cols format'},
                {'errorCode': 914, 'errorDesc': 'Editing wrong version'}
            ],
            'RowException': [
                {'errorCode': 1001, 'errorDesc': 'Row had no cells'},
                {'errorCode': 1002, 'errorDesc': 'Only 50 rows can be added/edited/deleted at a time.'},
                {'errorCode': 1003, 'errorDesc': 'Max rows reached'},
                {'errorCode': 1004, 'errorDesc': 'Empty id / nothing sent'},
                {'errorCode': 1005, 'errorDesc': 'Invalid list'},
                {'errorCode': 1006, 'errorDesc': 'Nothing was added/edited'},
                {'errorCode': 1007, 'errorDesc': 'Invalid row'},
                {'errorCode': 1009, 'errorDesc': 'Row already added'},
                {'errorCode': 1011, 'errorDesc': 'Malformed request'},
                {'errorCode': 1012, 'errorDesc': 'Reference was empty'},
                {'errorCode': 1013, 'errorDesc': 'Invalid cells format'},
                {'errorCode': 1014, 'errorDesc': 'Editing wrong version'}
            ]
        };

        it('returns an exception of the correct type', () => {
            Object.keys(errorCodes).forEach((type) => {
                errorCodes[type].forEach((error) => {
                    let exception = api.getException(
                        error.errorCode,
                        '',
                        0,
                        error.errorDesc
                    );

                    expect(exception.type).to.equal(type);
                });
            });
        });
    });

    describe('loadTokens()', () => {
        xit('is not implemented', () => {
            expect(true).to.be.false;
        });
    });

    describe('getScope()', () => {
        xit('is not implemented', () => {
            expect(true).to.be.false;
        });
    });

    describe('getAuthUrl()', () => {
        xit('is not implemented', () => {
            expect(true).to.be.false;
        });
    });

    describe('getAccessToken()', () => {
        xit('is not implemented', () => {
            expect(true).to.be.false;
        });
    });

    describe('refreshAccessToken()', () => {
        xit('is not implemented', () => {
            expect(true).to.be.false;
        });
    });
});
