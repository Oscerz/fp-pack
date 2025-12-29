import { describe, it, expect } from 'vitest';
import find from './find';

describe('stream find', () => {
  it('finds in sync iterables', () => {
    expect(find((n: number) => n > 2, [1, 2, 3])).toBe(3);
  });

  it('supports data-last usage', () => {
    const findEven = find((n: number) => n % 2 === 0);
    expect(findEven([1, 3, 4, 5])).toBe(4);
  });

  it('finds in async inputs', async () => {
    const result = await find(async (n: number) => n === 2, Promise.resolve([1, 2, 3]));
    expect(result).toBe(2);
  });
});
