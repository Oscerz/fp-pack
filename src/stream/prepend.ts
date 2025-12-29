import type { AnyIterableInput, PromiseLikeValue } from './utils';
import { awaitValue, isAsyncInput, isIterable } from './utils';
import toAsync from './toAsync';

/** prepend - lazily prepend a value to the start */
function prepend<T>(value: T): (iterable: Iterable<T>) => IterableIterator<T>;
function prepend<T>(value: PromiseLikeValue<T>): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<T>;
function prepend<T>(value: T, iterable: Iterable<T>): IterableIterator<T>;
function prepend<T>(
  value: PromiseLikeValue<T>,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): AsyncIterableIterator<T>;
function prepend<T>(value: PromiseLikeValue<T>, iterable?: AnyIterableInput<PromiseLikeValue<T>>): any {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<T>>) => prepend(value, next);
  }

  if (isAsyncInput(iterable)) {
    return (async function* () {
      yield await awaitValue(value);
      for await (const item of toAsync(iterable)) {
        yield item as T;
      }
    })();
  }

  if (isIterable(iterable)) {
    return (function* () {
      yield value as T;
      for (const item of iterable) {
        yield item as T;
      }
    })();
  }

  throw new TypeError('prepend: input is not iterable');
}

export default prepend;
