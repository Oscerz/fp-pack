import type { AnyIterableInput, PromiseLikeValue } from './utils';
import { awaitValue, isAsyncIterable, isIterable, resolveIterable } from './utils';

/** toArray - Iterable/AsyncIterable을 배열로 수집 */
async function toArray<T>(input: AnyIterableInput<PromiseLikeValue<T>>): Promise<T[]> {
  const resolved = await resolveIterable(input);
  const result: T[] = [];

  if (isAsyncIterable(resolved)) {
    for await (const item of resolved) {
      result.push(await awaitValue(item));
    }
    return result;
  }

  if (isIterable(resolved)) {
    for (const item of resolved) {
      result.push(await awaitValue(item));
    }
    return result;
  }

  throw new TypeError('toArray: input is not iterable');
}

export default toArray;
