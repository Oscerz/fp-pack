import { describe, it, expect } from 'vitest';
import concat from './concat';

describe('concat', () => {
  it('concats arrays', () => {
    expect(concat([3, 4], [1, 2])).toEqual([1, 2, 3, 4]);
  });

  it('supports data-last usage', () => {
    const concatTail = concat([3]);
    expect(concatTail([1, 2])).toEqual([1, 2, 3]);
  });
});
