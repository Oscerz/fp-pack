import { describe, it, expect } from 'vitest';
import assert from './assert';

describe('assert', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
});
