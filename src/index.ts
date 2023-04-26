export const END = Symbol('run-forever');

export type ForeverControlValue<T = undefined> = T | Symbol;
export type ForeverPreviousValue<T = undefined> = Exclude<T, Symbol>;
export type ForeverExecutionFunction<T = undefined> = (previousValue: ForeverPreviousValue<T>) => Promise<ForeverControlValue<T>>;
export type ForeverCallback<T = undefined> = (e: Error | undefined, value: ForeverPreviousValue<T>) => void;

export function forever<INIT_V = undefined>(fn: ForeverExecutionFunction<INIT_V>, previousValue: INIT_V, callback: ForeverCallback<INIT_V> = () => {}): void {
	setImmediate((_fn: ForeverExecutionFunction<INIT_V>, _previousValue: ForeverPreviousValue<INIT_V>, _callback: ForeverCallback<INIT_V>) => {
		_fn(_previousValue)
			.then((newValue) => {
				if(newValue !== END) {
					// keep loop, pass newValue
					forever(_fn, newValue as INIT_V, _callback);
				} else {
					// stop process, return _previousValue
					_callback(undefined, _previousValue)
				}
			})
			.catch((e: Error) => {
				_callback(e, _previousValue);
			})
	}, fn, previousValue, callback);
}

export function foreverPromise<INIT_V  = undefined>(fn: ForeverExecutionFunction<INIT_V>, previousValue: INIT_V): Promise<ForeverPreviousValue<INIT_V>> {
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
