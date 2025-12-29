import curry from '../composition/curry';

/**
 * zipWith - 두 배열을 함수로 결합
 */
function zipWith<A, B, R>(fn: (a: A, b: B) => R, other: B[], arr: A[]): R[] {
  const length = Math.min(arr.length, other.length);
  const result: R[] = [];
  for (let i = 0; i < length; i += 1) {
    result.push(fn(arr[i], other[i]));
  }
  return result;
}

export default curry(zipWith);
