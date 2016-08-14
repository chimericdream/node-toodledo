'use strict';

const RowModel = require('../../src/models/row');

const chai = require('chai');
const sinon = require('sinon');

const should = chai.should;
const expect = chai.expect;
const assert = chai.assert;

describe('RowModel', () => {
    const api = sinon.spy();
    let server, model;

    beforeEach(() => {
        server = sinon.fakeServer.create();
        model = new RowModel(api);
    });

    afterEach(() => {
        server.restore();
    });

    it('is not implemented', () => {
        expect(true).to.be.false;
    });
});
