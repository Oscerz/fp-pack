import type { AnyIterableInput, PromiseLikeValue } from './utils';
import { isAsyncInput, isIterable } from './utils';
import toAsync from './toAsync';

/** every - check all values match */
function every<T>(predicate: (value: T) => boolean): (iterable: Iterable<T>) => boolean;
function every<T>(
  predicate: (value: T) => boolean | Promise<boolean>
): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => Promise<boolean>;
function every<T>(predicate: (value: T) => boolean, iterable: Iterable<T>): boolean;
function every<T>(
  predicate: (value: T) => boolean | Promise<boolean>,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): Promise<boolean>;
function every<T>(
  predicate: (value: T) => boolean | Promise<boolean>,
  iterable?: AnyIterableInput<PromiseLikeValue<T>>
): any {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<T>>) => every(predicate, next);
  }

  if (isAsyncInput(iterable)) {
    return (async () => {
      for await (const item of toAsync(iterable)) {
        if (!(await predicate(item as T))) {
          return false;
        }
      }
      return true;
    })();
  }

  if (isIterable(iterable)) {
    for (const item of iterable) {
      if (!predicate(item as T)) {
        return false;
      }
    }
    return true;
  }

  throw new TypeError('every: input is not iterable');
}

export default every;
