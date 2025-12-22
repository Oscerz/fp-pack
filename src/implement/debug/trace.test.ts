import { describe, it, expect, vi } from 'vitest';
import trace from './trace';

describe('trace', () => {
  it('logs the value and returns it', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const result = trace<number>()(3);
    expect(spy).toHaveBeenCalledWith(3);
    expect(result).toBe(3);
    spy.mockRestore();
  });

  it('logs the label and value when label is provided', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const result = trace('step')(9);
    expect(spy).toHaveBeenCalledWith('step', 9);
    expect(result).toBe(9);
    spy.mockRestore();
  });
});
