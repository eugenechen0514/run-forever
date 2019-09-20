export const END = Symbol('run-forever');

export type ForeverControlValue = any;
export type ForeverExecutionFunction<T = ForeverControlValue> = (previousValue?: T) => Promise<T | Symbol>;
export type ForeverFailCallback = (e: Error) => void;

export function forever<T = ForeverControlValue>(fn: ForeverExecutionFunction, previousValue?: T, failCallback: ForeverFailCallback = (e) => {}): void {
	setImmediate((_fn, _previousValue, _failCallback) => {
		_fn(_previousValue)
			.then((newValue: ForeverControlValue) => {
				if(newValue !== END) {
					forever(_fn, newValue, _failCallback);
				}
			})
			.catch((e: Error) => {
				_failCallback(e);
			})
	}, fn, previousValue, failCallback);
}

