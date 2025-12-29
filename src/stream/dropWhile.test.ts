import { describe, it, expect } from 'vitest';
import dropWhile from './dropWhile';
import toArray from './toArray';

describe('stream dropWhile', () => {
  it('drops while predicate holds (sync)', () => {
    const result = Array.from(dropWhile((n: number) => n < 3, [1, 2, 3, 2]));
    expect(result).toEqual([3, 2]);
  });

  it('supports data-last usage', () => {
    const dropSmall = dropWhile((n: number) => n <= 2);
    expect(Array.from(dropSmall([1, 2, 3, 4]))).toEqual([3, 4]);
  });

  it('drops while predicate holds (async)', async () => {
    const result = await toArray(dropWhile(async (n: number) => n < 3, Promise.resolve([1, 2, 3, 2])));
    expect(result).toEqual([3, 2]);
  });
});
