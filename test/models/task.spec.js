'use strict';

const TaskModel = require('../../src/models/task');

const chai = require('chai');
const sinon = require('sinon');

const should = chai.should;
const expect = chai.expect;
const assert = chai.assert;

describe('TaskModel', () => {
    const api = sinon.spy();
    let server, model;

    beforeEach(() => {
        server = sinon.fakeServer.create();
        model = new TaskModel(api);
    });

    afterEach(() => {
        server.restore();
    });

    xit('is not implemented', () => {
        expect(true).to.be.false;
    });
});
