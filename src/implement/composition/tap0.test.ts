import { vi, describe, it, expect } from 'vitest';
import tap0 from './tap0';

describe('tap0', () => {
  it('runs the side effect without input', () => {
    const spy = vi.fn();
    tap0(spy)();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('returns undefined', () => {
    const result = tap0(() => {})();
    expect(result).toBeUndefined();
  });
});
