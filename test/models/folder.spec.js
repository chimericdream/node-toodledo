'use strict';

const chai = require('chai');
const rp = require('request-promise-native');
const sinon = require('sinon');

const FolderModel = require('../../src/models/folder');

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

describe('FolderModel', () => {
    const api = {
        'baseUrl': MOCK_API_URL,
        'accessToken': MOCK_API_ACCESS_TOKEN,
        'refreshToken': MOCK_API_REFRESH_TOKEN
    };
    let model;

    beforeEach(() => {
        model = new FolderModel(api);
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

        afterEach(() => {
            if (rpSpy.isSinonProxy) {
                rpSpy.restore();
            }
        });

        xit('should use the correct URL', () => {
            rpSpy = sinon.stub(rp, 'post', () => {
                return Promise.resolve();
            });

            model.fetch();

            expect(rpSpy.calledOnce).to.be.true;

            const spyCall = rpSpy.getCall(0);
            // eslint-disable-next-line max-len
            expect(spyCall.args[0].uri).to.equal(`${ MOCK_API_URL }/folders/get.php?access_token=${ MOCK_API_ACCESS_TOKEN }`);
        });

        xit('should include the desired folder ID in the body', () => {
            rpSpy = sinon.stub(rp, 'post', () => {
                return Promise.resolve();
            });

            model.id = MOCK_VALID_ID;
            model.fetch();

            const spyCall = rpSpy.getCall(0);
            expect(spyCall.args[0].form).to.eql({'id': MOCK_VALID_ID});
        });

        describe('when the request is successful', () => {
            beforeEach(() => {
                rpSpy = sinon.stub(rp, 'post', () => {
                    return Promise.resolve(MOCK_VALID_FETCH_RESPONSE);
                });
            });

            xit('loads the proper data into the model', (done) => {
                model.fetch().then(() => {
                    Object.keys(MOCK_VALID_FETCH_RESPONSE).forEach((key) => {
                        // eslint-disable-next-line max-len
                        expect(model[key]).to.equal(MOCK_VALID_FETCH_RESPONSE[key]);
                    });

                    done();
                });
            });

            xit('should emit an "folder:loaded" event', (done) => {
                model.fetch().then(() => {
                    expect(emitSpy.calledOnce).to.be.true;
                    expect(emitSpy.calledWith('folder:loaded')).to.be.true;

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
    });

    describe('create()', () => {
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
            rpSpy = sinon.stub(rp, 'post', () => {
                return Promise.resolve();
            });

            model.create();

            expect(rpSpy.calledOnce).to.be.true;

            const spyCall = rpSpy.getCall(0);
            // eslint-disable-next-line max-len
            expect(spyCall.args[0].uri).to.equal(`${ MOCK_API_URL }/folders/add.php?access_token=${ MOCK_API_ACCESS_TOKEN }`);
        });

        xit('should include the desired data in the body', () => {
            rpSpy = sinon.stub(rp, 'post', () => {
                return Promise.resolve();
            });

            model.id = MOCK_VALID_ID;
            model.create();

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
                model.create().then(() => {
                    Object.keys(MOCK_VALID_CREATE_RESPONSE).forEach((key) => {
                        // eslint-disable-next-line max-len
                        expect(model[key]).to.equal(MOCK_VALID_CREATE_RESPONSE[key]);
                    });

                    done();
                });
            });

            xit('should emit an "folder:created" event', (done) => {
                model.create().then(() => {
                    expect(emitSpy.calledOnce).to.be.true;
                    expect(emitSpy.calledWith('folder:created')).to.be.true;

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
    });

    describe('save()', () => {
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
            rpSpy = sinon.stub(rp, 'post', () => {
                return Promise.resolve();
            });

            model.save();

            expect(rpSpy.calledOnce).to.be.true;

            const spyCall = rpSpy.getCall(0);
            // eslint-disable-next-line max-len
            expect(spyCall.args[0].uri).to.equal(`${ MOCK_API_URL }/folders/edit.php?access_token=${ MOCK_API_ACCESS_TOKEN }`);
        });

        xit('should include the desired data in the body', () => {
            rpSpy = sinon.stub(rp, 'post', () => {
                return Promise.resolve();
            });

            model.id = MOCK_VALID_ID;
            model.save();

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
                model.save().then(() => {
                    Object.keys(MOCK_VALID_SAVE_RESPONSE).forEach((key) => {
                        // eslint-disable-next-line max-len
                        expect(model[key]).to.equal(MOCK_VALID_SAVE_RESPONSE[key]);
                    });

                    done();
                });
            });

            xit('should emit an "folder:changed" event', (done) => {
                model.save().then(() => {
                    expect(emitSpy.calledOnce).to.be.true;
                    expect(emitSpy.calledWith('folder:changed')).to.be.true;

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
    });

    describe('destroy()', () => {
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
            rpSpy = sinon.stub(rp, 'post', () => {
                return Promise.resolve();
            });

            model.destroy();

            expect(rpSpy.calledOnce).to.be.true;

            const spyCall = rpSpy.getCall(0);
            // eslint-disable-next-line max-len
            expect(spyCall.args[0].uri).to.equal(`${ MOCK_API_URL }/folders/delete.php?access_token=${ MOCK_API_ACCESS_TOKEN }`);
        });

        xit('should include the desired data in the body', () => {
            rpSpy = sinon.stub(rp, 'post', () => {
                return Promise.resolve();
            });

            model.id = MOCK_VALID_ID;
            model.destroy();

            const spyCall = rpSpy.getCall(0);
            expect(spyCall.args[0].form).to.eql({'id': MOCK_VALID_ID});
        });

        describe('when the request is successful', () => {
            beforeEach(() => {
                rpSpy = sinon.stub(rp, 'post', () => {
                    return Promise.resolve(MOCK_VALID_DELETE_RESPONSE);
                });
            });

            xit('should emit an "folder:deleted" event', (done) => {
                model.destroy().then(() => {
                    expect(emitSpy.calledOnce).to.be.true;
                    expect(emitSpy.calledWith('folder:deleted')).to.be.true;

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
    });
});
