import curry from '../composition/curry';

/**
 * append - 배열 끝에 값 추가
 */
function append<T>(value: T, arr: T[]): T[] {
  return [...arr, value];
}

export default curry(append);
