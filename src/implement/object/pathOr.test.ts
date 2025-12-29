import { describe, it, expect } from 'vitest';
import pathOr from './pathOr';

describe('pathOr', () => {
  it('returns nested value when present', () => {
    const user = { profile: { name: 'Ada' } };
    expect(pathOr('unknown', ['profile', 'name'], user)).toBe('Ada');
  });

  it('returns default when missing or nullish', () => {
    const user = { profile: { name: null as string | null } };
    expect(pathOr('unknown', ['profile', 'name'], user)).toBe('unknown');
    expect(pathOr('none', ['profile', 'age'], user)).toBe('none');
  });
});
