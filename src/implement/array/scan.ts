import curry from '../composition/curry';

/**
 * scan - 누적 중간값을 배열로 반환
 */
function scan<T, R>(fn: (acc: R, value: T) => R, initial: R, arr: T[]): R[] {
  const result: R[] = [];
  let acc = initial;
  for (const item of arr) {
    acc = fn(acc, item);
    result.push(acc);
  }
  return result;
}

export default curry(scan);
