import { describe, it, expect } from 'vitest';
import map from './map';

describe('map', () => {
  it('maps each element using the provided function', () => {
    expect(map((n: number) => n * 2, [1, 2, 3])).toEqual([2, 4, 6]);
  });

  it('returns an empty array for empty input', () => {
    expect(map((n: number) => n * 2, [])).toEqual([]);
  });
});
