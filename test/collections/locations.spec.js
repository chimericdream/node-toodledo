'use strict';

const chai = require('chai');
const rp = require('request-promise-native');
const sinon = require('sinon');

const LocationCollection = require('../../src/collections/locations');

const expect = chai.expect;

const MOCK_API_URL = 'URL';
const MOCK_API_ACCESS_TOKEN = 'access';
const MOCK_API_REFRESH_TOKEN = 'refresh';

const MOCK_VALID_RESPONSE_BODY = {};

describe('LocationCollection', () => {
    const api = {
        'baseUrl': MOCK_API_URL,
        'accessToken': MOCK_API_ACCESS_TOKEN,
        'refreshToken': MOCK_API_REFRESH_TOKEN
    };
    let collection;

    beforeEach(() => {
        collection = new LocationCollection(api);
    });

    describe('constructor()', () => {
        xit('is not implemented', () => {
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

        xit('should use the correct URL', () => {
            rpSpy = sinon.stub(rp, 'get', () => {
                return Promise.resolve();
            });

            collection.fetch();

            expect(rpSpy.calledOnce).to.be.true;

            const spyCall = rpSpy.getCall(0);
            // eslint-disable-next-line max-len
            expect(spyCall.args[0].uri).to.equal(`${ MOCK_API_URL }/locations/get.php?access_token=${ MOCK_API_ACCESS_TOKEN }`);
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

            describe('when the response includes unknown data', () => {
                xit('should not load unknown keys into the collection', () => {
                    expect(true).to.be.false;
                });

                // eslint-disable-next-line max-len
                xit('should log a warning with the names of the unknown keys', () => {
                    expect(true).to.be.false;
                });
            });

            describe('when there are no locations found', () => {
                xit('should not have anything in the collection', () => {
                    expect(true).to.be.false;
                });

                xit('should log an info message', () => {
                    expect(true).to.be.false;
                });
            });
        });

        // http://api.toodledo.com/3/locations/index.php
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
