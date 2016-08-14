'use strict';

const NoteModel = require('../../src/models/note');

const chai = require('chai');
const sinon = require('sinon');

const should = chai.should;
const expect = chai.expect;
const assert = chai.assert;

describe('NoteModel', () => {
    const api = sinon.spy();
    let server, model;

    beforeEach(() => {
        server = sinon.fakeServer.create();
        model = new NoteModel(api);
    });

    afterEach(() => {
        server.restore();
    });

    it('is not implemented', () => {
        expect(true).to.be.false;
    });
});
