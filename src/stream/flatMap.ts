import type { AnyIterableInput, PromiseLikeValue } from './utils';
import { isAsyncInput, isIterable } from './utils';
import toAsync from './toAsync';

/** flatMap - lazy map + flatten */
function flatMap<T, R>(fn: (value: T) => Iterable<R>): (iterable: Iterable<T>) => IterableIterator<R>;
function flatMap<T, R>(
  fn: (value: T) => Iterable<R> | Promise<Iterable<R>>
): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<R>;
function flatMap<T, R>(fn: (value: T) => Iterable<R>, iterable: Iterable<T>): IterableIterator<R>;
function flatMap<T, R>(
  fn: (value: T) => Iterable<R> | Promise<Iterable<R>>,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): AsyncIterableIterator<R>;
function flatMap<T, R>(
  fn: (value: T) => Iterable<R> | Promise<Iterable<R>>,
  iterable?: AnyIterableInput<PromiseLikeValue<T>>
): any {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<T>>) => flatMap(fn, next);
  }

  if (isAsyncInput(iterable)) {
    return (async function* () {
      for await (const item of toAsync(iterable)) {
        const mapped = await fn(item as T);
        for (const inner of mapped) {
          yield inner;
        }
      }
    })();
  }

  if (isIterable(iterable)) {
    return (function* () {
      for (const item of iterable) {
        const mapped = fn(item as T) as Iterable<R>;
        for (const inner of mapped) {
          yield inner;
        }
      }
    })();
  }

  throw new TypeError('flatMap: input is not iterable');
}

export default flatMap;
