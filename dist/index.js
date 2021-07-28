"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foreverPromise = exports.forever = exports.END = void 0;
exports.END = Symbol('run-forever');
function forever(fn, previousValue, callback = () => { }) {
    setImmediate((_fn, _previousValue, _callback) => {
        _fn(_previousValue)
            .then((newValue) => {
            if (newValue !== exports.END) {
                forever(_fn, newValue, _callback);
            }
            else {
                _callback(undefined, newValue);
            }
        })
            .catch((e) => {
            _callback(e, _previousValue);
        });
    }, fn, previousValue, callback);
}
exports.forever = forever;
function foreverPromise(fn, previousValue) {
    return new Promise((resolve, reject) => {
        forever(fn, previousValue, (e, value) => {
            if (e) {
                reject(e);
            }
            else {
                resolve(value);
            }
        });
    });
}
exports.foreverPromise = foreverPromise;
//# sourceMappingURL=index.js.map