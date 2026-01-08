import { describe, it, expect } from 'vitest';
import pipeSideEffect from './pipeSideEffect';
import SideEffect from './sideEffect';

describe('pipeSideEffect', () => {
  it('short-circuits when SideEffect is returned', () => {
    const effect = new SideEffect(() => 'effect');
    const stop = (_value: number) => effect;
    const after = (_value: number) => _value + 1;

    const fn = pipeSideEffect((n: number) => n + 1, stop, after);
    const result = fn(1);

    expect(result).toBe(effect);
  });

  it('supports data-first invocation', () => {
    const addOne = (n: number) => n + 1;
    const double = (n: number) => n * 2;

    expect(pipeSideEffect(2, addOne, double)).toBe(6);
  });

  it('returns SideEffect inputs without executing the pipeline', () => {
    const effect = new SideEffect(() => 'effect');
    const fn = pipeSideEffect((n: number) => n + 1);

    expect(fn(effect)).toBe(effect);
  });

  it('supports zero-arity starts', () => {
    const start = () => 3;
    const addOne = (n: number) => n + 1;
    const fn = pipeSideEffect(start, addOne);

    expect(fn()).toBe(4);
  });
});
