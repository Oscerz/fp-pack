import { describe, it, expect } from 'vitest';
import scan from './scan';

describe('scan', () => {
  it('returns accumulated values', () => {
    expect(scan((acc: number, n: number) => acc + n, 0, [1, 2, 3])).toEqual([1, 3, 6]);
  });

  it('supports data-last usage', () => {
    const runningSum = scan((acc: number, n: number) => acc + n, 0);
    expect(runningSum([2, 2])).toEqual([2, 4]);
  });
});
