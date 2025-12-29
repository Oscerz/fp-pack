import type { AnyIterableInput, PromiseLikeValue } from './utils';
import { isAsyncInput, isIterable } from './utils';
import toAsync from './toAsync';

/** take - lazily take first n values */
function take<T>(count: number): (iterable: Iterable<T>) => IterableIterator<T>;
function take<T>(count: number): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<T>;
function take<T>(count: number, iterable: Iterable<T>): IterableIterator<T>;
function take<T>(count: number, iterable: AnyIterableInput<PromiseLikeValue<T>>): AsyncIterableIterator<T>;
function take<T>(count: number, iterable?: AnyIterableInput<PromiseLikeValue<T>>): any {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<T>>) => take(count, next);
  }

  const limit = Math.floor(count);
  if (!Number.isFinite(limit) || limit <= 0) {
    return isAsyncInput(iterable)
      ? (async function* () {})()
      : (function* () {})();
  }

  if (isAsyncInput(iterable)) {
    return (async function* () {
      let taken = 0;
      for await (const item of toAsync(iterable)) {
        yield item as T;
        taken += 1;
        if (taken >= limit) {
          break;
        }
      }
    })();
  }

  if (isIterable(iterable)) {
    return (function* () {
      let taken = 0;
      for (const item of iterable) {
        yield item as T;
        taken += 1;
        if (taken >= limit) {
          break;
        }
      }
    })();
  }

  throw new TypeError('take: input is not iterable');
}

export default take;
