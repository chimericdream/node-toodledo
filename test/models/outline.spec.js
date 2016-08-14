'use strict';

const OutlineModel = require('../../src/models/outline');

const chai = require('chai');
const sinon = require('sinon');

const should = chai.should;
const expect = chai.expect;
const assert = chai.assert;

describe('OutlineModel', () => {
    const api = sinon.spy();
    let server, model;

    beforeEach(() => {
        server = sinon.fakeServer.create();
        model = new OutlineModel(api);
    });

    afterEach(() => {
        server.restore();
    });

    it('is not implemented', () => {
        expect(true).to.be.false;
    });
});
