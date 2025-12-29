import { describe, it, expect } from 'vitest';
import map from './map';
import toArray from './toArray';

describe('stream map', () => {
  it('maps sync iterables', () => {
    expect(Array.from(map((n: number) => n * 2, [1, 2, 3]))).toEqual([2, 4, 6]);
  });

  it('supports data-last usage', () => {
    const mapper = map((n: number) => n + 1);
    expect(Array.from(mapper([1, 2]))).toEqual([2, 3]);
  });

  it('maps async inputs', async () => {
    const result = await toArray(map(async (n: number) => n * 3, Promise.resolve([1, 2])));
    expect(result).toEqual([3, 6]);
  });
});
