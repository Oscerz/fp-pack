import curry from '../composition/curry';

/**
 * pathOr - 기본값이 있는 깊은 프로퍼티 접근
 */
function pathOr<T, D>(defaultValue: D, pathArray: string[], obj: any): T | D {
  const value = pathArray.reduce((current, key) => (current == null ? undefined : current[key]), obj) as T | undefined;
  return value == null ? defaultValue : value;
}

export default curry(pathOr);
