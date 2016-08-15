'use strict';

const chai = require('chai');
const rp = require('request-promise-native');
const sinon = require('sinon');

const ContextCollection = require('../../src/collections/contexts');

const expect = chai.expect;

const MOCK_API_URL = 'URL';
const MOCK_API_ACCESS_TOKEN = 'access';
const MOCK_API_REFRESH_TOKEN = 'refresh';

const MOCK_VALID_RESPONSE_BODY = {};

describe('ContextCollection', () => {
    const api = {
        'baseUrl': MOCK_API_URL,
        'accessToken': MOCK_API_ACCESS_TOKEN,
        'refreshToken': MOCK_API_REFRESH_TOKEN
    };
    let collection;

    beforeEach(() => {
        collection = new ContextCollection(api);
    });

    xdescribe('constructor()', () => {
        it('is not implemented', () => {
            expect(true).to.be.false;
        });
    });

    describe('fetch()', () => {
        let rpSpy, emitSpy;

        beforeEach(() => {
            emitSpy = sinon.spy(collection, 'emit');
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

            collection.fetch();

            expect(rpSpy.calledOnce).to.be.true;

            const spyCall = rpSpy.getCall(0);
            // eslint-disable-next-line max-len
            expect(spyCall.args[0].uri).to.equal(`${ MOCK_API_URL }/contexts/get.php?access_token=${ MOCK_API_ACCESS_TOKEN }`);
        });

        describe('when the request is successful', () => {
            beforeEach(() => {
                rpSpy = sinon.stub(rp, 'get', () => {
                    return Promise.resolve(MOCK_VALID_RESPONSE_BODY);
                });
            });

            xit('loads the proper data into the collection', (done) => {
                expect(true).to.be.false;
            });

            xit('should emit a "collection:loaded" event', (done) => {
                collection.fetch().then(() => {
                    expect(emitSpy.calledOnce).to.be.true;
                    expect(emitSpy.calledWith('collection:loaded')).to.be.true;

                    done();
                });
            });

            xdescribe('when the response includes unknown data', () => {
                it('should not load uknown keys into the collection', () => {
                    expect(true).to.be.false;
                });

                // eslint-disable-next-line max-len
                it('should log a warning with the names of the unknown keys', () => {
                    expect(true).to.be.false;
                });
            });

            xdescribe('when there are no contexts found', () => {
                it('should not have anything in the collection', () => {
                    expect(true).to.be.false;
                });

                it('should log an info message', () => {
                    expect(true).to.be.false;
                });
            });
        });

        // http://api.toodledo.com/3/contexts/index.php
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
