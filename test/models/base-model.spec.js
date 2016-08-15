'use strict';

const BaseModel = require('../../src/models/base-model');

const chai = require('chai');
const sinon = require('sinon');

const should = chai.should;
const expect = chai.expect;
const assert = chai.assert;

describe('BaseModel', () => {
    const api = sinon.spy();
    let model;

    beforeEach(() => {
        model = new BaseModel(api);
    });

    describe('constructor()', () => {
        xit('sets the default values for the object', () => {
            expect(model.data).to.eql({});
            expect(model.api).to.equal(api);
        });

        xit('sets up the exception event handler', () => {
            expect(model.listenerCount('error:raw')).to.equal(1);
        });
    });

    describe('load()', () => {
        const data = {
            'prop1': 'val1',
            'prop2': 'val2',
            'prop3': 'val3',
            'prop4': 'val4',
            'prop5': 'val5'
        };

        xit('returns the model for method chaining', () => {
            const ret = model.load(data);

            expect(ret).to.equal(model);
        });

        xit("merges the passed data into the model's properties", () => {
            model.load(data);

            expect(model.data).to.eql(data);
        });

        xit('makes the data available directly (i.e. "model.prop" vs "model.data.prop")', () => {
            const ret = model.load(data);

            expect(model.prop1).to.eql(data.prop1);
            expect(model.prop2).to.eql(data.prop2);
            expect(model.prop3).to.eql(data.prop3);
            expect(model.prop4).to.eql(data.prop4);
            expect(model.prop5).to.eql(data.prop5);
        });
    });
});
