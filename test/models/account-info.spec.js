'use strict';

const AccountInfoModel = require('../../src/models/account-info');

const chai = require('chai');
const sinon = require('sinon');

const should = chai.should;
const expect = chai.expect;
const assert = chai.assert;

describe('AccountInfoModel', () => {
    const api = sinon.spy();
    let server, model;

    beforeEach(() => {
        server = sinon.fakeServer.create();
        model = new AccountInfoModel(api);
    });

    afterEach(() => {
        server.restore();
    });

    it('is not implemented', () => {
        expect(true).to.be.false;
    });
});
