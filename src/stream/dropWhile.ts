import type { AnyIterableInput, PromiseLikeValue } from './utils';
import { isAsyncInput, isIterable } from './utils';
import toAsync from './toAsync';

/** dropWhile - lazily drop values while predicate holds */
function dropWhile<T>(predicate: (value: T) => boolean): (iterable: Iterable<T>) => IterableIterator<T>;
function dropWhile<T>(
  predicate: (value: T) => boolean | Promise<boolean>
): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<T>;
function dropWhile<T>(predicate: (value: T) => boolean, iterable: Iterable<T>): IterableIterator<T>;
function dropWhile<T>(
  predicate: (value: T) => boolean | Promise<boolean>,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): AsyncIterableIterator<T>;
function dropWhile<T>(predicate: (value: T) => boolean | Promise<boolean>, iterable?: AnyIterableInput<PromiseLikeValue<T>>): any {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<T>>) => dropWhile(predicate, next);
  }

  if (isAsyncInput(iterable)) {
    return (async function* () {
      let dropping = true;
      for await (const item of toAsync(iterable)) {
        if (dropping && !(await predicate(item as T))) {
          dropping = false;
        }
        if (!dropping) {
          yield item as T;
        }
      }
    })();
  }

  if (isIterable(iterable)) {
    return (function* () {
      let dropping = true;
      for (const item of iterable) {
        if (dropping && !predicate(item as T)) {
          dropping = false;
        }
        if (!dropping) {
          yield item as T;
        }
      }
    })();
  }

  throw new TypeError('dropWhile: input is not iterable');
}

export default dropWhile;
