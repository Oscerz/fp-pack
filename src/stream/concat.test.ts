import { describe, it, expect } from 'vitest';
import concat from './concat';
import toArray from './toArray';

describe('stream concat', () => {
  it('concats sync iterables', () => {
    const result = Array.from(concat([3, 4], [1, 2]));
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it('supports data-last usage', () => {
    const concatTail = concat([3]);
    expect(Array.from(concatTail([1, 2]))).toEqual([1, 2, 3]);
  });

  it('concats async inputs', async () => {
    const result = await toArray(concat(Promise.resolve([3, 4]), Promise.resolve([1, 2])));
    expect(result).toEqual([1, 2, 3, 4]);
  });
});
