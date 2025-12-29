import type { AnyIterableInput, PromiseLikeValue } from './utils';
import { isAsyncInput, isIterable } from './utils';
import toAsync from './toAsync';

/** reduce - fold values into an accumulator */
function reduce<T, R>(fn: (acc: R, value: T) => R, initial: R): (iterable: Iterable<T>) => R;
function reduce<T, R>(
  fn: (acc: R, value: T) => R | Promise<R>,
  initial: R
): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => Promise<R>;
function reduce<T, R>(fn: (acc: R, value: T) => R, initial: R, iterable: Iterable<T>): R;
function reduce<T, R>(
  fn: (acc: R, value: T) => R | Promise<R>,
  initial: R,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): Promise<R>;
function reduce<T, R>(
  fn: (acc: R, value: T) => R | Promise<R>,
  initial: R,
  iterable?: AnyIterableInput<PromiseLikeValue<T>>
) {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<T>>) => reduce(fn, initial, next);
  }

  if (isAsyncInput(iterable)) {
    return (async () => {
      let acc = initial;
      for await (const item of toAsync(iterable)) {
        acc = await fn(acc, item as T);
      }
      return acc;
    })();
  }

  if (isIterable(iterable)) {
    let acc = initial;
    for (const item of iterable) {
      acc = fn(acc, item as T) as R;
    }
    return acc;
  }

  throw new TypeError('reduce: input is not iterable');
}

export default reduce;
