import { describe, it, expect } from 'vitest';
import takeWhile from './takeWhile';

describe('takeWhile', () => {
  it('takes while predicate holds', () => {
    expect(takeWhile((n: number) => n < 3, [1, 2, 3, 1])).toEqual([1, 2]);
  });

  it('supports data-last usage', () => {
    const takeSmall = takeWhile((n: number) => n <= 2);
    expect(takeSmall([2, 2, 3])).toEqual([2, 2]);
  });
});
