'use strict';

const _ = require('lodash');
const chai = require('chai');
const rp = require('request-promise-native');
const sinon = require('sinon');
const winston = require('winston');

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

const MOCK_INVALID_PROPERTIES = {
    'unknownkey': 'somevalue',
    'badkey': 'badvalue'
};

const MOCK_VALID_RESPONSE_BODY_PLUS_UNKNOWN = _.merge(
    {},
    MOCK_VALID_RESPONSE_BODY,
    MOCK_INVALID_PROPERTIES
);

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

    describe('constructor()', () => {
        xit('is not implemented', () => {
            expect(true).to.be.false;
        });
    });

    describe('fetch()', () => {
        let rpSpy, emitSpy;

        beforeEach(() => {
            emitSpy = sinon.spy(model, 'emit');
        });

        it('should use the correct URL', () => {
            rpSpy = sinon.stub(rp, 'get', () => {
                return Promise.resolve();
            });

            model.fetch();

            expect(rpSpy.calledOnce).to.be.true;

            const spyCall = rpSpy.getCall(0);
            // eslint-disable-next-line max-len
            expect(spyCall.args[0].uri).to.equal(`${ MOCK_API_URL }/account/get.php?access_token=${ MOCK_API_ACCESS_TOKEN }`);

            rpSpy.restore();
        });

        describe('when the request is successful', () => {
            describe('when the response does not include extra data', () => {
                beforeEach(() => {
                    rpSpy = sinon.stub(rp, 'get', () => {
                        return Promise.resolve(MOCK_VALID_RESPONSE_BODY);
                    });
                });

                afterEach(() => {
                    rpSpy.restore();
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
            });

            describe('when the response includes unknown data', () => {
                let loggerSpy;

                beforeEach(() => {
                    loggerSpy = sinon.stub(winston, 'warn', () => {
                        return;
                    });

                    rpSpy = sinon.stub(rp, 'get', () => {
                        // eslint-disable-next-line max-len
                        return Promise.resolve(MOCK_VALID_RESPONSE_BODY_PLUS_UNKNOWN);
                    });
                });

                afterEach(() => {
                    rpSpy.restore();
                    loggerSpy.restore();
                });

                it('should not load unknown keys into the model', (done) => {
                    model.fetch().then(() => {
                        Object.keys(MOCK_INVALID_PROPERTIES).forEach((key) => {
                            expect(model[key]).to.be.undefined;
                        });

                        done();
                    });
                });

                // eslint-disable-next-line max-len
                it('should log a warning with the names of the unknown keys', (done) => {
                    model.fetch().then(() => {
                        // eslint-disable-next-line max-len
                        expect(loggerSpy.callCount).to.equal(Object.keys(MOCK_INVALID_PROPERTIES).length);

                        done();
                    });
                });
            });
        });

        // http://api.toodledo.com/3/account/doc_info.php
        describe('when there is an error', () => {
            describe('when an unknown error occurs (ERR_CODE 0)', () => {
                xit('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

            describe('when no access token is specified (ERR_CODE 1)', () => {
                xit('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

            describe('when the access token is invalid (ERR_CODE 2)', () => {
                xit('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

            describe('when the access token has the wrong scope (ERR_CODE 2)', () => {
                xit('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

            describe('when there have been too many API requests (ERR_CODE 3)', () => {
                xit('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

            describe('when the API is offline (ERR_CODE 4)', () => {
                xit('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });
        });
    });
});
