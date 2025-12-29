import curry from '../composition/curry';

/**
 * prepend - 배열 앞에 값 추가
 */
function prepend<T>(value: T, arr: T[]): T[] {
  return [value, ...arr];
}

export default curry(prepend);
