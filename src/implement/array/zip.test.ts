import { describe, it, expect } from 'vitest';
import zip from './zip';

describe('zip', () => {
  it('pairs elements until the shortest length', () => {
    expect(zip(['a', 'b'], [1, 2, 3])).toEqual([
      [1, 'a'],
      [2, 'b'],
    ]);
  });

  it('returns empty array when one side is empty', () => {
    expect(zip([], [1, 2])).toEqual([]);
    expect(zip(['a'], [])).toEqual([]);
  });
});
