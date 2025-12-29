import { describe, it, expect } from 'vitest';
import dropWhile from './dropWhile';

describe('dropWhile', () => {
  it('drops while predicate holds', () => {
    expect(dropWhile((n: number) => n < 3, [1, 2, 3, 2])).toEqual([3, 2]);
  });

  it('supports data-last usage', () => {
    const dropSmall = dropWhile((n: number) => n <= 2);
    expect(dropSmall([1, 2, 3, 4])).toEqual([3, 4]);
  });
});
