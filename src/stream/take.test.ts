import { describe, it, expect } from 'vitest';
import take from './take';
import toArray from './toArray';

describe('stream take', () => {
  it('takes from sync iterables', () => {
    expect(Array.from(take(2, [1, 2, 3]))).toEqual([1, 2]);
  });

  it('supports data-last usage', () => {
    const takeTwo = take(2);
    expect(Array.from(takeTwo([4, 5, 6]))).toEqual([4, 5]);
  });

  it('takes from async inputs', async () => {
    const result = await toArray(take(2, Promise.resolve([7, 8, 9])));
    expect(result).toEqual([7, 8]);
  });
});
