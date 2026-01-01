import { describe, it, expect } from 'vitest';
import pipeSideEffectStrict from './pipeSideEffectStrict';
import SideEffect from './sideEffect';

describe('pipeSideEffectStrict', () => {
  it('short-circuits when SideEffect is returned', () => {
    const effect = new SideEffect(() => 'effect');
    const stop = (_value: number) => effect;
    const after = (_value: number) => _value + 1;

    const fn = pipeSideEffectStrict((n: number) => n + 1, stop, after);
    const result = fn(1);

    expect(result).toBe(effect);
  });

  it('returns SideEffect inputs without executing the pipeline', () => {
    const effect = new SideEffect(() => 'effect');
    const fn = pipeSideEffectStrict((n: number) => n + 1);

    expect(fn(effect)).toBe(effect);
  });
});
