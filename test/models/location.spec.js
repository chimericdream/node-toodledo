'use strict';

const LocationModel = require('../../src/models/location');

const chai = require('chai');
const sinon = require('sinon');

const should = chai.should;
const expect = chai.expect;
const assert = chai.assert;

describe('LocationModel', () => {
    const api = sinon.spy();
    let server, model;

    beforeEach(() => {
        server = sinon.fakeServer.create();
        model = new LocationModel(api);
    });

    afterEach(() => {
        server.restore();
    });

    xit('is not implemented', () => {
        expect(true).to.be.false;
    });
});
