import { describe, it, expect } from 'vitest';
import propStrict from './propStrict';

describe('propStrict', () => {
  it('gets a property', () => {
    const user = { id: 1, name: 'A' };
    expect(propStrict('name', user)).toBe('A');
  });

  it('supports currying', () => {
    const user = { name: 'A' };
    const getName = propStrict('name');
    expect(getName(user)).toBe('A');
  });

  it('throws when property is missing', () => {
    type User = { name: string; age?: number };
    const user: User = { name: 'A' };
    expect(() => propStrict('age', user)).toThrow(/propStrict/);
  });

  it('throws when value is null or undefined', () => {
    const nullUser: { name: string | null } = { name: null };
    expect(() => propStrict('name', nullUser)).toThrow(/propStrict/);

    const undefinedUser: { name: string | undefined } = { name: undefined };
    expect(() => propStrict('name', undefinedUser)).toThrow(/propStrict/);
  });
});
