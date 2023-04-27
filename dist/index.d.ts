export declare const END: unique symbol;
export type ForeverControlValue<T = undefined> = T | Symbol;
export type ForeverPreviousValue<T = undefined> = Exclude<T, Symbol>;
export type ForeverExecutionFunction<T = undefined> = (previousValue: ForeverPreviousValue<T>) => Promise<ForeverControlValue<T>>;
export type ForeverCallback<T = undefined> = (e: Error | undefined, value: ForeverPreviousValue<T>) => void;
export declare function forever<INIT_V = undefined>(fn: ForeverExecutionFunction<INIT_V>, previousValue?: (INIT_V | undefined), callback?: ForeverCallback<INIT_V>): void;
export declare function foreverPromise<INIT_V = undefined>(fn: ForeverExecutionFunction<INIT_V>, previousValue: INIT_V): Promise<ForeverPreviousValue<INIT_V>>;
