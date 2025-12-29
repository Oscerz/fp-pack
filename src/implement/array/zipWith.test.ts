import { describe, it, expect } from 'vitest';
import zipWith from './zipWith';

describe('zipWith', () => {
  it('zips arrays with a function', () => {
    expect(zipWith((a: number, b: number) => a + b, [10, 20], [1, 2, 3])).toEqual([11, 22]);
  });

  it('supports data-last usage', () => {
    const zipper = zipWith((a: number, b: number) => a * b, [2, 3]);
    expect(zipper([4, 5, 6])).toEqual([8, 15]);
  });
});
