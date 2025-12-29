import type { AnyIterableInput, PromiseLikeValue } from './utils';
import { isAsyncInput, isIterable } from './utils';
import toAsync from './toAsync';

/** zip - lazily combine two iterables */
function zip<A, B>(other: Iterable<B>): (iterable: Iterable<A>) => IterableIterator<[A, B]>;
function zip<A, B>(
  other: AnyIterableInput<PromiseLikeValue<B>>
): (iterable: AnyIterableInput<PromiseLikeValue<A>>) => AsyncIterableIterator<[A, B]>;
function zip<A, B>(other: Iterable<B>, iterable: Iterable<A>): IterableIterator<[A, B]>;
function zip<A, B>(
  other: AnyIterableInput<PromiseLikeValue<B>>,
  iterable: AnyIterableInput<PromiseLikeValue<A>>
): AsyncIterableIterator<[A, B]>;
function zip<A, B>(other: AnyIterableInput<PromiseLikeValue<B>>, iterable?: AnyIterableInput<PromiseLikeValue<A>>): any {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<A>>) => zip(other, next);
  }

  if (isAsyncInput(other) || isAsyncInput(iterable)) {
    return (async function* () {
      const left = toAsync(iterable);
      const right = toAsync(other);
      const leftIter = left[Symbol.asyncIterator]();
      const rightIter = right[Symbol.asyncIterator]();

      while (true) {
        const [leftResult, rightResult] = await Promise.all([leftIter.next(), rightIter.next()]);
        if (leftResult.done || rightResult.done) {
          return;
        }
        yield [leftResult.value as A, rightResult.value as B];
      }
    })();
  }

  if (isIterable(iterable) && isIterable(other)) {
    return (function* () {
      const leftIter = (iterable as Iterable<A>)[Symbol.iterator]();
      const rightIter = (other as Iterable<B>)[Symbol.iterator]();

      while (true) {
        const leftResult = leftIter.next();
        const rightResult = rightIter.next();
        if (leftResult.done || rightResult.done) {
          return;
        }
        yield [leftResult.value as A, rightResult.value as B];
      }
    })();
  }

  throw new TypeError('zip: input is not iterable');
}

export default zip;
