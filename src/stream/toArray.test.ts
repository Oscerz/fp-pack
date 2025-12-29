import { describe, it, expect } from 'vitest';
import toArray from './toArray';

const asyncGen = async function* () {
  yield 1;
  yield Promise.resolve(2);
};

describe('stream toArray', () => {
  it('collects sync iterable', async () => {
    const result = await toArray([1, 2, 3]);
    expect(result).toEqual([1, 2, 3]);
  });

  it('collects async iterable', async () => {
    const result = await toArray(asyncGen());
    expect(result).toEqual([1, 2]);
  });
});
