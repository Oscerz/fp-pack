import { describe, it, expect } from 'vitest';
import takeWhile from './takeWhile';
import toArray from './toArray';

describe('stream takeWhile', () => {
  it('takes while predicate holds (sync)', () => {
    const result = Array.from(takeWhile((n: number) => n < 3, [1, 2, 3, 1]));
    expect(result).toEqual([1, 2]);
  });

  it('supports data-last usage', () => {
    const takeSmall = takeWhile((n: number) => n <= 2);
    expect(Array.from(takeSmall([2, 2, 3]))).toEqual([2, 2]);
  });

  it('takes while predicate holds (async)', async () => {
    const result = await toArray(takeWhile(async (n: number) => n < 3, Promise.resolve([1, 2, 3, 1])));
    expect(result).toEqual([1, 2]);
  });
});
