import { describe, it, expect } from 'vitest';
import zip from './zip';
import toArray from './toArray';

describe('stream zip', () => {
  it('zips sync iterables', () => {
    const result = Array.from(zip(['a', 'b'], [1, 2, 3]));
    expect(result).toEqual([
      [1, 'a'],
      [2, 'b'],
    ]);
  });

  it('supports data-last usage', () => {
    const zipper = zip(['x', 'y']);
    expect(Array.from(zipper([10, 20, 30]))).toEqual([
      [10, 'x'],
      [20, 'y'],
    ]);
  });

  it('zips async inputs', async () => {
    const result = await toArray(zip(Promise.resolve(['q', 'w']), Promise.resolve([1, 2, 3])));
    expect(result).toEqual([
      [1, 'q'],
      [2, 'w'],
    ]);
  });
});
