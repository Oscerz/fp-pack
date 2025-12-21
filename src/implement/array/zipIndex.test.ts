import { describe, it, expect } from 'vitest';
import zipIndex from './zipIndex';

describe('zipIndex', () => {
  it('pairs each element with its index', () => {
    expect(zipIndex(['a', 'b', 'c'])).toEqual([
      [0, 'a'],
      [1, 'b'],
      [2, 'c'],
    ]);
  });

  it('returns an empty array for empty input', () => {
    expect(zipIndex([])).toEqual([]);
  });
});
