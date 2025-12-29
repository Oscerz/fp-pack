import { describe, it, expect } from 'vitest';
import reduce from './reduce';

describe('stream reduce', () => {
  it('reduces sync iterables', () => {
    expect(reduce((acc: number, n: number) => acc + n, 0, [1, 2, 3])).toBe(6);
  });

  it('supports data-last usage', () => {
    const sum = reduce((acc: number, n: number) => acc + n, 0);
    expect(sum([4, 5])).toBe(9);
  });

  it('reduces async inputs', async () => {
    const result = await reduce(async (acc: number, n: number) => acc + n, 0, Promise.resolve([2, 4]));
    expect(result).toBe(6);
  });
});
