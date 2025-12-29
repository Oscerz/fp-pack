import { describe, it, expect } from 'vitest';
import mergeAll from './mergeAll';

describe('mergeAll', () => {
  it('merges an array of objects shallowly', () => {
    const result = mergeAll([{ id: 1 }, { name: 'Ada' }, { id: 2 }]);
    expect(result).toEqual({ id: 2, name: 'Ada' });
  });

  it('returns empty object for empty array', () => {
    expect(mergeAll([])).toEqual({});
  });
});
