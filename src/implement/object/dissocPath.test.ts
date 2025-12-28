import { describe, it, expect } from 'vitest';
import dissocPath from './dissocPath';

describe('dissocPath', () => {
  it('removes a nested value', () => {
    const data = { a: { b: { c: 42 } } };
    const updated = dissocPath<{ a: { b: { c: {} } } }>(['a', 'b', 'c'], data);

    expect(updated).toEqual({ a: { b: {} } });
  });

  it('removes an array index', () => {
    const data = { a: [1, 2, 3] };
    const updated = dissocPath(['a', 1], data);

    expect(updated).toEqual({ a: [1, 3] });
  });
});
