"use strict";

// Adapted from here:
// https://github.com/node-browser-compat/btoa/blob/master/index.js
module.exports = function btoa(str) {
    let buffer;

    if (str instanceof Buffer) {
        buffer = str;
    } else {
        buffer = new Buffer(str.toString(), 'binary');
    }

    return buffer.toString('base64');
};
