import { describe, it, expect } from 'vitest';
import endsWith from './endsWith';

describe('endsWith', () => {
  it('returns true when string ends with suffix', () => {
    expect(endsWith('c', 'abc')).toBe(true);
    expect(endsWith('abc', 'abc')).toBe(true);
  });

  it('returns false when string does not end with suffix', () => {
    expect(endsWith('b', 'abc')).toBe(false);
  });

  it('works with empty suffix', () => {
    expect(endsWith('', 'abc')).toBe(true);
  });

  it('handles array suffix', () => {
    expect(endsWith(['c'], ['a', 'b', 'c'])).toBe(true);
    expect(endsWith(['b'], ['a', 'b', 'c'])).toBe(false);
    expect(endsWith(['b', 'c'], ['a', 'b', 'c'])).toBe(true);
  });
});
