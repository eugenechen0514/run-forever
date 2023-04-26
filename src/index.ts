export const END = Symbol('run-forever');

export type ForeverControlValue<T = any> = T | Symbol;
export type ForeverExecutionFunction<T = any, CV = ForeverControlValue<T>> = (previousValue?: CV) => Promise<CV>;
export type ForeverCallback<T = any, CV = ForeverControlValue<T>> = (e?: Error | undefined, value?: CV) => void;

export function forever<T  = any, CV = ForeverControlValue<T>>(fn: ForeverExecutionFunction<T, CV>, previousValue?: CV, callback: ForeverCallback<T, CV> = () => {}): void {
	setImmediate((_fn: ForeverExecutionFunction<T, CV>, _previousValue: CV, _callback: ForeverCallback<T, CV>) => {
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

export function foreverPromise<T  = any, CV = ForeverControlValue<T>>(fn: ForeverExecutionFunction<T, CV>, previousValue?: CV): Promise<CV | undefined> {
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
