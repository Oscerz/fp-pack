import type { AnyIterableInput, PromiseLikeValue } from './utils';
import { isAsyncInput, isIterable } from './utils';
import toAsync from './toAsync';

/** some - check any value matches */
function some<T>(predicate: (value: T) => boolean): (iterable: Iterable<T>) => boolean;
function some<T>(
  predicate: (value: T) => boolean | Promise<boolean>
): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => Promise<boolean>;
function some<T>(predicate: (value: T) => boolean, iterable: Iterable<T>): boolean;
function some<T>(
  predicate: (value: T) => boolean | Promise<boolean>,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): Promise<boolean>;
function some<T>(
  predicate: (value: T) => boolean | Promise<boolean>,
  iterable?: AnyIterableInput<PromiseLikeValue<T>>
): any {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<T>>) => some(predicate, next);
  }

  if (isAsyncInput(iterable)) {
    return (async () => {
      for await (const item of toAsync(iterable)) {
        if (await predicate(item as T)) {
          return true;
        }
      }
      return false;
    })();
  }

  if (isIterable(iterable)) {
    for (const item of iterable) {
      if (predicate(item as T)) {
        return true;
      }
    }
    return false;
  }

  throw new TypeError('some: input is not iterable');
}

export default some;
