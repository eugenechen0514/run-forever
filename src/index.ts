export const END = Symbol('run-forever');

export type ForeverControlValue<T = undefined> = T | undefined | Symbol;
export type ForeverExecutionFunction<T = undefined, CV = ForeverControlValue<T>> = (previousValue: CV) => Promise<CV>;
export type ForeverCallback<T = undefined, CV = ForeverControlValue<T>> = (e: Error | undefined, value: CV) => void;

export function forever<T  = undefined, CV = ForeverControlValue<T>, INIT_PV = CV | undefined>(fn: ForeverExecutionFunction<T, INIT_PV>, previousValue: INIT_PV, callback: ForeverCallback<T, INIT_PV> = () => {}): void {
	setImmediate((_fn: ForeverExecutionFunction<T, INIT_PV>, _previousValue: INIT_PV, _callback: ForeverCallback<T, INIT_PV>) => {
		_fn(_previousValue)
			.then((newValue) => {
				if(newValue !== END) {
					forever<T, CV, INIT_PV>(_fn, newValue, _callback);
				} else {
					_callback(undefined, newValue)
				}
			})
			.catch((e: Error) => {
				_callback(e, _previousValue);
			})
	}, fn, previousValue, callback);
}

export function foreverPromise<T  = undefined, CV = ForeverControlValue<T>, INIT_PV = CV | undefined>(fn: ForeverExecutionFunction<T, INIT_PV>, previousValue: INIT_PV): Promise<INIT_PV> {
	return new Promise((resolve, reject) => {
		forever<T, CV, INIT_PV>(fn, previousValue, (e, value) => {
			if(e) {
				reject(e);
			} else {
				resolve(value);
			}
		});
	});
}
