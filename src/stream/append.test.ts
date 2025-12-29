import { describe, it, expect } from 'vitest';
import append from './append';
import toArray from './toArray';

describe('stream append', () => {
  it('appends sync iterables', () => {
    const result = Array.from(append(3, [1, 2]));
    expect(result).toEqual([1, 2, 3]);
  });

  it('supports data-last usage', () => {
    const addTail = append(4);
    expect(Array.from(addTail([1, 2]))).toEqual([1, 2, 4]);
  });

  it('appends async inputs', async () => {
    const result = await toArray(append(Promise.resolve(3), Promise.resolve([1, 2])));
    expect(result).toEqual([1, 2, 3]);
  });
});
