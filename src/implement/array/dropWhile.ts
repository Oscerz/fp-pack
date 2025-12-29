import curry from '../composition/curry';

/**
 * dropWhile - 조건이 유지되는 동안 앞에서 제외
 */
function dropWhile<T>(predicate: (value: T) => boolean, arr: T[]): T[] {
  const result: T[] = [];
  let dropping = true;
  for (const item of arr) {
    if (dropping && !predicate(item)) {
      dropping = false;
    }
    if (!dropping) {
      result.push(item);
    }
  }
  return result;
}

export default curry(dropWhile);
