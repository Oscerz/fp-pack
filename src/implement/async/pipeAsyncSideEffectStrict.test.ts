import { describe, it, expect } from 'vitest';
import pipeAsyncSideEffectStrict from './pipeAsyncSideEffectStrict';
import SideEffect from '../composition/sideEffect';

describe('pipeAsyncSideEffectStrict', () => {
  it('short-circuits when SideEffect is returned', async () => {
    const effect = new SideEffect(() => 'effect');
    const stop = async (_value: number) => effect;
    const after = async (_value: number) => _value + 1;

    const fn = pipeAsyncSideEffectStrict(async (n: number) => n + 1, stop, after);
    const result = await fn(1);

    expect(result).toBe(effect);
  });

  it('returns SideEffect inputs without executing the pipeline', async () => {
    const effect = new SideEffect(() => 'effect');
    const fn = pipeAsyncSideEffectStrict(async (n: number) => n + 1);

    await expect(fn(effect)).resolves.toBe(effect);
  });
});
