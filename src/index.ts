export const END = Symbol('run-forever');

export type ForeverControlValue<T = any> = T | Symbol;
export type ForeverExecutionFunction<T = ForeverControlValue> = (previousValue?: T) => Promise<ForeverControlValue<T>>;
export type ForeverCallback = (e?: Error, value?: ForeverControlValue) => void;

export function forever<T = ForeverControlValue>(fn: ForeverExecutionFunction, previousValue?: T, callback: ForeverCallback = () => {}): void {
	setImmediate((_fn, _previousValue, _callback) => {
		_fn(_previousValue)
			.then((newValue: ForeverControlValue) => {
				if(newValue !== END) {
					forever(_fn, newValue, _callback);
				}
			})
			.catch((e: Error) => {
				_callback(e);
			})
	}, fn, previousValue, callback);
}

