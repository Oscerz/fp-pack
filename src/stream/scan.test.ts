import { describe, it, expect } from 'vitest';
import scan from './scan';
import toArray from './toArray';

describe('stream scan', () => {
  it('scans sync iterables', () => {
    const result = Array.from(scan((acc: number, n: number) => acc + n, 0, [1, 2, 3]));
    expect(result).toEqual([1, 3, 6]);
  });

  it('supports data-last usage', () => {
    const runningSum = scan((acc: number, n: number) => acc + n, 0);
    expect(Array.from(runningSum([2, 2]))).toEqual([2, 4]);
  });

  it('scans async inputs', async () => {
    const result = await toArray(
      scan(async (acc: number, n: number) => acc + n, 0, Promise.resolve([1, 2]))
    );
    expect(result).toEqual([1, 3]);
  });
});
