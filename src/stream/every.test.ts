import { describe, it, expect } from 'vitest';
import every from './every';

describe('stream every', () => {
  it('checks sync iterables', () => {
    expect(every((n: number) => n > 0, [1, 2, 3])).toBe(true);
    expect(every((n: number) => n > 2, [1, 2, 3])).toBe(false);
  });

  it('supports data-last usage', () => {
    const allEven = every((n: number) => n % 2 === 0);
    expect(allEven([2, 4, 6])).toBe(true);
  });

  it('checks async inputs', async () => {
    const result = await every(async (n: number) => n < 5, Promise.resolve([1, 2, 3]));
    expect(result).toBe(true);
  });
});
