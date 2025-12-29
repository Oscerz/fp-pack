import type { AnyIterableInput, PromiseLikeValue } from './utils';
import { isAsyncInput, isIterable } from './utils';
import toAsync from './toAsync';

/** find - find first matching value */
function find<T>(predicate: (value: T) => boolean): (iterable: Iterable<T>) => T | undefined;
function find<T>(
  predicate: (value: T) => boolean | Promise<boolean>
): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => Promise<T | undefined>;
function find<T>(predicate: (value: T) => boolean, iterable: Iterable<T>): T | undefined;
function find<T>(
  predicate: (value: T) => boolean | Promise<boolean>,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): Promise<T | undefined>;
function find<T>(predicate: (value: T) => boolean | Promise<boolean>, iterable?: AnyIterableInput<PromiseLikeValue<T>>) {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<T>>) => find(predicate, next);
  }

  if (isAsyncInput(iterable)) {
    return (async () => {
      for await (const item of toAsync(iterable)) {
        if (await predicate(item as T)) {
          return item as T;
        }
      }
      return undefined;
    })();
  }

  if (isIterable(iterable)) {
    for (const item of iterable) {
      if (predicate(item as T)) {
        return item as T;
      }
    }
    return undefined;
  }

  throw new TypeError('find: input is not iterable');
}

export default find;
