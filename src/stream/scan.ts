import type { AnyIterableInput, PromiseLikeValue } from './utils';
import { isAsyncInput, isIterable } from './utils';
import toAsync from './toAsync';

/** scan - fold values and emit each accumulated value */
function scan<T, R>(fn: (acc: R, value: T) => R, initial: R): (iterable: Iterable<T>) => IterableIterator<R>;
function scan<T, R>(
  fn: (acc: R, value: T) => R | Promise<R>,
  initial: R
): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<R>;
function scan<T, R>(fn: (acc: R, value: T) => R, initial: R, iterable: Iterable<T>): IterableIterator<R>;
function scan<T, R>(
  fn: (acc: R, value: T) => R | Promise<R>,
  initial: R,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): AsyncIterableIterator<R>;
function scan<T, R>(
  fn: (acc: R, value: T) => R | Promise<R>,
  initial: R,
  iterable?: AnyIterableInput<PromiseLikeValue<T>>
): any {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<T>>) => scan(fn, initial, next);
  }

  if (isAsyncInput(iterable)) {
    return (async function* () {
      let acc = initial;
      for await (const item of toAsync(iterable)) {
        acc = await fn(acc, item as T);
        yield acc;
      }
    })();
  }

  if (isIterable(iterable)) {
    return (function* () {
      let acc = initial;
      for (const item of iterable) {
        acc = fn(acc, item as T) as R;
        yield acc;
      }
    })();
  }

  throw new TypeError('scan: input is not iterable');
}

export default scan;
