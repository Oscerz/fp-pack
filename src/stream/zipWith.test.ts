import { describe, it, expect } from 'vitest';
import zipWith from './zipWith';
import toArray from './toArray';

describe('stream zipWith', () => {
  it('zips with function (sync)', () => {
    const result = Array.from(zipWith((a: number, b: number) => a + b, [10, 20], [1, 2, 3]));
    expect(result).toEqual([11, 22]);
  });

  it('supports data-last usage', () => {
    const zipper = zipWith((a: number, b: number) => a * b, [2, 3]);
    expect(Array.from(zipper([4, 5, 6]))).toEqual([8, 15]);
  });

  it('zips with function (async)', async () => {
    const result = await toArray(
      zipWith(async (a: number, b: number) => a + b, Promise.resolve([10, 20]), Promise.resolve([1, 2, 3]))
    );
    expect(result).toEqual([11, 22]);
  });
});
