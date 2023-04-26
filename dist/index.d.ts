export declare const END: unique symbol;
export type ForeverControlValue<T = undefined> = T | undefined | Symbol;
export type ForeverExecutionFunction<T = undefined, CV = ForeverControlValue<T>> = (previousValue: CV) => Promise<CV>;
export type ForeverCallback<T = undefined, CV = ForeverControlValue<T>> = (e: Error | undefined, value: CV) => void;
export declare function forever<T = undefined, CV = ForeverControlValue<T>, INIT_PV = CV | undefined>(fn: ForeverExecutionFunction<T, INIT_PV>, previousValue: INIT_PV, callback?: ForeverCallback<T, INIT_PV>): void;
export declare function foreverPromise<T = undefined, CV = ForeverControlValue<T>, INIT_PV = CV | undefined>(fn: ForeverExecutionFunction<T, INIT_PV>, previousValue: INIT_PV): Promise<INIT_PV>;
