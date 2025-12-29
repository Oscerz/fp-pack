import { describe, it, expect } from 'vitest';
import complement from './complement';

describe('complement', () => {
  it('negates predicate results', () => {
    const isEven = (n: number) => n % 2 === 0;
    expect(complement(isEven, 2)).toBe(false);
    expect(complement(isEven, 3)).toBe(true);
  });

  it('supports data-last usage', () => {
    const isEven = (n: number) => n % 2 === 0;
    const isOdd = complement(isEven);
    expect(isOdd(1)).toBe(true);
    expect(isOdd(2)).toBe(false);
  });
});
