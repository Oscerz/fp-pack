import { describe, it, expect } from 'vitest';
import drop from './drop';
import toArray from './toArray';

describe('stream drop', () => {
  it('drops from sync iterables', () => {
    expect(Array.from(drop(2, [1, 2, 3, 4]))).toEqual([3, 4]);
  });

  it('supports data-last usage', () => {
    const dropTwo = drop(2);
    expect(Array.from(dropTwo([5, 6, 7]))).toEqual([7]);
  });

  it('drops from async inputs', async () => {
    const result = await toArray(drop(2, Promise.resolve([8, 9, 10, 11])));
    expect(result).toEqual([10, 11]);
  });
});
