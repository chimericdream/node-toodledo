'use strict';

const isObject = obj => obj && typeof obj === 'object';

function innerProxy(obj, className, inOptions, writableOptions, builtPropName = '') {
    return new Proxy(obj, {
        get: function(target, prop) {
            if (prop === 'inspect') {
                return prop;
            }
            if (prop in Object.prototype) {
                return Object.prototype[prop];
            }
            if (prop in Symbol.prototype) {
                return;
            }

            let propname = `${builtPropName}.${prop}`;
            if (prop in target) {
                if (isObject(target[prop])) {
                    return innerProxy(target[prop], className, inOptions, writableOptions, propname);
                }
                return target[prop];
            }

            return undefined;
        },

        set: function(target, prop, value) {
            let propname = `${builtPropName}.${prop}`;
            if (inOptions) {
                throw new Error(`${propname} is not a writable property of the ${className} class.`);
            }

            target[prop] = value;
            return true;
        }
    });
}

module.exports = function proxy(obj, writableOptions = false) {
    return new Proxy(obj, {
        get: function(target, prop) {
            if (prop === 'inspect') {
                return prop;
            }
            if (prop in Object.prototype) {
                return Object.prototype[prop];
            }
            if (prop in Symbol.prototype) {
                return;
            }

            if (prop in target) {
                if (isObject(target[prop])) {
                    return innerProxy(target[prop], target.constructor.name, false, writableOptions, prop);
                }
                return target[prop];
            }

            if (prop in target.options) {
                if (isObject(target.options[prop])) {
                    return innerProxy(target.options[prop], target.constructor.name, true, writableOptions, `options.${prop}`);
                }
                return target.options[prop];
            }

            return undefined;
        },
        set: function(target, prop, value) {
            if (!writableOptions && prop === 'options' || prop in target.options) {
                throw new Error(`${prop} is not a writable property of the ${target.constructor.name} class.`);
            }

            target[prop] = value;
            return true;
        }
    });
};
