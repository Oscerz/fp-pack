import { describe, it, expect, vi } from 'vitest';
import log from './log';

describe('log', () => {
  it('logs the value and returns it', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const result = log<number>()(42);
    expect(spy).toHaveBeenCalledWith(42);
    expect(result).toBe(42);
    spy.mockRestore();
  });

  it('logs the label and value when label is provided', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const result = log('value')(7);
    expect(spy).toHaveBeenCalledWith('value', 7);
    expect(result).toBe(7);
    spy.mockRestore();
  });
});
