import { describe, it, expect } from 'vitest';
import flatMap from './flatMap';
import toArray from './toArray';

describe('stream flatMap', () => {
  it('flatMaps sync iterables', () => {
    const result = Array.from(flatMap((n: number) => [n, n + 1], [1, 2]));
    expect(result).toEqual([1, 2, 2, 3]);
  });

  it('supports data-last usage', () => {
    const mapper = flatMap((n: number) => [n * 2]);
    expect(Array.from(mapper([2, 3]))).toEqual([4, 6]);
  });

  it('flatMaps async inputs', async () => {
    const result = await toArray(flatMap(async (n: number) => [n, n * 2], Promise.resolve([1, 2])));
    expect(result).toEqual([1, 2, 2, 4]);
  });
});
