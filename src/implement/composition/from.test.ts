import { describe, it, expect } from 'vitest';
import from from './from';

describe('from', () => {
  it('returns the same value regardless of input', () => {
    const getFive = from(5);
    expect(getFive('x')).toBe(5);
    expect(getFive(123)).toBe(5);
  });

  it('preserves reference identity', () => {
    const obj = { a: 1 };
    const getObj = from(obj);
    expect(getObj(null)).toBe(obj);
  });
});
