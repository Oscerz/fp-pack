type AnyIterable<T> = Iterable<T> | AsyncIterable<T>;
type AnyIterableInput<T> = AnyIterable<T> | Promise<AnyIterable<T>>;

type PromiseLikeValue<T> = T | PromiseLike<T>;

const isPromiseLike = (value: unknown): value is PromiseLike<unknown> =>
  typeof value === 'object' && value !== null && 'then' in value && typeof (value as PromiseLike<unknown>).then === 'function';

const isAsyncIterable = (value: unknown): value is AsyncIterable<unknown> =>
  typeof value === 'object' &&
  value !== null &&
  Symbol.asyncIterator in value &&
  typeof (value as AsyncIterable<unknown>)[Symbol.asyncIterator] === 'function';

const isIterable = (value: unknown): value is Iterable<unknown> =>
  typeof value === 'object' &&
  value !== null &&
  Symbol.iterator in value &&
  typeof (value as Iterable<unknown>)[Symbol.iterator] === 'function';

const resolveIterable = async <T>(input: AnyIterableInput<T>): Promise<AnyIterable<T>> =>
  (isPromiseLike(input) ? await input : input) as AnyIterable<T>;

const awaitValue = async <T>(value: PromiseLikeValue<T>): Promise<T> => (isPromiseLike(value) ? await value : value);

export type { AnyIterable, AnyIterableInput, PromiseLikeValue };
export { isPromiseLike, isAsyncIterable, isIterable, resolveIterable, awaitValue };
