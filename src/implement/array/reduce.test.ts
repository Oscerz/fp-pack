import { describe, it, expect } from 'vitest';
import reduce from './reduce';

describe('reduce', () => {
  it('reduces an array to a single value', () => {
    const sum = reduce((acc: number, n: number) => acc + n, 0, [1, 2, 3, 4]);
    expect(sum).toBe(10);
  });

  it('returns the initial value for empty arrays', () => {
    expect(reduce((acc: number, n: number) => acc + n, 5, [])).toBe(5);
  });

  it('can build up objects', () => {
    const result = reduce(
      (acc: Record<string, number>, n: number) => {
        acc[String(n)] = n * 10;
        return acc;
      },
      {},
      [1, 2]
    );
    expect(result).toEqual({ '1': 10, '2': 20 });
  });
});
