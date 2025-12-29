import curry from '../composition/curry';

/**
 * propOr - 기본값이 있는 프로퍼티 접근
 */
function propOr<T, K extends keyof T, D>(defaultValue: D, key: K, obj: T): T[K] | D {
  const value = obj?.[key];
  return value == null ? defaultValue : value;
}

export default curry(propOr);
