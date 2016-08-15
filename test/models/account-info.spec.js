'use strict';

const chai = require('chai');
const rp = require('request-promise-native');
const sinon = require('sinon');

const AccountInfoModel = require('../../src/models/account-info');

const expect = chai.expect;

const MOCK_API_URL = 'URL';
const MOCK_API_ACCESS_TOKEN = 'access';
const MOCK_API_REFRESH_TOKEN = 'refresh';

const MOCK_VALID_RESPONSE_BODY = {
    'userid': 'a1b2c3d4e5f6',
    'alias': 'John',
    'email': 'user@example.com',
    'pro': 0,
    'dateformat': 0,
    'timezone': -6,
    'hidemonths': 2,
    'hotlistpriority': 3,
    'hotlistduedate': 2,
    'showtabnums': 1,
    'lastedit_folder': 1281457337,
    'lastedit_context': 1281457997,
    'lastedit_goal': 1280441959,
    'lastedit_location': 1280441959,
    'lastedit_task': 1281458832,
    'lastdelete_task': 1280898329,
    'lastedit_note': 1280894728,
    'lastdelete_note': 1280898329,
    'lastedit_list': 1280898329,
    'lastedit_outline': 1280898329
};

describe('AccountInfoModel', () => {
    const api = {
        'baseUrl': MOCK_API_URL,
        'accessToken': MOCK_API_ACCESS_TOKEN,
        'refreshToken': MOCK_API_REFRESH_TOKEN
    };
    let model;

    beforeEach(() => {
        model = new AccountInfoModel(api);
    });

    xdescribe('constructor()', () => {
        it('is not implemented', () => {
            expect(true).to.be.false;
        });
    });

    describe('fetch()', () => {
        let rpSpy, emitSpy;

        beforeEach(() => {
            emitSpy = sinon.spy(model, 'emit');
        });

        afterEach(() => {
            if (rpSpy.isSinonProxy) {
                rpSpy.restore();
            }
        });

        it('should use the correct URL', () => {
            rpSpy = sinon.stub(rp, 'get', () => {
                return Promise.resolve();
            });

            model.fetch();

            expect(rpSpy.calledOnce).to.be.true;
            expect(rpSpy.calledWith({
                // eslint-disable-next-line max-len
                'uri': (`${ MOCK_API_URL }/account/get.php?access_token=${ MOCK_API_ACCESS_TOKEN }`),
                'json': true
            })).to.be.true;
        });

        describe('when the request is successful', () => {
            beforeEach(() => {
                rpSpy = sinon.stub(rp, 'get', () => {
                    return Promise.resolve(MOCK_VALID_RESPONSE_BODY);
                });
            });

            it('loads the proper data into the model', (done) => {
                model.fetch().then(() => {
                    Object.keys(MOCK_VALID_RESPONSE_BODY).forEach((key) => {
                        // eslint-disable-next-line max-len
                        expect(model[key]).to.equal(MOCK_VALID_RESPONSE_BODY[key]);
                    });

                    done();
                });
            });

            it('should emit an "account-info:loaded" event', (done) => {
                model.fetch().then(() => {
                    expect(emitSpy.calledOnce).to.be.true;
                    expect(emitSpy.calledWith('account-info:loaded')).to.be.true;

                    done();
                });
            });

            xdescribe('when the response includes unknown data', () => {
                it('should not load uknown keys into the model', () => {
                    expect(true).to.be.false;
                });

                // eslint-disable-next-line max-len
                it('should log a warning with the names of the unknown keys', () => {
                    expect(true).to.be.false;
                });
            });
        });

        // http://api.toodledo.com/3/account/doc_info.php
        xdescribe('when there is an error', () => {
            describe('when an unknown error occurs (ERR_CODE 0)', () => {
                it('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

            describe('when no access token is specified (ERR_CODE 1)', () => {
                it('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

            describe('when the access token is invalid (ERR_CODE 2)', () => {
                it('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

            describe('when the access token has the wrong scope (ERR_CODE 2)', () => {
                it('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

            describe('when there have been too many API requests (ERR_CODE 3)', () => {
                it('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

            describe('when the API is offline (ERR_CODE 4)', () => {
                it('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });
        });
    });
});
