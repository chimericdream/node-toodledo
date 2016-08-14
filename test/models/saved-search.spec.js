'use strict';

const SavedSearchModel = require('../../src/models/saved-search');

const chai = require('chai');
const sinon = require('sinon');

const should = chai.should;
const expect = chai.expect;
const assert = chai.assert;

describe('SavedSearchModel', () => {
    const api = sinon.spy();
    let server, model;

    beforeEach(() => {
        server = sinon.fakeServer.create();
        model = new SavedSearchModel(api);
    });

    afterEach(() => {
        server.restore();
    });

    it('is not implemented', () => {
        expect(true).to.be.false;
    });
});
