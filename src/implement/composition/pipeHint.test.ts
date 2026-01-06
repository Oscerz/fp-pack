import { describe, it, expect } from 'vitest';
import pipe from './pipe';
import pipeHint from './pipeHint';

describe('pipeHint', () => {
  it('returns the same function reference', () => {
    const fn = (values: number[]) => values.length;
    expect(pipeHint(fn)).toBe(fn);
  });

  it('works as a pipe helper', () => {
    const count = pipeHint<number[], number>((values) => values.length);
    const addOne = pipe(count, (value) => value + 1);
    expect(addOne([1, 2, 3])).toBe(4);
  });
});
