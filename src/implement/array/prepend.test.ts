import { describe, it, expect } from 'vitest';
import prepend from './prepend';

describe('prepend', () => {
  it('prepends value to array', () => {
    expect(prepend(0, [1, 2])).toEqual([0, 1, 2]);
  });

  it('supports data-last usage', () => {
    const addHead = prepend(-1);
    expect(addHead([1, 2])).toEqual([-1, 1, 2]);
  });
});
