import { describe, it, expect, vi } from 'vitest';
import ifElse from './ifElse';

describe('ifElse', () => {
  it('runs onTrue when predicate is true', () => {
    const fn = ifElse(
      (n: number) => n > 0,
      (n) => `positive ${n}`,
      (n) => `non-positive ${n}`
    );
    expect(fn(3)).toBe('positive 3');
  });

  it('runs onFalse when predicate is false', () => {
    const fn = ifElse(
      (n: number) => n > 0,
      () => 'yes',
      () => 'no'
    );
    expect(fn(-1)).toBe('no');
  });

  it('supports different return types for onTrue/onFalse', () => {
    const fn = ifElse(
      (flag: boolean) => flag,
      () => ({ ok: true }),
      () => 'nope'
    );

    expect(fn(true)).toEqual({ ok: true });
    expect(fn(false)).toBe('nope');
  });

  it('passes the original value to handlers', () => {
    const spyTrue = vi.fn((n: number) => n * 2);
    const spyFalse = vi.fn((n: number) => n * -1);
    const fn = ifElse(
      (n: number) => n % 2 === 0,
      spyTrue,
      spyFalse
    );

    expect(fn(4)).toBe(8);
    expect(spyTrue).toHaveBeenCalledWith(4);
    expect(spyFalse).not.toHaveBeenCalled();

    expect(fn(3)).toBe(-3);
    expect(spyFalse).toHaveBeenCalledWith(3);
  });
});
