import { describe, it, expect } from 'vitest';
import includes from './includes';

describe('includes', () => {
  it('checks substring in string', () => {
    expect(includes('ba', 'banana')).toBe(true);
    expect(includes('ac', 'banana')).toBe(false);
  });

  it('checks deep equality in arrays', () => {
    expect(includes(3, [1, 2, 3])).toBe(true);
    expect(includes(4, [1, 2, 3])).toBe(false);
    expect(includes({ name: 'Fred' }, [{ name: 'Fred' }])).toBe(true);
    expect(includes([42], [[42]])).toBe(true);
  });
});
