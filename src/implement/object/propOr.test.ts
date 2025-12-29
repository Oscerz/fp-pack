import { describe, it, expect } from 'vitest';
import propOr from './propOr';

describe('propOr', () => {
  it('returns property when present', () => {
    const user = { id: 1, name: 'Ada' };
    expect(propOr('unknown', 'name', user)).toBe('Ada');
  });

  it('returns default when missing or nullish', () => {
    const user = { id: 1, name: null as string | null };
    expect(propOr('unknown', 'name', user)).toBe('unknown');
    expect(propOr('none', 'age' as keyof typeof user, user)).toBe('none');
  });
});
