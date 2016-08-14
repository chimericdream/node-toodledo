'use strict';

const btoa = require('../../src/lib/btoa');

const chai = require('chai');

const should = chai.should;
const expect = chai.expect;
const assert = chai.assert;

const strings = [
    ['this is a string', 'dGhpcyBpcyBhIHN0cmluZw=='],
    ['this is another string', 'dGhpcyBpcyBhbm90aGVyIHN0cmluZw=='],
    ['hi, my name is string', 'aGksIG15IG5hbWUgaXMgc3RyaW5n']
];

describe('The btoa (base64 encoding) function', () => {
    it('should base64 encode typical strings', () => {
        strings.forEach((testCase) => {
            expect(btoa(testCase[0])).to.equal(testCase[1]);
        });
    });
});
