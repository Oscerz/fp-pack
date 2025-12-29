import type { AnyIterableInput, PromiseLikeValue } from './utils';
import { awaitValue, isAsyncInput, isIterable } from './utils';
import toAsync from './toAsync';

/** append - lazily append a value to the end */
function append<T>(value: T): (iterable: Iterable<T>) => IterableIterator<T>;
function append<T>(value: PromiseLikeValue<T>): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<T>;
function append<T>(value: T, iterable: Iterable<T>): IterableIterator<T>;
function append<T>(
  value: PromiseLikeValue<T>,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): AsyncIterableIterator<T>;
function append<T>(value: PromiseLikeValue<T>, iterable?: AnyIterableInput<PromiseLikeValue<T>>): any {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<T>>) => append(value, next);
  }

  if (isAsyncInput(iterable)) {
    return (async function* () {
      for await (const item of toAsync(iterable)) {
        yield item as T;
      }
      yield await awaitValue(value);
    })();
  }

  if (isIterable(iterable)) {
    return (function* () {
      for (const item of iterable) {
        yield item as T;
      }
      yield value as T;
    })();
  }

  throw new TypeError('append: input is not iterable');
}

export default append;
