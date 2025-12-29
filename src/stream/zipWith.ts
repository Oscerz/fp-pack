import type { AnyIterableInput, PromiseLikeValue } from './utils';
import { isAsyncInput, isIterable } from './utils';
import toAsync from './toAsync';

/** zipWith - lazily combine two iterables with a function */
function zipWith<A, B, R>(fn: (a: A, b: B) => R, other: Iterable<B>): (iterable: Iterable<A>) => IterableIterator<R>;
function zipWith<A, B, R>(
  fn: (a: A, b: B) => R | Promise<R>,
  other: AnyIterableInput<PromiseLikeValue<B>>
): (iterable: AnyIterableInput<PromiseLikeValue<A>>) => AsyncIterableIterator<R>;
function zipWith<A, B, R>(fn: (a: A, b: B) => R, other: Iterable<B>, iterable: Iterable<A>): IterableIterator<R>;
function zipWith<A, B, R>(
  fn: (a: A, b: B) => R | Promise<R>,
  other: AnyIterableInput<PromiseLikeValue<B>>,
  iterable: AnyIterableInput<PromiseLikeValue<A>>
): AsyncIterableIterator<R>;
function zipWith<A, B, R>(
  fn: (a: A, b: B) => R | Promise<R>,
  other: AnyIterableInput<PromiseLikeValue<B>>,
  iterable?: AnyIterableInput<PromiseLikeValue<A>>
): any {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<A>>) => zipWith(fn, other, next);
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
        yield await fn(leftResult.value as A, rightResult.value as B);
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
        yield fn(leftResult.value as A, rightResult.value as B) as R;
      }
    })();
  }

  throw new TypeError('zipWith: input is not iterable');
}

export default zipWith;
