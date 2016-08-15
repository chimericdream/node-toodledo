'use strict';

const ListModel = require('../../src/models/list');

const chai = require('chai');
const sinon = require('sinon');

const should = chai.should;
const expect = chai.expect;
const assert = chai.assert;

describe('ListModel', () => {
    const api = sinon.spy();
    let server, model;

    beforeEach(() => {
        server = sinon.fakeServer.create();
        model = new ListModel(api);
    });

    afterEach(() => {
        server.restore();
    });

    xit('is not implemented', () => {
        expect(true).to.be.false;
    });
});
