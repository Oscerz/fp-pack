import { describe, it, expect } from 'vitest';
import flatten from './flatten';

describe('flatten', () => {
  it('flattens a single level', () => {
    expect(flatten([[1, 2], [3]])).toEqual([1, 2, 3]);
  });
});
