import { describe, it, expect } from 'vitest';
import has from './has';

describe('has', () => {
  it('checks for own properties', () => {
    const user = { id: 1 };
    expect(has('id', user)).toBe(true);
    expect(has('id', { id: 2 })).toBe(true);
  });
});
