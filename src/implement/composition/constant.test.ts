import { describe, it, expect } from 'vitest';
import constant from './constant';

describe('constant', () => {
  it('returns a function that always returns the same value', () => {
    const alwaysFive = constant(5);
    expect(alwaysFive()).toBe(5);
    expect(alwaysFive()).toBe(5);
  });

  it('preserves reference identity', () => {
    const obj = { a: 1 };
    const alwaysObj = constant(obj);
    expect(alwaysObj()).toBe(obj);
  });
});
