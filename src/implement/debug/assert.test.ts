import { describe, it, expect } from 'vitest';
import assert from './assert';

describe('assert', () => {
  it('does nothing when condition is true', () => {
    expect(() => assert(true)).not.toThrow();
  });

  it('throws when condition is false', () => {
    expect(() => assert(false)).toThrow('Assertion failed');
  });

  it('uses a custom message when provided', () => {
    expect(() => assert(false, 'boom')).toThrow('boom');
  });
});
