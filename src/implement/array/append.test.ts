import { describe, it, expect } from 'vitest';
import append from './append';

describe('append', () => {
  it('appends value to array', () => {
    expect(append(3, [1, 2])).toEqual([1, 2, 3]);
  });

  it('supports data-last usage', () => {
    const addTail = append(4);
    expect(addTail([1, 2])).toEqual([1, 2, 4]);
  });
});
