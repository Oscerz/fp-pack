import { describe, it, expect } from 'vitest';
import prepend from './prepend';
import toArray from './toArray';

describe('stream prepend', () => {
  it('prepends sync iterables', () => {
    const result = Array.from(prepend(0, [1, 2]));
    expect(result).toEqual([0, 1, 2]);
  });

  it('supports data-last usage', () => {
    const addHead = prepend(-1);
    expect(Array.from(addHead([1, 2]))).toEqual([-1, 1, 2]);
  });

  it('prepends async inputs', async () => {
    const result = await toArray(prepend(Promise.resolve(0), Promise.resolve([1, 2])));
    expect(result).toEqual([0, 1, 2]);
  });
});
