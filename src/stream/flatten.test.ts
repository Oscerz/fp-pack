import { describe, it, expect } from 'vitest';
import flatten from './flatten';
import toArray from './toArray';

describe('stream flatten', () => {
  it('flattens sync iterables', () => {
    const result = Array.from(flatten([[1, 2], [3]]));
    expect(result).toEqual([1, 2, 3]);
  });

  it('flattens async inputs', async () => {
    const result = await toArray(
      flatten(Promise.resolve([[1, 2], [3]]))
    );
    expect(result).toEqual([1, 2, 3]);
  });
});
