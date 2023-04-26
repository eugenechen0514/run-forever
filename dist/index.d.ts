export declare const END: unique symbol;
export type ForeverControlValue<T = any> = T | Symbol;
export type ForeverExecutionFunction<T = any, CV = ForeverControlValue<T>> = (previousValue?: CV) => Promise<CV>;
export type ForeverCallback<T = any, CV = ForeverControlValue<T>> = (e?: Error | undefined, value?: CV) => void;
export declare function forever<T = any, CV = ForeverControlValue<T>>(fn: ForeverExecutionFunction<T, CV>, previousValue?: CV, callback?: ForeverCallback<T, CV>): void;
export declare function foreverPromise<T = any, CV = ForeverControlValue<T>>(fn: ForeverExecutionFunction<T, CV>, previousValue?: CV): Promise<CV | undefined>;
