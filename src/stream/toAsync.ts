import type { AnyIterable, AnyIterableInput, PromiseLikeValue } from './utils';
import { awaitValue, isAsyncIterable, isIterable, resolveIterable } from './utils';

/** toAsync - Iterable/AsyncIterable을 AsyncIterable로 승격 */
function toAsync<T>(input: AnyIterableInput<PromiseLikeValue<T>>): AsyncIterable<T> {
  const iterator = async function* () {
    const resolved = await resolveIterable(input);

    if (isAsyncIterable(resolved)) {
      for await (const item of resolved) {
        yield await awaitValue(item);
      }
      return;
    }

    if (isIterable(resolved)) {
      for (const item of resolved) {
        yield await awaitValue(item);
      }
      return;
    }

    throw new TypeError('toAsync: input is not iterable');
  };

  return iterator();
}

export default toAsync;
export type { AnyIterable };
