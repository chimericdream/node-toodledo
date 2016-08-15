'use strict';

const AccountInfoModel = require('../../src/models/account-info');

const chai = require('chai');
const sinon = require('sinon');

const rp = require('request-promise-native');

const should = chai.should;
const expect = chai.expect;
const assert = chai.assert;

const MOCK_API_URL = 'URL';
const MOCK_API_ACCESS_TOKEN = 'token';

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
        'accessToken': MOCK_API_ACCESS_TOKEN
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

        describe('with a valid access token', () => {
            beforeEach(() => {
                rpSpy = sinon.stub(rp, 'get', () => {
                    return Promise.resolve(MOCK_VALID_RESPONSE_BODY);
                });
            });

            it('loads the proper data into the model', (done) => {
                model.fetch().then(() => {
                    /* eslint-disable max-len */

                    expect(model.userid).to.equal(MOCK_VALID_RESPONSE_BODY.userid);
                    expect(model.alias).to.equal(MOCK_VALID_RESPONSE_BODY.alias);
                    expect(model.email).to.equal(MOCK_VALID_RESPONSE_BODY.email);
                    expect(model.pro).to.equal(MOCK_VALID_RESPONSE_BODY.pro);
                    expect(model.dateformat).to.equal(MOCK_VALID_RESPONSE_BODY.dateformat);
                    expect(model.timezone).to.equal(MOCK_VALID_RESPONSE_BODY.timezone);
                    expect(model.hidemonths).to.equal(MOCK_VALID_RESPONSE_BODY.hidemonths);
                    expect(model.hotlistpriority).to.equal(MOCK_VALID_RESPONSE_BODY.hotlistpriority);
                    expect(model.hotlistduedate).to.equal(MOCK_VALID_RESPONSE_BODY.hotlistduedate);
                    expect(model.showtabnums).to.equal(MOCK_VALID_RESPONSE_BODY.showtabnums);
                    expect(model.lastedit_folder).to.equal(MOCK_VALID_RESPONSE_BODY.lastedit_folder);
                    expect(model.lastedit_context).to.equal(MOCK_VALID_RESPONSE_BODY.lastedit_context);
                    expect(model.lastedit_goal).to.equal(MOCK_VALID_RESPONSE_BODY.lastedit_goal);
                    expect(model.lastedit_location).to.equal(MOCK_VALID_RESPONSE_BODY.lastedit_location);
                    expect(model.lastedit_task).to.equal(MOCK_VALID_RESPONSE_BODY.lastedit_task);
                    expect(model.lastdelete_task).to.equal(MOCK_VALID_RESPONSE_BODY.lastdelete_task);
                    expect(model.lastedit_note).to.equal(MOCK_VALID_RESPONSE_BODY.lastedit_note);
                    expect(model.lastdelete_note).to.equal(MOCK_VALID_RESPONSE_BODY.lastdelete_note);
                    expect(model.lastedit_list).to.equal(MOCK_VALID_RESPONSE_BODY.lastedit_list);
                    expect(model.lastedit_outline).to.equal(MOCK_VALID_RESPONSE_BODY.lastedit_outline);

                    /* eslint-enable max-len */

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
    });
});
