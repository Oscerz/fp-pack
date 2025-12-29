import { describe, it, expect } from 'vitest';
import pipeAsync from '../implement/async/pipeAsync';
import chunk from './chunk';
import toArray from './toArray';
import toAsync from './toAsync';

describe('stream pipeAsync integration', () => {
  it('pipes sync input through chunk/toArray', async () => {
    const result = await pipeAsync(chunk(2), toArray)([1, 2, 3, 4]);
    expect(result).toEqual([[1, 2], [3, 4]]);
  });

  it('pipes promise input through chunk/toArray', async () => {
    const result = await pipeAsync(chunk(2), toArray)(Promise.resolve([1, 2, 3, 4]));
    expect(result).toEqual([[1, 2], [3, 4]]);
  });

  it('pipes async values via toAsync', async () => {
    const result = await pipeAsync(toAsync, chunk(2), toArray)([
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3),
      Promise.resolve(4),
    ]);
    expect(result).toEqual([[1, 2], [3, 4]]);
  });
});
