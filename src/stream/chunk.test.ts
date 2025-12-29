import { describe, it, expect } from 'vitest';
import chunk from './chunk';
import toArray from './toArray';
import toAsync from './toAsync';
import pipeAsync from '../implement/async/pipeAsync';

describe('stream chunk', () => {
  it('chunks sync iterables with direct next()', () => {
    const iter = chunk(2, [1, 2, 3, 4]);
    expect(iter.next()).toEqual({ done: false, value: [1, 2] });
    expect(iter.next()).toEqual({ done: false, value: [3, 4] });
    expect(iter.next()).toEqual({ done: true, value: undefined });
  });

  it('chunks async inputs', async () => {
    const result = await toArray(chunk(2, Promise.resolve([1, 2, 3, 4])));
    expect(result).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  it('supports data-last usage', async () => {
    const result = await toArray(chunk(2)([1, 2, 3, 4]));
    expect(result).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  it('works with pipeAsync and stream utilities', async () => {
    const syncResult = await pipeAsync(chunk(2), toArray)([1, 2, 3, 4]);
    expect(syncResult).toEqual([
      [1, 2],
      [3, 4],
    ]);

    const asyncResult = await pipeAsync(
      chunk(2),
      toArray
    )(Promise.resolve([1, 2, 3, 4]));
    expect(asyncResult).toEqual([
      [1, 2],
      [3, 4],
    ]);

    const asyncValuesResult = await pipeAsync(
      toAsync,
      chunk(2),
      toArray
    )([
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3),
      Promise.resolve(4),
    ]);
    expect(asyncValuesResult).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });
});
