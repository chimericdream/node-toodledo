'use strict';

const chai = require('chai');
const rp = require('request-promise-native');
const sinon = require('sinon');

const NoteCollection = require('../../src/collections/notes');
const NoteModel = require('../../src/models/note');

const expect = chai.expect;

const MOCK_API_URL = 'URL';
const MOCK_API_ACCESS_TOKEN = 'access';
const MOCK_API_REFRESH_TOKEN = 'refresh';

const MOCK_VALID_ID = 1;
const MOCK_INVALID_ID = 2;

const MOCK_VALID_FETCH_RESPONSE = {};
const MOCK_VALID_CREATE_RESPONSE = {};
const MOCK_VALID_SAVE_RESPONSE = {};
const MOCK_VALID_DELETE_RESPONSE = {};

describe('NoteCollection', () => {
    const api = {
        'baseUrl': MOCK_API_URL,
        'accessToken': MOCK_API_ACCESS_TOKEN,
        'refreshToken': MOCK_API_REFRESH_TOKEN
    };
    let collection;

    beforeEach(() => {
        collection = new NoteCollection(api);
    });

    describe('constructor()', () => {
        xit('is not implemented', () => {
            expect(true).to.be.false;
        });
    });

    describe('fetch()', () => {
        xit('is not implemented', () => {
            expect(true).to.be.false;
        });
    });

    describe('create()', () => {
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
            rpSpy = sinon.stub(rp, 'post', () => {
                return Promise.resolve();
            });

            collection.create();

            expect(rpSpy.calledOnce).to.be.true;

            const spyCall = rpSpy.getCall(0);
            // eslint-disable-next-line max-len
            expect(spyCall.args[0].uri).to.equal(`${ MOCK_API_URL }/notes/add.php?access_token=${ MOCK_API_ACCESS_TOKEN }`);
        });

        xit('should include the desired data in the body', () => {
            rpSpy = sinon.stub(rp, 'post', () => {
                return Promise.resolve();
            });

            collection.id = MOCK_VALID_ID;
            collection.create();

            const spyCall = rpSpy.getCall(0);
            expect(spyCall.args[0].form).to.eql({'id': MOCK_VALID_ID});
        });

        describe('when the request is successful', () => {
            beforeEach(() => {
                rpSpy = sinon.stub(rp, 'post', () => {
                    return Promise.resolve(MOCK_VALID_CREATE_RESPONSE);
                });
            });

            xit('loads the proper data into the model', (done) => {
                collection.create().then(() => {
                    Object.keys(MOCK_VALID_CREATE_RESPONSE).forEach((key) => {
                        // eslint-disable-next-line max-len
                        expect(model[key]).to.equal(MOCK_VALID_CREATE_RESPONSE[key]);
                    });

                    done();
                });
            });

            xit('should emit an "note:created" event', (done) => {
                collection.create().then(() => {
                    expect(emitSpy.calledOnce).to.be.true;
                    expect(emitSpy.calledWith('note:created')).to.be.true;

                    done();
                });
            });

            describe('when the response includes unknown data', () => {
                xit('should not load unknown keys into the model', () => {
                    expect(true).to.be.false;
                });

                // eslint-disable-next-line max-len
                xit('should log a warning with the names of the unknown keys', () => {
                    expect(true).to.be.false;
                });
            });
        });

        // http://api.toodledo.com/3/notes/doc_info.php
        describe('when there is an error', () => {
            describe('when a note name was not supplied (ERR_CODE 701)', () => {
                xit('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

            describe('when trying to add too many notes (ERR_CODE 702)', () => {
                xit('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

            describe('when the max note limit has been reached (ERR_CODE 703)', () => {
                xit('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

            describe('when an invalid folder ID is given for the note (ERR_CODE 707)', () => {
                xit('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

            describe('when the request is malformed (ERR_CODE 708)', () => {
                xit('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

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

    describe('save()', () => {
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
            rpSpy = sinon.stub(rp, 'post', () => {
                return Promise.resolve();
            });

            collection.save();

            expect(rpSpy.calledOnce).to.be.true;

            const spyCall = rpSpy.getCall(0);
            // eslint-disable-next-line max-len
            expect(spyCall.args[0].uri).to.equal(`${ MOCK_API_URL }/notes/edit.php?access_token=${ MOCK_API_ACCESS_TOKEN }`);
        });

        xit('should include the desired data in the body', () => {
            rpSpy = sinon.stub(rp, 'post', () => {
                return Promise.resolve();
            });

            collection.id = MOCK_VALID_ID;
            collection.save();

            const spyCall = rpSpy.getCall(0);
            expect(spyCall.args[0].form).to.eql({'id': MOCK_VALID_ID});
        });

        describe('when the request is successful', () => {
            beforeEach(() => {
                rpSpy = sinon.stub(rp, 'post', () => {
                    return Promise.resolve(MOCK_VALID_SAVE_RESPONSE);
                });
            });

            xit('loads the proper data into the model', (done) => {
                collection.save().then(() => {
                    Object.keys(MOCK_VALID_SAVE_RESPONSE).forEach((key) => {
                        // eslint-disable-next-line max-len
                        expect(model[key]).to.equal(MOCK_VALID_SAVE_RESPONSE[key]);
                    });

                    done();
                });
            });

            xit('should emit an "note:created" event', (done) => {
                collection.save().then(() => {
                    expect(emitSpy.calledOnce).to.be.true;
                    expect(emitSpy.calledWith('note:created')).to.be.true;

                    done();
                });
            });

            describe('when the response includes unknown data', () => {
                xit('should not load unknown keys into the model', () => {
                    expect(true).to.be.false;
                });

                // eslint-disable-next-line max-len
                xit('should log a warning with the names of the unknown keys', () => {
                    expect(true).to.be.false;
                });
            });
        });

        // http://api.toodledo.com/3/notes/doc_info.php
        describe('when there is an error', () => {
            describe('when a note name was not supplied (ERR_CODE 701)', () => {
                xit('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

            describe('when trying to edit too many notes (ERR_CODE 702)', () => {
                xit('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

            describe('when a note ID was not supplied (ERR_CODE 704)', () => {
                xit('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

            describe('when no note can be found with the given ID (ERR_CODE 705)', () => {
                xit('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

            describe('when the note with the given ID is invalid (ERR_CODE 705)', () => {
                xit('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

            describe('when an invalid folder ID is given for the note (ERR_CODE 707)', () => {
                xit('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

            describe('when the request is malformed (ERR_CODE 708)', () => {
                xit('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

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

    describe('destroy()', () => {
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
            rpSpy = sinon.stub(rp, 'post', () => {
                return Promise.resolve();
            });

            collection.destroy();

            expect(rpSpy.calledOnce).to.be.true;

            const spyCall = rpSpy.getCall(0);
            // eslint-disable-next-line max-len
            expect(spyCall.args[0].uri).to.equal(`${ MOCK_API_URL }/notes/delete.php?access_token=${ MOCK_API_ACCESS_TOKEN }`);
        });

        xit('should include the desired data in the body', () => {
            rpSpy = sinon.stub(rp, 'post', () => {
                return Promise.resolve();
            });

            collection.id = MOCK_VALID_ID;
            collection.destroy();

            const spyCall = rpSpy.getCall(0);
            expect(spyCall.args[0].form).to.eql({'id': MOCK_VALID_ID});
        });

        describe('when the request is successful', () => {
            beforeEach(() => {
                rpSpy = sinon.stub(rp, 'post', () => {
                    return Promise.resolve(MOCK_VALID_DELETE_RESPONSE);
                });
            });

            xit('should emit an "note:deleted" event', (done) => {
                collection.destroy().then(() => {
                    expect(emitSpy.calledOnce).to.be.true;
                    expect(emitSpy.calledWith('note:deleted')).to.be.true;

                    done();
                });
            });

            describe('when the response includes unknown data', () => {
                xit('should not load unknown keys into the model', () => {
                    expect(true).to.be.false;
                });

                // eslint-disable-next-line max-len
                xit('should log a warning with the names of the unknown keys', () => {
                    expect(true).to.be.false;
                });
            });
        });

        // http://api.toodledo.com/3/notes/doc_info.php
        describe('when there is an error', () => {
            describe('when trying to delete too many notes (ERR_CODE 702)', () => {
                xit('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

            describe('when a note ID was not supplied (ERR_CODE 704)', () => {
                xit('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

            describe('when no note can be found with the given ID (ERR_CODE 705)', () => {
                xit('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

            describe('when the note with the given ID is invalid (ERR_CODE 705)', () => {
                xit('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

            describe('when the request is malformed (ERR_CODE 708)', () => {
                xit('is not implemented', () => {
                    expect(true).to.be.false;
                });
            });

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
