import type { AnyIterableInput, PromiseLikeValue } from './utils';
import { isAsyncInput, isIterable } from './utils';
import toAsync from './toAsync';

/** drop - lazily skip first n values */
function drop<T>(count: number): (iterable: Iterable<T>) => IterableIterator<T>;
function drop<T>(count: number): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<T>;
function drop<T>(count: number, iterable: Iterable<T>): IterableIterator<T>;
function drop<T>(count: number, iterable: AnyIterableInput<PromiseLikeValue<T>>): AsyncIterableIterator<T>;
function drop<T>(count: number, iterable?: AnyIterableInput<PromiseLikeValue<T>>): any {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<T>>) => drop(count, next);
  }

  const limit = Math.floor(count);
  if (!Number.isFinite(limit) || limit <= 0) {
    return isAsyncInput(iterable)
      ? (async function* () {
          for await (const item of toAsync(iterable)) {
            yield item as T;
          }
        })()
      : (function* () {
          for (const item of iterable as Iterable<T>) {
            yield item as T;
          }
        })();
  }

  if (isAsyncInput(iterable)) {
    return (async function* () {
      let skipped = 0;
      for await (const item of toAsync(iterable)) {
        if (skipped < limit) {
          skipped += 1;
          continue;
        }
        yield item as T;
      }
    })();
  }

  if (isIterable(iterable)) {
    return (function* () {
      let skipped = 0;
      for (const item of iterable) {
        if (skipped < limit) {
          skipped += 1;
          continue;
        }
        yield item as T;
      }
    })();
  }

  throw new TypeError('drop: input is not iterable');
}

export default drop;
