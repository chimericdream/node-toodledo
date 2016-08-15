'use strict';

const ContextModel = require('../../src/models/context');

const chai = require('chai');
const sinon = require('sinon');

const should = chai.should;
const expect = chai.expect;
const assert = chai.assert;

describe('ContextModel', () => {
    const api = sinon.spy();
    let server, model;

    beforeEach(() => {
        server = sinon.fakeServer.create();
        model = new ContextModel(api);
    });

    afterEach(() => {
        server.restore();
    });

    xit('is not implemented', () => {
        expect(true).to.be.false;
    });
});
