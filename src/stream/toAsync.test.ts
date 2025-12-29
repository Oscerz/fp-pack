import { describe, it, expect } from 'vitest';
import toAsync from './toAsync';
import toArray from './toArray';

describe('stream toAsync', () => {
  it('converts iterable of promises', async () => {
    const input = [Promise.resolve(1), Promise.resolve(2), 3];
    const result = await toArray(toAsync(input));
    expect(result).toEqual([1, 2, 3]);
  });
});
