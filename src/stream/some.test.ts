import { describe, it, expect } from 'vitest';
import some from './some';

describe('stream some', () => {
  it('checks sync iterables', () => {
    expect(some((n: number) => n > 2, [1, 2, 3])).toBe(true);
    expect(some((n: number) => n > 5, [1, 2, 3])).toBe(false);
  });

  it('supports data-last usage', () => {
    const hasEven = some((n: number) => n % 2 === 0);
    expect(hasEven([1, 3, 5])).toBe(false);
  });

  it('checks async inputs', async () => {
    const result = await some(async (n: number) => n === 2, Promise.resolve([1, 2, 3]));
    expect(result).toBe(true);
  });
});
