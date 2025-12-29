import type { AnyIterableInput, PromiseLikeValue } from './utils';
import { isAsyncInput, isIterable } from './utils';
import toAsync from './toAsync';

/** takeWhile - lazily take values while predicate holds */
function takeWhile<T>(predicate: (value: T) => boolean): (iterable: Iterable<T>) => IterableIterator<T>;
function takeWhile<T>(
  predicate: (value: T) => boolean | Promise<boolean>
): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<T>;
function takeWhile<T>(predicate: (value: T) => boolean, iterable: Iterable<T>): IterableIterator<T>;
function takeWhile<T>(
  predicate: (value: T) => boolean | Promise<boolean>,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): AsyncIterableIterator<T>;
function takeWhile<T>(predicate: (value: T) => boolean | Promise<boolean>, iterable?: AnyIterableInput<PromiseLikeValue<T>>): any {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<T>>) => takeWhile(predicate, next);
  }

  if (isAsyncInput(iterable)) {
    return (async function* () {
      for await (const item of toAsync(iterable)) {
        if (!(await predicate(item as T))) {
          break;
        }
        yield item as T;
      }
    })();
  }

  if (isIterable(iterable)) {
    return (function* () {
      for (const item of iterable) {
        if (!predicate(item as T)) {
          break;
        }
        yield item as T;
      }
    })();
  }

  throw new TypeError('takeWhile: input is not iterable');
}

export default takeWhile;
