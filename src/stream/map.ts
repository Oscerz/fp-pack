import type { AnyIterableInput, PromiseLikeValue } from './utils';
import { isAsyncInput, isIterable } from './utils';
import toAsync from './toAsync';

/** map - lazy map over iterables */
function map<T, R>(fn: (value: T) => R): (iterable: Iterable<T>) => IterableIterator<R>;
function map<T, R>(
  fn: (value: T) => R | Promise<R>
): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<R>;
function map<T, R>(fn: (value: T) => R, iterable: Iterable<T>): IterableIterator<R>;
function map<T, R>(
  fn: (value: T) => R | Promise<R>,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): AsyncIterableIterator<R>;
function map<T, R>(fn: (value: T) => R | Promise<R>, iterable?: AnyIterableInput<PromiseLikeValue<T>>): any {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<T>>) => map(fn, next);
  }

  if (isAsyncInput(iterable)) {
    return (async function* () {
      for await (const item of toAsync(iterable)) {
        yield await fn(item as T);
      }
    })();
  }

  if (isIterable(iterable)) {
    return (function* () {
      for (const item of iterable) {
        yield fn(item as T) as R;
      }
    })();
  }

  throw new TypeError('map: input is not iterable');
}

export default map;
