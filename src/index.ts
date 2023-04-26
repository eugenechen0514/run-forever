export const END = Symbol('run-forever');

export type ForeverControlValue<T = any> = T | Symbol;
export type ForeverExecutionFunction<T = ForeverControlValue> = (previousValue?: T) => Promise<ForeverControlValue<T>>;
export type ForeverCallback = (e?: Error | undefined, value?: ForeverControlValue) => void;

export function forever<T = ForeverControlValue>(fn: ForeverExecutionFunction, previousValue?: T, callback: ForeverCallback = () => {}): void {
	setImmediate((_fn: ForeverExecutionFunction, _previousValue: T, _callback: ForeverCallback) => {
		_fn(_previousValue)
			.then((newValue: ForeverControlValue) => {
				if(newValue !== END) {
					forever(_fn, newValue, _callback);
				} else {
					_callback(undefined, newValue)
				}
			})
			.catch((e: Error) => {
				_callback(e, _previousValue);
			})
	}, fn, previousValue, callback);
}

export function foreverPromise<T = ForeverControlValue>(fn: ForeverExecutionFunction, previousValue?: T): Promise<ForeverControlValue<T>> {
	return new Promise((resolve, reject) => {
		forever(fn, previousValue, (e, value) => {
			if(e) {
				reject(e);
			} else {
				resolve(value);
			}
		});
	});
}
