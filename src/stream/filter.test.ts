import { describe, it, expect } from 'vitest';
import filter from './filter';
import toArray from './toArray';

describe('stream filter', () => {
  it('filters sync iterables', () => {
    expect(Array.from(filter((n: number) => n % 2 === 0, [1, 2, 3, 4]))).toEqual([2, 4]);
  });

  it('supports data-last usage', () => {
    const even = filter((n: number) => n % 2 === 0);
    expect(Array.from(even([1, 2, 3, 4]))).toEqual([2, 4]);
  });

  it('filters async inputs', async () => {
    const result = await toArray(filter(async (n: number) => n > 1, Promise.resolve([1, 2, 3])));
    expect(result).toEqual([2, 3]);
  });
});
