import curry from '../composition/curry';

/**
 * takeWhile - 조건이 유지되는 동안 앞에서 가져오기
 */
function takeWhile<T>(predicate: (value: T) => boolean, arr: T[]): T[] {
  const result: T[] = [];
  for (const item of arr) {
    if (!predicate(item)) {
      break;
    }
    result.push(item);
  }
  return result;
}

export default curry(takeWhile);
