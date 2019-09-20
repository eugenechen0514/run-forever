"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.END = Symbol('run-forever');
function forever(fn, previousValue, failCallback = (e) => { }) {
    setImmediate((_fn, _previousValue, _failCallback) => {
        _fn(_previousValue)
            .then((newValue) => {
            if (newValue !== exports.END) {
                forever(_fn, newValue, _failCallback);
            }
        })
            .catch((e) => {
            _failCallback(e);
        });
    }, fn, previousValue, failCallback);
}
exports.forever = forever;
//# sourceMappingURL=index.js.map