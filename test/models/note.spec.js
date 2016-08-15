'use strict';

const chai = require('chai');
const rp = require('request-promise-native');
const sinon = require('sinon');

const NoteModel = require('../../src/models/note');

const expect = chai.expect;

const MOCK_API_URL = 'URL';
const MOCK_API_ACCESS_TOKEN = 'access';
const MOCK_API_REFRESH_TOKEN = 'refresh';

const MOCK_VALID_RESPONSE_BODY = {};

describe('NoteModel', () => {
    const api = {
        'baseUrl': MOCK_API_URL,
        'accessToken': MOCK_API_ACCESS_TOKEN,
        'refreshToken': MOCK_API_REFRESH_TOKEN
    };
    let model;

    beforeEach(() => {
        model = new NoteModel(api);
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

        xit('should use the correct URL', () => {
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

            xit('loads the proper data into the model', (done) => {
                model.fetch().then(() => {
                    Object.keys(MOCK_VALID_RESPONSE_BODY).forEach((key) => {
                        // eslint-disable-next-line max-len
                        expect(model[key]).to.equal(MOCK_VALID_RESPONSE_BODY[key]);
                    });

                    done();
                });
            });

            xit('should emit an "note:loaded" event', (done) => {
                model.fetch().then(() => {
                    expect(emitSpy.calledOnce).to.be.true;
                    expect(emitSpy.calledWith('note:loaded')).to.be.true;

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

        // http://api.toodledo.com/3/notes/doc_info.php
        xdescribe('when there is an error', () => {
            describe('when a note ID was not supplied (ERR_CODE 704)', () => {
                it('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

            describe('when no note can be found with the given ID (ERR_CODE 705)', () => {
                it('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

            describe('when the note with the given ID is invalid (ERR_CODE 705)', () => {
                it('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

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

    describe('create()', () => {});

    describe('save()', () => {});

    describe('destroy()', () => {});
});
