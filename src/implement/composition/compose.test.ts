import { describe, it, expect } from 'vitest';
import compose from './compose';
import SideEffect from './sideEffect';

describe('compose', () => {
  it('applies functions right-to-left', () => {
    const double = (n: number) => n * 2;
    const addOne = (n: number) => n + 1;

    const fn = compose(double, addOne);
    expect(fn(3)).toBe(8); // double(addOne(3))
  });

  it('supports mixed types across the chain', () => {
    const toString = (n: number) => `${n}`;
    const trim = (s: string) => s.trim();
    const length = (s: string) => s.length;
    const isLong = (len: number) => len > 2;

    const fn = compose(isLong, length, trim, toString);
    expect(fn(123)).toBe(true);
    expect(fn(5)).toBe(false);
  });

  it('works with a single function', () => {
    const square = (n: number) => n * n;
    const fn = compose(square);
    expect(fn(4)).toBe(16);
  });

  it('short-circuits when SideEffect is returned', () => {
    const effect = new SideEffect(() => 'effect');
    const stop = (_value: number) => effect;
    const after = (_value: number) => _value + 1;

    const fn = compose(after, stop, (n: number) => n + 1);
    const result = fn(1);

    expect(result).toBe(effect);
  });
});
