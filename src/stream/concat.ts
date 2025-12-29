import type { AnyIterableInput, PromiseLikeValue } from './utils';
import { isAsyncInput, isIterable } from './utils';
import toAsync from './toAsync';

/** concat - lazily concatenate two iterables */
function concat<T>(other: Iterable<T>): (iterable: Iterable<T>) => IterableIterator<T>;
function concat<T>(other: AnyIterableInput<PromiseLikeValue<T>>): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<T>;
function concat<T>(other: Iterable<T>, iterable: Iterable<T>): IterableIterator<T>;
function concat<T>(
  other: AnyIterableInput<PromiseLikeValue<T>>,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): AsyncIterableIterator<T>;
function concat<T>(other: AnyIterableInput<PromiseLikeValue<T>>, iterable?: AnyIterableInput<PromiseLikeValue<T>>): any {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<T>>) => concat(other, next);
  }

  if (isAsyncInput(other) || isAsyncInput(iterable)) {
    return (async function* () {
      for await (const item of toAsync(iterable)) {
        yield item as T;
      }
      for await (const item of toAsync(other)) {
        yield item as T;
      }
    })();
  }

  if (isIterable(iterable) && isIterable(other)) {
    return (function* () {
      for (const item of iterable) {
        yield item as T;
      }
      for (const item of other as Iterable<T>) {
        yield item as T;
      }
    })();
  }

  throw new TypeError('concat: input is not iterable');
}

export default concat;
